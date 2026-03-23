import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Message } from '../types';

interface ChatPanelProps {
  messages: Message[];
  isGenerating: boolean;
  onSend: (message: string) => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  streamingText: string;
  onStop: () => void;
}

const suggestions = [
  '카운터 앱 만들어줘',
  'Todo 리스트 앱 만들어줘',
  '계산기 앱 만들어줘',
  '날씨 앱 만들어줘',
  '스톱워치 만들어줘',
  '랜딩 페이지 만들어줘',
];

export function ChatPanel({
  messages,
  isGenerating,
  onSend,
  apiKey,
  onApiKeyChange,
  streamingText,
  onStop,
}: ChatPanelProps) {
  const [input, setInput] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [localKey, setLocalKey] = useState(apiKey);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating, streamingText]);

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
    el.style.height = Math.min(el.scrollHeight, 200) + 'px';
  };

  const handleSaveKey = () => {
    onApiKeyChange(localKey);
    setShowApiKey(false);
  };

  return (
    <div className="chat-panel">
      {/* Terminal title bar */}
      <div className="terminal-titlebar">
        <div className="terminal-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <div className="terminal-title">claude — AI App Builder</div>
        <button
          className="api-key-btn"
          onClick={() => setShowApiKey(!showApiKey)}
          title="API Key Settings"
        >
          {apiKey ? '🔑' : '⚙️'}
        </button>
      </div>

      {/* API Key modal */}
      {showApiKey && (
        <div className="api-key-panel">
          <div className="api-key-label">Anthropic API Key</div>
          <div className="api-key-row">
            <input
              type="password"
              className="api-key-input"
              value={localKey}
              onChange={e => setLocalKey(e.target.value)}
              placeholder="sk-ant-..."
              onKeyDown={e => { if (e.key === 'Enter') handleSaveKey(); }}
            />
            <button className="api-key-save" onClick={handleSaveKey}>Save</button>
          </div>
          <div className="api-key-hint">
            Stored in localStorage. Or set ANTHROPIC_API_KEY on the server.
          </div>
        </div>
      )}

      {/* Terminal body */}
      <div className="terminal-body">
        {messages.length === 0 && !isGenerating && (
          <div className="terminal-welcome">
            <pre className="ascii-logo">{`
  ╔═══════════════════════════════════╗
  ║     ◆  Claude App Builder  ◆     ║
  ╚═══════════════════════════════════╝`}</pre>
            <div className="terminal-info">
              <span className="t-dim">  Type what you want to build.</span>
              <span className="t-dim">  The preview will appear on the right.</span>
            </div>
            <div className="terminal-suggestions">
              <span className="t-dim">  Try one of these:</span>
              {suggestions.map((s, i) => (
                <button
                  key={s}
                  className="suggestion-cmd"
                  onClick={() => onSend(s)}
                >
                  <span className="t-muted">{`  ${i + 1}.`}</span> {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className="terminal-msg">
            {msg.role === 'user' ? (
              <div className="terminal-user-line">
                <span className="prompt-symbol">❯</span>
                <span className="user-text">{msg.content}</span>
              </div>
            ) : (
              <div className="terminal-assistant-block">
                <div className="assistant-header">
                  <span className="claude-badge">◆ Claude</span>
                </div>
                <div className="assistant-text markdown-body">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ className, children, ...props }) {
                        const isInline = !className;
                        if (isInline) {
                          return <code className="inline-code" {...props}>{children}</code>;
                        }
                        return (
                          <div className="code-block">
                            <div className="code-block-header">
                              <span>{className?.replace('language-', '') || 'code'}</span>
                              <button
                                className="copy-btn"
                                onClick={() => navigator.clipboard.writeText(String(children))}
                              >
                                Copy
                              </button>
                            </div>
                            <pre><code className={className} {...props}>{children}</code></pre>
                          </div>
                        );
                      },
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
                {msg.code && (
                  <div className="code-generated-line">
                    <span className="t-green">✓</span>
                    <span className="t-dim"> Code generated — see preview →</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Streaming response */}
        {isGenerating && streamingText && (
          <div className="terminal-msg">
            <div className="terminal-assistant-block">
              <div className="assistant-header">
                <span className="claude-badge">◆ Claude</span>
                <span className="streaming-indicator">streaming...</span>
              </div>
              <div className="assistant-text markdown-body">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ className, children, ...props }) {
                      const isInline = !className;
                      if (isInline) {
                        return <code className="inline-code" {...props}>{children}</code>;
                      }
                      return (
                        <div className="code-block">
                          <div className="code-block-header">
                            <span>{className?.replace('language-', '') || 'code'}</span>
                          </div>
                          <pre><code className={className} {...props}>{children}</code></pre>
                        </div>
                      );
                    },
                  }}
                >
                  {streamingText}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}

        {isGenerating && !streamingText && (
          <div className="terminal-msg">
            <div className="terminal-assistant-block">
              <div className="assistant-header">
                <span className="claude-badge">◆ Claude</span>
              </div>
              <div className="generating-terminal">
                <span className="spinner-dots" />
                <span className="t-dim"> Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="terminal-input-area">
        <div className="terminal-input-row">
          <span className="input-prompt">❯</span>
          <textarea
            ref={inputRef}
            className="terminal-input"
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="만들고 싶은 앱을 설명해주세요..."
            rows={1}
            disabled={isGenerating}
          />
        </div>
        <div className="terminal-input-hint">
          {isGenerating ? (
            <button className="stop-btn" onClick={onStop}>
              ■ Stop generating
            </button>
          ) : (
            <span className="t-muted">Enter to send · Shift+Enter for newline</span>
          )}
        </div>
      </div>
    </div>
  );
}
