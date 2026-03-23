import { ChatPanel } from './components/ChatPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { useChat } from './hooks/useChat';
import './App.css';

function App() {
  const {
    messages,
    isGenerating,
    previewCode,
    sendMessage,
    apiKey,
    saveApiKey,
    streamingText,
    stopGenerating,
  } = useChat();

  return (
    <div className="app-layout">
      <ChatPanel
        messages={messages}
        isGenerating={isGenerating}
        onSend={sendMessage}
        apiKey={apiKey}
        onApiKeyChange={saveApiKey}
        streamingText={streamingText}
        onStop={stopGenerating}
      />
      <div className="divider" />
      <PreviewPanel code={previewCode} />
    </div>
  );
}

export default App;
