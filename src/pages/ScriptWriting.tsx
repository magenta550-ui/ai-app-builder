import { useState } from 'react';
import { Sparkles, Pencil, FileText, Upload } from 'lucide-react';

export function ScriptWriting() {
  const [topic, setTopic] = useState('ai');
  const [style, setStyle] = useState('standard');
  const [model, setModel] = useState('opus');
  const [format, setFormat] = useState('동영상');
  const [segmentType, setSegmentType] = useState('숏폼');

  const styles = [
    { id: 'standard', icon: '📺', name: '스탠다드 유튜브', desc: '폭넓은 젊진 명 · 6000자 기준' },
    { id: 'community', icon: '🍲', name: '커뮤니티', desc: '짧은커 좋종어에 · 쇼츠 250~350자' },
    { id: 'shopping', icon: '🛍️', name: '탑 쇼핑', desc: '좋직 타진정적 · 구전 관리에 응용' },
    { id: 'knowledge', icon: '✏️', name: '지식', desc: '졸든 작성품들 · 지식 쇼츠' },
    { id: 'humanism', icon: '💫', name: '휴머니즘 사이다', desc: '좋분 필요조 · 감통 7000자 초고' },
  ];

  const models = [
    { id: 'gemini', icon: '✦', name: 'Gemini 3.1 Pro', desc: '간주로도 핵심 건포를 담당하는 빠른 대본 생성', price: '$0.01/천', color: '#4285f4' },
    { id: 'sonnet', icon: '✦', name: 'Claude Sonnet 4.6', desc: '자연스러운 대화체 흐름에 강한 대본 활용도', price: '$0.02/천', color: '#da7756' },
    { id: 'opus', icon: '✦', name: 'Claude Opus 4.6', desc: '최고 수준의 스토리텔링과 바이럴 구조', price: '$0.015/형', color: '#8b5cf6' },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-header-icon">📝</div>
        <div className="page-header-text">
          <h2>대본 작성</h2>
          <p>AI가 채널 스타일을 분석하여 맞춤형 대본을 생성합니다.</p>
        </div>
      </div>

      {/* Step 1: 소재 정하기 */}
      <div className="section-header">
        <span className="step-num">1</span>
        소재 정하기
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 12, marginBottom: 16 }}>
        <div
          className={`selection-card ${topic === 'ai' ? 'active' : ''}`}
          onClick={() => setTopic('ai')}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}
        >
          <Sparkles size={24} style={{ marginBottom: 8, color: 'var(--accent-green)' }} />
          <h4>AI가 추천해줌</h4>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>주제가 없어도 OK</p>
        </div>
        <div
          className={`selection-card ${topic === 'manual' ? 'active' : ''}`}
          onClick={() => setTopic('manual')}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <Pencil size={24} style={{ marginBottom: 8, color: 'var(--accent-orange)' }} />
          <h4>직접 입력하기</h4>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>제목 + 출거리</p>
        </div>
      </div>

      <button className="btn-wide green" style={{ marginBottom: 24 }}>
        ✨ 지금 쓰는 바이럴 소재 5개 추천받기
      </button>

      <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16 }}>
        ▸ 고급 편집 기획 / 벤치마크로 절감한 추천
      </p>

      {/* Step 2: 스타일 선택 */}
      <div className="section-header">
        <span className="step-num">2</span>
        스타일 선택 <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 400, marginLeft: 4 }}>(선택사항)</span>
      </div>

      <div className="selection-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        {styles.map(s => (
          <div
            key={s.id}
            className={`selection-card ${style === s.id ? 'active' : ''}`}
            onClick={() => setStyle(s.id)}
          >
            <div className="card-icon">{s.icon}</div>
            <h4>{s.name}</h4>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Step 3: 대본 생성 */}
      <div className="section-header">
        <span className="step-num">3</span>
        대본 생성
        <span style={{ fontSize: 11, color: 'var(--accent-orange)', marginLeft: 8 }}>
          예상 비용: $0.015 (1,000자 기준)
        </span>
      </div>

      <div className="model-grid">
        {models.map(m => (
          <div
            key={m.id}
            className={`model-card ${model === m.id ? 'active' : ''}`}
            onClick={() => setModel(m.id)}
          >
            <div className="model-name">
              <span style={{ color: m.color }}>✦</span>
              {m.name}
            </div>
            <div className="model-desc">{m.desc}</div>
            <div className="model-price">{m.price}</div>
          </div>
        ))}
      </div>

      <div className="info-box purple">
        ✦ Claude Opus 4.6 — 감정구성의 복합적수준 작할 | 같이 있는 서사 | 포리파담을 곰 감역 미디론 — 최신 트문드 문형의 필요하면 Gemini 추천
      </div>

      {/* Format & Target */}
      <div className="row">
        <span className="row-label">형식</span>
        <div className="btn-group">
          {['동영상', '쇼츠', '8분'].map(f => (
            <button key={f} className={`btn-tag ${format === f ? 'active' : ''}`} onClick={() => setFormat(f)}>{f}</button>
          ))}
        </div>
      </div>

      <div className="row">
        <span>● 타겟</span>
        <select className="text-input" style={{ width: 160, padding: '6px 10px' }} defaultValue="중등">
          <option>🔥 중등 (어린이)</option>
          <option>청소년</option>
          <option>성인</option>
        </select>
        <span style={{ fontSize: 12, color: 'var(--accent-blue)' }}>어린이로 작성 · 중등 자료 기반</span>
      </div>

      {/* Script Settings */}
      <div className="script-settings-row" style={{ marginTop: 16 }}>
        <div className="setting-item">
          <span>🔊</span>
          <input type="number" defaultValue={5000} />
          <span>자</span>
        </div>
        <div className="setting-item">
          <span>약 7분 42초</span>
        </div>
        <button className="btn-opus" style={{ marginLeft: 'auto' }}>
          ✦ Opus 대본 생성
        </button>
      </div>

      <p style={{ fontSize: 12, color: 'var(--accent-orange)', marginBottom: 16 }}>
        STEP 1에서 소재를 선택하거나 직접 입력하세요
      </p>

      {/* Script Editor */}
      <div className="script-editor">
        <div className="script-editor-header">
          <h4><Pencil size={16} /> 대본</h4>
          <div className="script-editor-actions">
            <button className="btn-tag active-green"><FileText size={12} /> 파일 불러오기</button>
            <button className="btn-tag"><Upload size={12} /> 복사</button>
          </div>
        </div>
        <div className="script-editor-body">
          <textarea placeholder="대본을 직접 입력하거나, 위에서 AI 생성을 사용하세요." />
        </div>
        <div className="script-editor-footer">
          TXT SRT MD PDF CSV Excel 형식
        </div>
      </div>

      {/* 대본 확장 */}
      <div className="card">
        <h3 className="card-title">📐 대본 확장 <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 400 }}>(전체 대본을 AI가 자연스럽게 늘려줍니다)</span></h3>
      </div>

      {/* 단락 나누기 */}
      <div className="card">
        <h3 className="card-title">📋 단락 나누기 <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 400 }}>이미지/영상 탭에서 이 단락을 확인 후 장면 분석이 진행됩니다</span></h3>
        <div className="btn-group" style={{ marginBottom: 12 }}>
          {['동영', '숏폼', '나노', '수동'].map(t => (
            <button key={t} className={`btn-tag ${segmentType === t ? 'active-orange' : ''}`} onClick={() => setSegmentType(t)}>{t}</button>
          ))}
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          쇼츠/릴스 — 1문장 = 1장면. 빠른 컷 전환
        </p>
        <p style={{ fontSize: 12, color: 'var(--accent-blue)', marginTop: 4 }}>
          단락 나누기는 대본의 구조를 정리합니다. 이미지/영상 탭에서 이 단락을 확인한 후 AI가 비주얼 프롬프트를 생성합니다.
        </p>
        <p style={{ fontSize: 12, color: 'var(--accent-blue)', marginTop: 4, cursor: 'pointer' }}>
          ▼ 단락 미리보기
        </p>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12, textAlign: 'center' }}>
          대본을 입력하면 가장 긴 구간의 분할 미리보기가 표시됩니다.
        </p>
      </div>

      {/* Bottom Actions */}
      <div className="bottom-actions">
        <button className="bottom-action-btn blue">📋 단락 나누기</button>
        <button className="bottom-action-btn green">🔊 사운드 →</button>
        <button className="bottom-action-btn orange">🎬 이미지/영상 →</button>
      </div>
    </div>
  );
}
