import { useState, useCallback, useRef } from 'react';
import type { Message } from '../types';

function extractHtmlFromMarkdown(text: string): string | null {
  const htmlBlockRegex = /```html\s*\n([\s\S]*?)```/g;
  let lastMatch: string | null = null;
  let match;
  while ((match = htmlBlockRegex.exec(text)) !== null) {
    lastMatch = match[1].trim();
  }
  return lastMatch;
}

const SERVER_URL = 'http://localhost:3001';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewCode, setPreviewCode] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('claude-api-key') || '';
  });
  const [streamingText, setStreamingText] = useState('');
  const abortRef = useRef<AbortController | null>(null);

  const saveApiKey = useCallback((key: string) => {
    setApiKey(key);
    localStorage.setItem('claude-api-key', key);
  }, []);

  const stopGenerating = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setIsGenerating(false);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsGenerating(true);
    setStreamingText('');

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch(`${SERVER_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
          apiKey: apiKey || undefined,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'API request failed');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;
              try {
                const parsed = JSON.parse(data);
                if (parsed.error) throw new Error(parsed.error);
                if (parsed.text) {
                  fullText += parsed.text;
                  setStreamingText(fullText);
                }
              } catch {
                // skip malformed JSON
              }
            }
          }
        }
      }

      const html = extractHtmlFromMarkdown(fullText);

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: fullText,
        code: html || undefined,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      if (html) setPreviewCode(html);
    } catch (err: unknown) {
      if ((err as Error).name === 'AbortError') {
        // User cancelled
      } else {
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: `Error: ${(err as Error).message}`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } finally {
      setIsGenerating(false);
      setStreamingText('');
      abortRef.current = null;
    }
  }, [messages, apiKey]);

  return {
    messages,
    isGenerating,
    previewCode,
    sendMessage,
    apiKey,
    saveApiKey,
    streamingText,
    stopGenerating,
  };
}
