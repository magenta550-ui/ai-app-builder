import { useState, useCallback } from 'react';
import type { Message } from '../types';
import { generateCode, generateAssistantResponse } from '../utils/codeGenerator';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewCode, setPreviewCode] = useState<string>('');

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsGenerating(true);

    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

    const code = generateCode(content);
    const response = generateAssistantResponse(content);

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: response,
      code,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setPreviewCode(code);
    setIsGenerating(false);
  }, []);

  return { messages, isGenerating, previewCode, sendMessage };
}
