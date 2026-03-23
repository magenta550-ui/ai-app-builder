import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import type { Message } from '../types';

interface ChatPanelProps {
  messages: Message[];
  isGenerating: boolean;
  onSend: (message: string) => void;
}

const suggestions = [
  '카운터 앱 만들어줘',
  'Todo 리스트 앱 만들어줘',
  '계산기 앱 만들어줘',
  '날씨 앱 만들어줘',
  '스톱워치 만들어줘',
  '랜딩 페이지 만들어줘',
];

export function ChatPanel({ messages, isGenerating, onSend }: ChatPanelProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed || isGenerating) return;
    onSend(trimmed);
    setInput('');
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 150) + 'px';
  };

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <div className="chat-header-icon">
          <Sparkles size={20} />
        </div>
        <div>
          <h2>AI App Builder</h2>
          <span className="chat-header-sub">원하는 앱을 설명해주세요</span>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-welcome">
            <div className="welcome-icon">
              <Sparkles size={40} />
            </div>
            <h3>무엇을 만들어볼까요?</h3>
            <p>만들고 싶은 앱을 설명해주세요. AI가 즉시 코드를 생성하고 오른쪽에서 미리보기를 확인할 수 있습니다.</p>
            <div className="suggestions">
              {suggestions.map((s) => (
                <button
                  key={s}
                  className="suggestion-btn"
                  onClick={() => onSend(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`message message-${msg.role}`}>
            <div className="message-avatar">
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className="message-content">
              <div className="message-role">
                {msg.role === 'user' ? 'You' : 'AI Builder'}
              </div>
              <div className="message-text">{msg.content}</div>
              {msg.code && (
                <div className="message-code-badge">
                  <Sparkles size={12} />
                  코드가 생성되었습니다
                </div>
              )}
            </div>
          </div>
        ))}

        {isGenerating && (
          <div className="message message-assistant">
            <div className="message-avatar">
              <Bot size={16} />
            </div>
            <div className="message-content">
              <div className="message-role">AI Builder</div>
              <div className="generating">
                <Loader2 size={16} className="spin" />
                앱을 생성하고 있습니다...
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <div className="chat-input-wrapper">
          <textarea
            ref={inputRef}
            className="chat-input"
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="만들고 싶은 앱을 설명해주세요..."
            rows={1}
            disabled={isGenerating}
          />
          <button
            className="send-btn"
            onClick={handleSubmit}
            disabled={!input.trim() || isGenerating}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
