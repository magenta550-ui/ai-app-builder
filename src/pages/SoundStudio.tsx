import { useState } from 'react';
import { Mic, Music, Sparkles, Headphones, Upload } from 'lucide-react';

export function SoundStudio() {
  const [activeTab, setActiveTab] = useState('narration');
  const [subTab, setSubTab] = useState('narration');
  const [narrationSource, setNarrationSource] = useState('ai');
  const [engine, setEngine] = useState('typecast');

  const mainTabs = [
    { id: 'narration', label: '나래이션', icon: <Mic size={16} /> },
    { id: 'music', label: '음악 생성', icon: <Music size={16} /> },
    { id: 'effects', label: '효과음', icon: <Sparkles size={16} /> },
    { id: 'reference', label: '뮤직 레퍼런스', icon: <Headphones size={16} /> },
  ];

  const engines = [
    { id: 'typecast', icon: '🎙️', name: 'Typecast', badge: 'API 키', badgeColor: '#8b5cf6', voices: '486개 음성' },
    { id: 'elevenlabs', icon: '🎧', name: 'ElevenLabs', badge: 'Kle 키', badgeColor: '#3b82f6', voices: '126개 음성' },
    { id: 'supertonic', icon: '🎵', name: 'Supertonic 2', badge: '토큰 무료', badgeColor: '#10b981', voices: '10개 음성' },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-header-icon">🎧</div>
        <div className="page-header-text">
          <h2>사운드 스튜디오</h2>
          <p>나래이션 음성 생성과 AI 음악 제작을 관리합니다</p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button className="btn-tag active-red" style={{ background: '#ef4444', color: '#fff', border: 'none' }}>📍 현재 정치</button>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>TTS 관리: Typecast</span>
        </div>
      </div>

      {/* Main Feature Tabs */}
      <div className="btn-group" style={{ marginBottom: 16 }}>
        {mainTabs.map(tab => (
          <button
            key={tab.id}
            className={`source-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'narration' && (
        <div>
          {/* Sub tabs */}
          <div className="tab-nav">
            <button className={`tab-item ${subTab === 'narration' ? 'active' : ''}`} onClick={() => setSubTab('narration')}>
              🎵 나래이션
            </button>
            <button className={`tab-item ${subTab === 'audio-edit' ? 'active' : ''}`} onClick={() => setSubTab('audio-edit')}>
              ✂️ 오디오 편집
            </button>
          </div>

          <div className="info-box green">
            🔊 무료 음성 합성 — <strong>앨파 앱 설정</strong> ✕
          </div>
          <div className="info-box purple">
            🔊 빠르고 정확한 음성 인식 — <strong>앨파 앱 설정</strong> ✕
          </div>

          {/* Narration Settings */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mic size={20} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600 }}>나래이션</h3>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>음성 설정</p>
              </div>
              <p style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--text-secondary)' }}>
                음성 엔진과 목소리를 선택하고 나래이션을 생성합니다
              </p>
            </div>

            {/* Source Selection */}
            <div className="row" style={{ marginBottom: 16 }}>
              <span className="row-label">나래이션 소스</span>
              <div className="btn-group">
                <button className={`source-btn ${narrationSource === 'ai' ? 'active' : ''}`} onClick={() => setNarrationSource('ai')}>
                  🤖 AI 음성 생성
                </button>
                <button className={`source-btn ${narrationSource === 'upload' ? 'active' : ''}`} onClick={() => setNarrationSource('upload')}>
                  <Upload size={14} /> 오디오 업로드
                </button>
              </div>
            </div>

            {/* Voice Engine Selection */}
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
              음성 엔진 선택 — 카드를 클릭하면 개별 음성을 미리 들어볼 수 있습니다
            </p>

            <div className="engine-grid">
              {engines.map(e => (
                <div
                  key={e.id}
                  className={`engine-card ${engine === e.id ? 'active' : ''}`}
                  onClick={() => setEngine(e.id)}
                >
                  <div className="engine-icon">{e.icon}</div>
                  <div className="engine-info">
                    <h4>
                      {e.name}
                      <span className="badge-sm" style={{ background: e.badgeColor, color: '#fff' }}>{e.badge}</span>
                    </h4>
                    <p>{e.voices}</p>
                  </div>
                  {engine === e.id && <span style={{ marginLeft: 'auto', color: 'var(--accent-green)' }}>✓</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Narration Area */}
          <div className="card">
            <div className="narration-empty">
              <div className="mic-icon">🎤</div>
              <h3>나래이션 대본을 준비해주세요</h3>
              <p>대본작성 탭에서 작업하면 자동으로 연동됩니다.<br />
              나래이션만 사용하려면 아래에 대본을 직접 붙여넣으세요.</p>
            </div>

            <textarea
              className="text-input"
              placeholder="대본을 여기에 붙여넣거나 직접 입력하세요..."
              rows={4}
              style={{ marginTop: 16 }}
            />

            <button className="btn-wide purple" style={{ marginTop: 12 }}>
              대본을 입력하면 시작할 수 있어요
            </button>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8, fontSize: 12, color: 'var(--text-muted)' }}>
              <span>✅ 대본작성 탭 검증</span>
              <span>💡 통궈이어 기준 분할</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'music' && (
        <div className="card">
          <h3 className="card-title"><Music size={18} /> AI 음악 생성</h3>
          <p className="card-description">AI가 콘텐츠에 맞는 배경 음악을 생성합니다.</p>
          <input type="text" className="text-input" placeholder="원하는 음악 스타일을 설명하세요 (예: 밝은 팝, 차분한 로파이...)" />
          <button className="btn-primary" style={{ marginTop: 12 }}>🎵 음악 생성</button>
        </div>
      )}

      {activeTab === 'effects' && (
        <div className="card">
          <h3 className="card-title"><Sparkles size={18} /> 효과음</h3>
          <p className="card-description">AI가 대본에 맞는 효과음을 자동으로 배치합니다.</p>
          <button className="btn-primary">효과음 자동 배치</button>
        </div>
      )}

      {activeTab === 'reference' && (
        <div className="card">
          <h3 className="card-title"><Headphones size={18} /> 뮤직 레퍼런스</h3>
          <p className="card-description">레퍼런스 음악을 업로드하면 AI가 비슷한 스타일의 음악을 생성합니다.</p>
          <div className="narration-empty" style={{ padding: 40 }}>
            <Upload size={32} style={{ opacity: 0.3 }} />
            <p>레퍼런스 음악을 업로드하세요</p>
          </div>
        </div>
      )}
    </div>
  );
}
