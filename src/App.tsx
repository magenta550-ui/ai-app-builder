import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ChannelAnalysis } from './pages/ChannelAnalysis';
import { ScriptWriting } from './pages/ScriptWriting';
import { SoundStudio } from './pages/SoundStudio';
import { ImageVideo } from './pages/ImageVideo';
import { EditRoom } from './pages/EditRoom';
import { UploadPage } from './pages/UploadPage';
import { ProjectPage } from './pages/ProjectPage';
import { ToolsPage } from './pages/ToolsPage';
import './App.css';

export type PageType =
  | 'project'
  | 'channel-analysis'
  | 'script-writing'
  | 'sound-studio'
  | 'image-video'
  | 'edit-room'
  | 'upload'
  | 'bundamal-studio'
  | 'character-maker'
  | 'source-import'
  | 'ppt-master'
  | 'shopping-content'
  | 'subtitle-remover';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('channel-analysis');

  const renderPage = () => {
    switch (currentPage) {
      case 'project':
        return <ProjectPage />;
      case 'channel-analysis':
        return <ChannelAnalysis />;
      case 'script-writing':
        return <ScriptWriting />;
      case 'sound-studio':
        return <SoundStudio />;
      case 'image-video':
        return <ImageVideo />;
      case 'edit-room':
        return <EditRoom />;
      case 'upload':
        return <UploadPage />;
      default:
        return <ToolsPage page={currentPage} />;
    }
  };

  const getProgressSteps = () => {
    const steps = [
      { id: 'project', label: '프로젝트' },
      { id: 'channel-analysis', label: '채널/영상 분석' },
      { id: 'script-writing', label: '대본' },
      { id: 'sound-studio', label: '사운드' },
      { id: 'image-video', label: '이미지/영상' },
      { id: 'edit-room', label: '편집도' },
      { id: 'upload', label: '콘텐츠' },
    ];
    return steps;
  };

  return (
    <div className="app-layout">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="main-content">
        <Header />
        <div className="progress-steps">
          {getProgressSteps().map((step, i) => (
            <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {i > 0 && <span className="step-arrow">―</span>}
              <button
                className={`step ${currentPage === step.id ? 'active' : ''}`}
                onClick={() => setCurrentPage(step.id as PageType)}
              >
                {step.label}
              </button>
            </div>
          ))}
        </div>
        <div className="page-content">
          <div className="helper-banner">
            <div className="banner-icon">❓</div>
            <div className="banner-content">
              <h4><span className="badge" style={{ background: '#ef4444' }}>NEW</span> All In One Helper 출시</h4>
              <p>다운로드 3~7배 빠름 · 음성 인식/합성 무료 · 배경 제거 무제한 · 영상 렌더링 초고속<br />
              앱과 앱 하나만 설치하면 모든 기능이 자동으로 활성화됩니다.</p>
              <div className="banner-buttons">
                <button className="banner-btn mac">🍎 macOS 다운로드</button>
                <button className="banner-btn win">🪟 Windows 버전 곧 공개 예정</button>
              </div>
            </div>
          </div>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default App;
