import { useRef, useEffect, useState } from 'react';
import {
  Monitor,
  Smartphone,
  Tablet,
  RotateCcw,
  Code2,
  Eye,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';

interface PreviewPanelProps {
  code: string;
}

type Device = 'desktop' | 'tablet' | 'mobile';
type View = 'preview' | 'code';

const deviceWidths: Record<Device, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

export function PreviewPanel({ code }: PreviewPanelProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [device, setDevice] = useState<Device>('desktop');
  const [view, setView] = useState<View>('preview');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (iframeRef.current && code) {
      const blob = new Blob([code], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      iframeRef.current.src = url;
      return () => URL.revokeObjectURL(url);
    }
  }, [code]);

  const handleRefresh = () => {
    if (iframeRef.current && code) {
      const blob = new Blob([code], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      iframeRef.current.src = url;
    }
  };

  const handleNewWindow = () => {
    if (code) {
      const blob = new Blob([code], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="preview-panel">
      <div className="preview-header">
        <div className="preview-tabs">
          <button
            className={`preview-tab ${view === 'preview' ? 'active' : ''}`}
            onClick={() => setView('preview')}
          >
            <Eye size={14} />
            Preview
          </button>
          <button
            className={`preview-tab ${view === 'code' ? 'active' : ''}`}
            onClick={() => setView('code')}
          >
            <Code2 size={14} />
            Code
          </button>
        </div>

        <div className="preview-controls">
          {view === 'preview' && (
            <>
              <div className="device-switcher">
                <button
                  className={`device-btn ${device === 'desktop' ? 'active' : ''}`}
                  onClick={() => setDevice('desktop')}
                  title="Desktop"
                >
                  <Monitor size={14} />
                </button>
                <button
                  className={`device-btn ${device === 'tablet' ? 'active' : ''}`}
                  onClick={() => setDevice('tablet')}
                  title="Tablet"
                >
                  <Tablet size={14} />
                </button>
                <button
                  className={`device-btn ${device === 'mobile' ? 'active' : ''}`}
                  onClick={() => setDevice('mobile')}
                  title="Mobile"
                >
                  <Smartphone size={14} />
                </button>
              </div>
              <button className="icon-btn" onClick={handleRefresh} title="Refresh">
                <RotateCcw size={14} />
              </button>
              <button className="icon-btn" onClick={handleNewWindow} title="Open in new window">
                <ExternalLink size={14} />
              </button>
            </>
          )}
          {view === 'code' && (
            <button className="icon-btn" onClick={handleCopy} title="Copy code">
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          )}
        </div>
      </div>

      <div className="preview-body">
        {!code ? (
          <div className="preview-empty">
            <div className="preview-empty-icon">
              <Monitor size={48} strokeWidth={1} />
            </div>
            <h3>미리보기</h3>
            <p>채팅에서 앱을 설명하면 여기에 실시간으로 표시됩니다</p>
          </div>
        ) : view === 'preview' ? (
          <div
            className="preview-frame-wrapper"
            style={{
              maxWidth: deviceWidths[device],
              margin: device !== 'desktop' ? '0 auto' : undefined,
            }}
          >
            <iframe
              ref={iframeRef}
              className="preview-frame"
              title="App Preview"
              sandbox="allow-scripts allow-modals"
            />
          </div>
        ) : (
          <div className="code-view">
            <pre>
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
