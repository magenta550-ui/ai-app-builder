import { useState } from 'react';
import { Palette, Layout, Film, UserCircle, Upload } from 'lucide-react';

export function ImageVideo() {
  const [activeTab, setActiveTab] = useState('style');
  const [directInput, setDirectInput] = useState(false);
  const [multiChar, setMultiChar] = useState(false);
  const [ratio, setRatio] = useState('1:1');

  const tabs = [
    { id: 'style', label: '스타일 선택', icon: <Palette size={16} /> },
    { id: 'storyboard', label: '스토리보드', icon: <Layout size={16} /> },
    { id: 'remake', label: '영상 리메이크', icon: <Film size={16} /> },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-header-icon">🎬</div>
        <div className="page-header-text">
          <h2>이미지/영상</h2>
          <p>대본 기반 장면 분석, 이미지 및 영상 생성을 관리합니다</p>
        </div>
      </div>

      <div className="tab-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'style' && (
        <div>
          {/* Direct Input Toggle */}
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              className={`toggle-switch ${directInput ? 'active' : ''}`}
              onClick={() => setDirectInput(!directInput)}
            />
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 600 }}>대본 직접 입력</h4>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                이곳에서 대본을 직접 입력하고 요약 비율, 세부 옵션을 조정할 수 있습니다
              </p>
            </div>
          </div>

          {/* Character Reference */}
          <div className="section-header">
            <span>1. 캐릭터 레퍼런스</span>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>멀티캐릭터</span>
              <div
                className={`toggle-switch ${multiChar ? 'active' : ''}`}
                onClick={() => setMultiChar(!multiChar)}
              />
              <button className="btn-tag active-purple">
                <UserCircle size={14} /> 내 캐릭터
              </button>
            </div>
          </div>

          <div className="character-card">
            <div className="character-upload">
              <div className="upload-icon">👤</div>
              <p>이미지 업로드<br /><span style={{ fontSize: 10 }}>클릭 또는 드래그</span></p>
            </div>
            <div className="character-fields">
              <div>
                <h4 style={{ fontSize: 14, marginBottom: 8 }}>🅰 1. 메인 캐릭터 (Anchor)</h4>
              </div>
              <div className="character-field">
                <label>✨ AI 분석 결과 <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 400 }}>클릭하여 직접 편집 가능</span></label>
                <input placeholder="클릭하여 직접 입력하거나 붙여넣기" />
              </div>
              <div className="character-field">
                <label>🎨 예술 스타일</label>
                <input placeholder="클릭하여 직접 입력하거나 붙여넣기" />
              </div>
              <div className="character-field">
                <label style={{ color: 'var(--accent-orange)' }}>🏷️ 캐릭터 특징</label>
                <input placeholder="클릭하여 직접 입력하거나 붙여넣기" />
              </div>
            </div>
          </div>

          {/* Generation Options */}
          <div className="section-header">
            <span>2. 생성 옵션</span>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h4 style={{ fontSize: 14 }}>📐 화면 비율</h4>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>1:1 선택됨</span>
            </div>

            <div className="ratio-grid">
              <div
                className={`ratio-card ${ratio === '16:9' ? 'active' : ''}`}
                onClick={() => setRatio('16:9')}
              >
                <h3>16:9</h3>
                <p>가로형/표준유</p>
              </div>
              <div
                className={`ratio-card ${ratio === '9:16' ? 'active' : ''}`}
                onClick={() => setRatio('9:16')}
              >
                <h3>9:16</h3>
                <p>세로형/쇼츠</p>
              </div>
              <div
                className={`ratio-card ${ratio === '1:1' ? 'active' : ''}`}
                onClick={() => setRatio('1:1')}
              >
                <h3>1:1</h3>
                <p>릴스/인스타/스토리</p>
              </div>
            </div>
          </div>

          {/* Image Generation Style */}
          <div className="card">
            <h3 className="card-title">🎨 이미지 생성 스타일</h3>
            <div className="selection-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {['실사 (Photorealistic)', '일러스트', '애니메이션', '수채화', '3D 렌더링', '픽셀아트', '만화', '미니멀'].map((style, i) => (
                <div key={style} className={`selection-card ${i === 0 ? 'active' : ''}`}>
                  <h4>{style}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* AI Engine */}
          <div className="card">
            <h3 className="card-title">🤖 AI 이미지 엔진</h3>
            <div className="engine-grid">
              <div className="engine-card active">
                <div className="engine-icon">🎨</div>
                <div className="engine-info">
                  <h4>FLUX <span className="badge-sm" style={{ background: '#3b82f6', color: '#fff' }}>추천</span></h4>
                  <p>고품질 이미지 생성</p>
                </div>
              </div>
              <div className="engine-card">
                <div className="engine-icon">🖼️</div>
                <div className="engine-info">
                  <h4>Stable Diffusion</h4>
                  <p>다양한 스타일</p>
                </div>
              </div>
              <div className="engine-card">
                <div className="engine-icon">✨</div>
                <div className="engine-info">
                  <h4>DALL-E 3</h4>
                  <p>창의적 이미지</p>
                </div>
              </div>
            </div>
          </div>

          <button className="btn-wide purple" style={{ marginTop: 16 }}>
            🎬 이미지 생성 시작
          </button>
        </div>
      )}

      {activeTab === 'storyboard' && (
        <div className="card">
          <h3 className="card-title"><Layout size={18} /> 스토리보드</h3>
          <p className="card-description">대본 기반으로 자동 생성된 스토리보드를 확인하고 편집합니다.</p>
          <div className="narration-empty">
            <Layout size={48} style={{ opacity: 0.3 }} />
            <h3>대본을 먼저 작성해주세요</h3>
            <p>대본 작성 후 단락 나누기를 완료하면 자동으로 스토리보드가 생성됩니다.</p>
          </div>
        </div>
      )}

      {activeTab === 'remake' && (
        <div className="card">
          <h3 className="card-title"><Film size={18} /> 영상 리메이크</h3>
          <p className="card-description">기존 영상을 AI로 리메이크합니다.</p>
          <div className="narration-empty">
            <Upload size={48} style={{ opacity: 0.3 }} />
            <h3>리메이크할 영상을 업로드하세요</h3>
            <p>원본 영상을 업로드하면 AI가 새로운 스타일로 변환합니다.</p>
          </div>
        </div>
      )}
    </div>
  );
}
