import { useState } from 'react';
import { Palette, Layout, Film, UserCircle, Upload, ChevronDown, ChevronRight, Search, ImageIcon } from 'lucide-react';

export function ImageVideo() {
  const [activeTab, setActiveTab] = useState('style');
  const [directInput, setDirectInput] = useState(false);
  const [multiChar, setMultiChar] = useState(false);
  const [ratio, setRatio] = useState('1:1');
  const [infographic, setInfograhic] = useState(false);
  const [textLock, setTextLock] = useState(false);
  const [cleanMode, setCleanMode] = useState(true);
  const [webSearch, setWebSearch] = useState(true);
  const [charFreq, setCharFreq] = useState('auto');
  const [freeRef, setFreeRef] = useState(false);
  const [styleIsolation, setStyleIsolation] = useState(false);
  const [dialogGen, setDialogGen] = useState(false);
  const [expandedStyles, setExpandedStyles] = useState<string[]>([]);

  const tabs = [
    { id: 'style', label: '스타일 선택', icon: <Palette size={16} /> },
    { id: 'storyboard', label: '스토리보드', icon: <Layout size={16} /> },
    { id: 'remake', label: '영상 리메이크', icon: <Film size={16} /> },
  ];

  const visualStyles = [
    { id: 'movie', icon: '🎬', name: '영화 & 드라마' },
    { id: 'cf', icon: '📺', name: 'CF & 커머셜' },
    { id: 'animation', icon: '🎭', name: '애니메이션 & 3D' },
    { id: 'webtoon', icon: '📘', name: '웹툰 & 코믹' },
    { id: 'sketch', icon: '✏️', name: '스케치 & 스토리보드' },
    { id: 'art', icon: '🖼️', name: '아트 & 컨셉' },
    { id: 'photo', icon: '📷', name: '포토그래피' },
  ];

  const toggleStyle = (id: string) => {
    setExpandedStyles(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

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

          {/* 1. Character Reference */}
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

          {/* 2. 생성 옵션 */}
          <div className="section-header">
            <span>2. 생성 옵션</span>
          </div>

          <div className="card">
            {/* 화면 비율 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h4 style={{ fontSize: 14 }}>📐 화면 비율</h4>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>1:1 선택됨</span>
            </div>

            <div className="ratio-grid" style={{ marginBottom: 24 }}>
              <div className={`ratio-card ${ratio === '16:9' ? 'active' : ''}`} onClick={() => setRatio('16:9')}>
                <h3>16:9</h3>
                <p>가로형/표준유</p>
              </div>
              <div className={`ratio-card ${ratio === '9:16' ? 'active' : ''}`} onClick={() => setRatio('9:16')}>
                <h3>9:16</h3>
                <p>세로형/쇼츠</p>
              </div>
              <div className={`ratio-card ${ratio === '1:1' ? 'active' : ''}`} onClick={() => setRatio('1:1')}>
                <h3>1:1</h3>
                <p>릴스/인스타/스토리</p>
              </div>
            </div>

            {/* Options Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {/* Left Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* 인포그래픽 모드 */}
                <div className="option-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 10, border: '1px solid var(--border-color)' }}>
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 600 }}>📊 인포그래픽 모드 (OFF)</h4>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>영상미와 몰입감에 집중합니다</p>
                  </div>
                  <div className={`toggle-switch ${infographic ? 'active' : ''}`} onClick={() => setInfograhic(!infographic)} />
                </div>

                {/* 텍스트 언어 강제 고정 */}
                <div className="option-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 10, border: '1px solid var(--border-color)' }}>
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 600 }}>📝 텍스트 언어 강제 고정</h4>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>매칭 내 건편/AI지만 대본의 건어/한국어 등도로 강제 변경합니다</p>
                  </div>
                  <div className={`toggle-switch ${textLock ? 'active' : ''}`} onClick={() => setTextLock(!textLock)} />
                </div>
              </div>

              {/* Right Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* 캐릭터 출현 빈도 */}
                <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 10, border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>👤 캐릭터 출현 빈도</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    <button className={`btn-tag ${charFreq === 'auto' ? 'active' : ''}`} onClick={() => setCharFreq('auto')} style={{ width: '100%' }}>자동 (AI)</button>
                    <button className={`btn-tag ${charFreq === 'generate' ? 'active' : ''}`} onClick={() => setCharFreq('generate')} style={{ width: '100%' }}>영상 (인렌더)</button>
                    <button className={`btn-tag ${charFreq === 'min' ? 'active' : ''}`} onClick={() => setCharFreq('min')} style={{ width: '100%' }}>최소화 (0-80)</button>
                    <button className={`btn-tag ${charFreq === 'none' ? 'active' : ''}`} onClick={() => setCharFreq('none')} style={{ width: '100%' }}>출연 안함</button>
                  </div>
                  <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 6 }}>* 자동: 대사가 있거나 행동이 종요할 때만 등장합니다</p>
                </div>

                {/* 텍스트 생성 금지 */}
                <div className="option-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 10, border: '1px solid var(--border-color)' }}>
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 600 }}>🚫 텍스트 생성 금지 (Clean Mode)</h4>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>AI가 이미지 내에 어떤 글자도 생성하지 않도록 동한 자건합니다</p>
                  </div>
                  <div className={`toggle-switch ${cleanMode ? 'active' : ''}`} onClick={() => setCleanMode(!cleanMode)} />
                </div>
              </div>
            </div>

            {/* 웹 검색 참조 모드 */}
            <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.06)', borderRadius: 10, border: '1px solid rgba(59, 130, 246, 0.15)', marginBottom: 16, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent-blue)', marginBottom: 4 }}>🌐 웹 검색 참조 모드</h4>
                <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  AI가 이미지 생성 시 실시간 웹 검색 결과를 참조하여 <strong style={{ color: 'var(--accent-orange)' }}>실제 인물, 장소, 사물의 정확도가 1.5배 향상</strong>됩니다. 특히 유명인, 랜드마크, 특정 제품 등 실존 대상을 묘사할 때 효과적입니다.<br />
                  ⚡ 활성화 시 이미지 생성 속도가 약 10~20% 정도 더 소요될 수 있습니다. 전체 질문 생성 및 개별 생성 모두에 적용됩니다.
                </p>
              </div>
              <div className={`toggle-switch ${webSearch ? 'active' : ''}`} onClick={() => setWebSearch(!webSearch)} />
            </div>

            {/* 무료 이미지 레퍼런스 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 10, border: '1px solid var(--border-color)' }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                🖼️ 무료 이미지 레퍼런스 <span style={{ fontSize: 10, padding: '1px 6px', background: 'var(--accent-green)', color: '#fff', borderRadius: 4, fontWeight: 700 }}>무료</span>
              </h4>
              <div className={`toggle-switch ${freeRef ? 'active' : ''}`} onClick={() => setFreeRef(!freeRef)} />
            </div>
          </div>

          {/* 3. 비주얼 스타일 */}
          <div className="section-header">
            <span>3. 비주얼 스타일 (선택)</span>
          </div>

          <div className="card">
            {/* Warning box */}
            <div style={{ padding: '12px 16px', background: 'rgba(245, 158, 11, 0.08)', borderRadius: 8, border: '1px solid rgba(245, 158, 11, 0.2)', marginBottom: 16 }}>
              <h4 style={{ fontSize: 13, color: 'var(--accent-orange)', marginBottom: 4 }}>⚠️ 스타일 적용 우선순위 안내</h4>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>이곳 설정을 선택하면 분석된 화풍 대신 해당 스타일이 우선 적용됩니다.</p>
            </div>

            {/* Style Isolation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', marginBottom: 12, borderBottom: '1px solid var(--border-color)' }}>
              <div
                style={{ width: 18, height: 18, border: '2px solid var(--border-color)', borderRadius: 4, background: styleIsolation ? 'var(--accent-blue)' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12 }}
                onClick={() => setStyleIsolation(!styleIsolation)}
              >
                {styleIsolation && '✓'}
              </div>
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 600 }}>🎨 스타일 독립/혼합 모드 (Style Isolation)</h4>
                <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>배경과 캐릭터의 화풍이 섞이지 않도록 분리합니다</p>
              </div>
            </div>

            {/* Style Categories */}
            {visualStyles.map(vs => (
              <div key={vs.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <div
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', cursor: 'pointer' }}
                  onClick={() => toggleStyle(vs.id)}
                >
                  <h4 style={{ fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {vs.icon} {vs.name}
                  </h4>
                  {expandedStyles.includes(vs.id) ? <ChevronDown size={16} color="var(--text-muted)" /> : <ChevronRight size={16} color="var(--text-muted)" />}
                </div>
                {expandedStyles.includes(vs.id) && (
                  <div style={{ padding: '0 0 16px 24px' }}>
                    <div className="selection-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                      {['스타일 A', '스타일 B', '스타일 C', '스타일 D'].map(s => (
                        <div key={s} className="selection-card">
                          <div style={{ width: '100%', height: 60, background: 'var(--bg-input)', borderRadius: 6, marginBottom: 8 }} />
                          <h4>{s}</h4>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 이미지 레퍼런스 */}
          <div className="card">
            <h3 className="card-title">
              🖼️ 이미지 레퍼런스 <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 400 }}>(선택, 최대 3장)</span>
            </h3>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>
              벤치마킹 채널이나 원하는 스타일의 이미지를 업로드하면, <strong style={{ color: 'var(--accent-blue)' }}>모든 장면의 이미지 생성 시 AI가 화풍·구도·색감을 참고</strong>합니다.
            </p>

            <div style={{ padding: '40px 20px', border: '2px dashed var(--border-color)', borderRadius: 12, textAlign: 'center', cursor: 'pointer', marginBottom: 16 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🖼️</div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>클릭 또는 드래그하여 레퍼런스 이미지 추가</p>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>PNG, JPG, WebP (권장 3장)</p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>추가 스타일 지시 (선택)</label>
              <textarea className="text-input" placeholder="예: no handshake effect, 다큐멘터리 톤, 따뜻한 색감, 광각 렌즈..." rows={3} />
            </div>
          </div>

          {/* 4. 대사 생성 (선택) */}
          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 className="card-title" style={{ margin: 0 }}>
              💬 4. 대사 생성 (선택)
            </h3>
            <div className={`toggle-switch ${dialogGen ? 'active' : ''}`} onClick={() => setDialogGen(!dialogGen)} />
          </div>

          {/* Bottom Action */}
          <button className="btn-wide" style={{ marginTop: 16, background: 'linear-gradient(135deg, #64748b, #475569)', color: '#fff' }}>
            스토리보드 생성 →
          </button>
          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
            대본작성 탭에서 대본을 먼저 준비하거나, '대본 직접 입력' 모드를 활성화하세요
          </p>
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
