import { Scissors, Play, Download } from 'lucide-react';

export function EditRoom() {
  return (
    <div>
      <div className="page-header">
        <div className="page-header-icon">✂️</div>
        <div className="page-header-text">
          <h2>편집실</h2>
          <p>생성된 이미지와 음성을 조합하여 영상을 편집합니다</p>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title"><Scissors size={18} /> 타임라인 편집</h3>
        <p className="card-description">이미지, 나래이션, 배경음악을 조합하여 최종 영상을 만듭니다.</p>

        <div className="narration-empty">
          <Play size={48} style={{ opacity: 0.3 }} />
          <h3>편집할 콘텐츠를 준비해주세요</h3>
          <p>이미지/영상 탭에서 이미지를 생성하고, 사운드 스튜디오에서 나래이션을 생성하면<br />
          여기서 자동으로 타임라인이 구성됩니다.</p>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">🎬 렌더링 옵션</h3>
        <div className="selection-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="selection-card active">
            <h4>1080p (FHD)</h4>
            <p>기본 품질</p>
          </div>
          <div className="selection-card">
            <h4>1440p (2K)</h4>
            <p>고화질</p>
          </div>
          <div className="selection-card">
            <h4>2160p (4K)</h4>
            <p>최고 화질</p>
          </div>
        </div>

        <button className="btn-wide blue" style={{ marginTop: 16 }}>
          <Download size={16} style={{ marginRight: 8 }} />
          영상 렌더링 & 다운로드
        </button>
      </div>
    </div>
  );
}
