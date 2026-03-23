import { ChatPanel } from './components/ChatPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { useChat } from './hooks/useChat';
import './App.css';

function App() {
  const { messages, isGenerating, previewCode, sendMessage } = useChat();

  return (
    <div className="app-layout">
      <ChatPanel
        messages={messages}
        isGenerating={isGenerating}
        onSend={sendMessage}
      />
      <div className="divider" />
      <PreviewPanel code={previewCode} />
    </div>
  );
}

export default App;
