import { useState } from 'react';
import { Scissors, Layout, ImageIcon, Type, Music, Focus, ChevronDown, Download, FileText, FolderArchive, Film } from 'lucide-react';

export function EditRoom() {
  const [subTab, setSubTab] = useState('timeline');
  const [resolution, setResolution] = useState('4K');
  const [effectTab, setEffectTab] = useState('image');
  const [motionType, setMotionType] = useState(false);

  return (
    <div>
      <div className="page-header">
        <div className="page-header-icon" style={{ background: 'var(--accent-orange)', color: '#fff' }}>✂️</div>
        <div className="page-header-text">
          <h2>편집실 <span style={{ fontSize: 14, padding: '2px 8px', background: 'var(--accent-purple)', color: '#fff', borderRadius: 6, fontWeight: 600, marginLeft: 8 }}>0개 장면</span></h2>
          <p>임시 프로젝트 03/22 18:51 — 장면별 자막, 효과, 오디오를 편집하세요</p>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <button className="btn-primary" style={{ background: 'var(--accent-orange)', display: 'flex', alignItems: 'center', gap: 6 }}>
            내보내기 ▼
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="tab-nav">
        <button className={`tab-item ${subTab === 'timeline' ? 'active' : ''}`} onClick={() => setSubTab('timeline')}>
          📋 타임라인
        </button>
        <button className={`tab-item ${subTab === 'edit-settings' ? 'active' : ''}`} onClick={() => setSubTab('edit-settings')}>
          ✂️ 편집실 제감
        </button>
      </div>

      {/* Resolution selector */}
      <div className="btn-group" style={{ marginBottom: 20 }}>
        {['자동', '1K5', '풀 3/16', '4K', '건축'].map(r => (
          <button key={r} className={`btn-tag ${resolution === r ? 'active' : ''}`} onClick={() => setResolution(r)}>{r}</button>
        ))}
      </div>

      {/* Main Content: Left Panel + Right Effects Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, minHeight: 400 }}>
        {/* Left: Scene area */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
          <div className="narration-empty">
            <ImageIcon size={40} style={{ opacity: 0.3 }} />
            <h3>장면이 없습니다</h3>
            <p>이미지/영상 탭에서 장면을 먼저 생성해주세요.</p>
          </div>
        </div>

        {/* Right: Effects Panel */}
        <div className="card" style={{ padding: 16, overflow: 'auto' }}>
          {/* Effect tabs */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 16, borderBottom: '1px solid var(--border-color)' }}>
            {[
              { id: 'image', label: '🖼️ 이미지 효과', },
              { id: 'subtitle', label: '✏️ 자막' },
              { id: 'bgm', label: '🎵 BGM' },
              { id: 'focus', label: '🎯 입/포커스' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setEffectTab(t.id)}
                style={{
                  background: 'none', border: 'none',
                  padding: '8px 12px', fontSize: 11, fontFamily: 'inherit',
                  color: effectTab === t.id ? 'var(--text-primary)' : 'var(--text-muted)',
                  borderBottom: effectTab === t.id ? '2px solid var(--accent-blue)' : '2px solid transparent',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {effectTab === 'image' && (
            <div>
              {/* Motion toggle */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>모션 유형</span>
                <div className={`toggle-switch ${motionType ? 'active' : ''}`} onClick={() => setMotionType(!motionType)} />
              </div>

              {/* 전체 모션 재생성 */}
              <button className="btn-wide purple" style={{ marginBottom: 16, fontSize: 13 }}>
                🎬 전체 모션 재생성
              </button>

              {/* 연속성 */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>연속성 : 전체 20초</label>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {['빠른', '🔹 부드러움', '🎬 시네마틱', '액동적', '고요한', '🎭 드라마틱', '🎯 집중', '판타지'].map((tag, i) => (
                    <button key={tag} className={`btn-tag ${i === 1 ? 'active' : ''}`} style={{ fontSize: 11, padding: '4px 8px' }}>{tag}</button>
                  ))}
                </div>
              </div>

              {/* 모션 */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>모션 : 전체 1개</label>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {['회전', '정면', '팬', '매크로', '느린', '흔들림'].map((tag, i) => (
                    <button key={tag} className={`btn-tag ${i === 0 ? 'active' : ''}`} style={{ fontSize: 11, padding: '4px 8px' }}>{tag}</button>
                  ))}
                </div>
              </div>

              {/* 방향 */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>방향</label>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {['좌', '궁곡자'].map((tag, i) => (
                    <button key={tag} className={`btn-tag ${i === 0 ? 'active' : ''}`} style={{ fontSize: 11, padding: '4px 8px' }}>{tag}</button>
                  ))}
                </div>
              </div>

              {/* 오버레이 */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>오버레이 효과 : 전체 수동</label>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {['❄️ 눈', '☁️ 구름', '🌧️ 비', '💡 불빛', '✨ 반짝', '🌸 벚꽃'].map(tag => (
                    <button key={tag} className="btn-tag" style={{ fontSize: 11, padding: '4px 8px' }}>{tag}</button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
                  {['🌊 근개', '🍂 낙엽', '⏰ 시간', '🌌 스타라링크'].map(tag => (
                    <button key={tag} className="btn-tag" style={{ fontSize: 11, padding: '4px 8px' }}>{tag}</button>
                  ))}
                </div>
                <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 6 }}>
                  효과는 장면 단위로 별도 적용 가능. 여기에서는 전체 공통값만 조정합니다.
                </p>
              </div>

              {/* 상세 편집 열기 */}
              <button className="btn-wide blue" style={{ fontSize: 13 }}>
                상세 편집 열기
              </button>
            </div>
          )}

          {effectTab === 'subtitle' && (
            <div className="narration-empty" style={{ padding: 20 }}>
              <Type size={28} style={{ opacity: 0.3 }} />
              <p style={{ fontSize: 12 }}>장면을 생성하면 자막 편집이 가능합니다</p>
            </div>
          )}

          {effectTab === 'bgm' && (
            <div className="narration-empty" style={{ padding: 20 }}>
              <Music size={28} style={{ opacity: 0.3 }} />
              <p style={{ fontSize: 12 }}>BGM을 추가하려면 사운드 스튜디오에서 설정하세요</p>
            </div>
          )}

          {effectTab === 'focus' && (
            <div className="narration-empty" style={{ padding: 20 }}>
              <Focus size={28} style={{ opacity: 0.3 }} />
              <p style={{ fontSize: 12 }}>입/포커스 효과를 적용할 장면을 선택하세요</p>
            </div>
          )}
        </div>
      </div>

      {/* Timeline Area */}
      <div className="card" style={{ marginTop: 16, minHeight: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500, marginBottom: 4 }}>타임라인이 비어있습니다</p>
        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>이미지/영상 탭에서 장면을 생성하면 타임라인이 자동으로 채워집니다.</p>
      </div>

      {/* Export Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>내보내기:</span>
        <button className="btn-tag" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <FileText size={12} /> SRT 자막
        </button>
        <button className="btn-tag" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <FolderArchive size={12} /> SRT + 에셋 ZIP
        </button>
        <button className="btn-tag active-green" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          📁 프로젝트 파일 ▼
        </button>
        <button className="btn-tag active-purple" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Film size={12} /> MP4 영상 &nbsp;<span style={{ fontSize: 10, opacity: 0.7 }}>WebCodecs</span>
        </button>
      </div>

      {/* Footer info */}
      <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', marginTop: 12 }}>
        이용 엔진 : Supertonic 2 · 워치뮤저 다운로드
      </p>
    </div>
  );
}
