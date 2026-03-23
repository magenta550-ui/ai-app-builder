import { FolderOpen, Plus, Clock, MoreHorizontal } from 'lucide-react';

export function ProjectPage() {
  const projects = [
    { id: 1, name: '다이어트 식단 시리즈', date: '2026-03-22', status: '대본 작성 중', videos: 3 },
    { id: 2, name: '일본 여행 브이로그', date: '2026-03-20', status: '이미지 생성 완료', videos: 5 },
    { id: 3, name: 'AI 트렌드 분석', date: '2026-03-18', status: '업로드 완료', videos: 2 },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-header-icon">📁</div>
        <div className="page-header-text">
          <h2>프로젝트</h2>
          <p>생성한 프로젝트를 관리합니다</p>
        </div>
        <button className="btn-primary" style={{ marginLeft: 'auto' }}>
          <Plus size={16} style={{ marginRight: 4 }} /> 새 프로젝트
        </button>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {projects.map(p => (
          <div key={p.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer' }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FolderOpen size={22} color="var(--accent-blue)" />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</h4>
              <div style={{ display: 'flex', gap: 12, marginTop: 4, fontSize: 12, color: 'var(--text-muted)' }}>
                <span><Clock size={12} style={{ marginRight: 4 }} />{p.date}</span>
                <span>영상 {p.videos}개</span>
                <span style={{ color: 'var(--accent-green)' }}>{p.status}</span>
              </div>
            </div>
            <button style={{ background: 'none', color: 'var(--text-muted)', padding: 4 }}>
              <MoreHorizontal size={18} />
            </button>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="narration-empty">
          <FolderOpen size={48} style={{ opacity: 0.3 }} />
          <h3>프로젝트가 없습니다</h3>
          <p>새 프로젝트를 만들어 시작하세요</p>
        </div>
      )}
    </div>
  );
}
