import { Upload, Play, Camera, Clock } from 'lucide-react';
import { useState } from 'react';

export function UploadPage() {
  const [platform, setPlatform] = useState('youtube');

  return (
    <div>
      <div className="page-header">
        <div className="page-header-icon">📤</div>
        <div className="page-header-text">
          <h2>업로드</h2>
          <p>완성된 영상을 플랫폼에 업로드합니다</p>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">📱 업로드 플랫폼 선택</h3>

        <div className="engine-grid">
          <div
            className={`engine-card ${platform === 'youtube' ? 'active' : ''}`}
            onClick={() => setPlatform('youtube')}
          >
            <div className="engine-icon"><Play size={20} /></div>
            <div className="engine-info">
              <h4>YouTube</h4>
              <p>동영상 & 쇼츠</p>
            </div>
          </div>
          <div
            className={`engine-card ${platform === 'instagram' ? 'active' : ''}`}
            onClick={() => setPlatform('instagram')}
          >
            <div className="engine-icon"><Camera size={20} /></div>
            <div className="engine-info">
              <h4>Instagram</h4>
              <p>릴스 & 피드</p>
            </div>
          </div>
          <div
            className={`engine-card ${platform === 'tiktok' ? 'active' : ''}`}
            onClick={() => setPlatform('tiktok')}
          >
            <div className="engine-icon">🎵</div>
            <div className="engine-info">
              <h4>TikTok</h4>
              <p>쇼트폼 영상</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">📋 업로드 설정</h3>

        <div className="input-group">
          <label className="input-label">영상 제목</label>
          <input type="text" className="text-input" placeholder="영상 제목을 입력하세요..." />
        </div>

        <div className="input-group">
          <label className="input-label">설명</label>
          <textarea className="text-input" placeholder="영상 설명을 입력하세요..." rows={4} />
        </div>

        <div className="input-group">
          <label className="input-label">태그</label>
          <input type="text" className="text-input" placeholder="태그를 쉼표로 구분하여 입력..." />
        </div>

        <div className="input-group">
          <label className="input-label">공개 설정</label>
          <div className="btn-group">
            <button className="btn-tag active">공개</button>
            <button className="btn-tag">비공개</button>
            <button className="btn-tag">일부공개</button>
            <button className="btn-tag">예약 업로드</button>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title"><Clock size={16} /> 예약 업로드</h3>
        <p className="card-description">최적의 시간에 자동으로 업로드됩니다.</p>
        <div className="row">
          <input type="date" className="text-input" style={{ width: 200 }} />
          <input type="time" className="text-input" style={{ width: 150 }} />
        </div>
      </div>

      <button className="btn-wide green" style={{ marginTop: 16 }}>
        <Upload size={16} style={{ marginRight: 8 }} />
        업로드 시작
      </button>
    </div>
  );
}
