export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  code?: string;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isGenerating: boolean;
}
