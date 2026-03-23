import { useState, useCallback, useRef } from 'react';
import type { Message } from '../types';
import { generateCode, generateAssistantResponse } from '../utils/codeGenerator';

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

async function tryApiCall(
  updatedMessages: Message[],
  apiKey: string,
  controller: AbortController,
  onChunk: (text: string) => void,
): Promise<{ fullText: string; html: string | null } | null> {
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

    if (!response.ok) return null;

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
              if (parsed.error) return null;
              if (parsed.text) {
                fullText += parsed.text;
                onChunk(fullText);
              }
            } catch {
              // skip
            }
          }
        }
      }
    }

    const html = extractHtmlFromMarkdown(fullText);
    return { fullText, html };
  } catch (err: unknown) {
    if ((err as Error).name === 'AbortError') throw err;
    return null;
  }
}

async function fallbackGenerate(
  content: string,
  onChunk: (text: string) => void,
): Promise<{ fullText: string; html: string | null }> {
  const code = generateCode(content);
  const response = generateAssistantResponse(content);
  const fullText = `${response}\n\n\`\`\`html\n${code}\n\`\`\``;

  // Simulate streaming character by character
  let streamed = '';
  const chars = fullText.split('');
  for (let i = 0; i < chars.length; i++) {
    streamed += chars[i];
    if (i % 3 === 0) {
      onChunk(streamed);
      await new Promise(r => setTimeout(r, 5));
    }
  }
  onChunk(fullText);

  return { fullText, html: code };
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewCode, setPreviewCode] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('claude-api-key') || '';
  });
  const [streamingText, setStreamingText] = useState('');
  const [mode, setMode] = useState<'api' | 'template'>('api');
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
      let result: { fullText: string; html: string | null } | null = null;

      // Try API first
      result = await tryApiCall(updatedMessages, apiKey, controller, setStreamingText);

      if (result) {
        setMode('api');
      } else {
        // Fallback to template mode
        setMode('template');
        result = await fallbackGenerate(content, setStreamingText);
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: result.fullText,
        code: result.html || undefined,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      if (result.html) setPreviewCode(result.html);
    } catch (err: unknown) {
      if ((err as Error).name !== 'AbortError') {
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
    mode,
  };
}
