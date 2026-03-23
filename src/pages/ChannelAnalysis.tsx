import { useState } from 'react';
import { Search, TrendingUp, BarChart3, Share2, Bell, Play, FileUp, Pencil } from 'lucide-react';

export function ChannelAnalysis() {
  const [activeTab, setActiveTab] = useState('channel');
  const [contentType, setContentType] = useState('동영상');
  const [region, setRegion] = useState('국내');
  const [videoCount, setVideoCount] = useState(10);
  const [sortBy, setSortBy] = useState('최신순');
  const [source, setSource] = useState('youtube');

  const tabs = [
    { id: 'keyword', label: '키워드 연', icon: <Search size={16} /> },
    { id: 'channel', label: '채널 분석실', icon: <BarChart3 size={16} /> },
    { id: 'video', label: '영상 분석실', icon: <TrendingUp size={16} /> },
    { id: 'social', label: '소셜 분석실', icon: <Share2 size={16} /> },
    { id: 'views', label: '조회수 알림', icon: <Bell size={16} /> },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-header-icon">📊</div>
        <div className="page-header-text">
          <h2>채널/영상 분석</h2>
          <p>키워드 인사이트와 채널 벤치마킹으로 콘텐츠 전략을 수립하세요.</p>
        </div>
        <div className="page-header-right">
          <span>AI 사용량</span>
          <div className="usage-bar">
            <div className="usage-bar-fill" style={{ width: '0%' }} />
          </div>
          <span>0 / 10,000</span>
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

      {activeTab === 'channel' && (
        <div>
          <div className="info-box green">
            🚀 안정적이고 빠른 다운로드 — <strong style={{ marginLeft: 4 }}>앨파 앱 설정</strong>
          </div>

          <div className="card">
            <button className="btn-primary" style={{ marginBottom: 16 }}>+ 새 분석</button>
            <p className="card-description">
              벤치마크 채널의 URL, 파일 또는 텍스트를 입력하면 AI가 말투/구조/도입부 패턴을 역설게 분석합니다.
              분석 결과는 대본 생성 시 자동 적용됩니다.
            </p>

            <h3 className="card-title">채널 스타일 클로닝</h3>

            <div className="source-toggle" style={{ marginBottom: 16 }}>
              <button className={`source-btn ${source === 'youtube' ? 'active' : ''}`} onClick={() => setSource('youtube')}>
                <Play size={16} /> YouTube 채널
              </button>
              <button className={`source-btn ${source === 'file' ? 'active' : ''}`} onClick={() => setSource('file')}>
                <FileUp size={16} /> 파일 업로드
              </button>
              <button className={`source-btn ${source === 'text' ? 'active' : ''}`} onClick={() => setSource('text')}>
                <Pencil size={16} /> 직접 입력
              </button>
            </div>

            <div className="row">
              <span className="row-label">콘텐츠 형식</span>
              <div className="btn-group">
                <button className={`btn-tag ${contentType === '동영상' ? 'active-orange' : ''}`} onClick={() => setContentType('동영상')}>동영상</button>
                <button className={`btn-tag ${contentType === '쇼츠' ? 'active-orange' : ''}`} onClick={() => setContentType('쇼츠')}>쇼츠</button>
              </div>

              <span className="row-label" style={{ marginLeft: 16 }}>콘텐츠 지역</span>
              <div className="btn-group">
                <button className={`btn-tag ${region === '국내' ? 'active-green' : ''}`} onClick={() => setRegion('국내')}>국내</button>
                <button className={`btn-tag ${region === '해외' ? 'active-green' : ''}`} onClick={() => setRegion('해외')}>해외</button>
              </div>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 8 }}>키를 검색</span>
            </div>

            <div className="row">
              <span className="row-label">분석 영상 수</span>
              <div className="btn-group">
                {[5, 10, 15, 20, 30].map(n => (
                  <button key={n} className={`btn-tag ${videoCount === n ? 'active' : ''}`} onClick={() => setVideoCount(n)}>
                    {n}개
                  </button>
                ))}
              </div>

              <div className="btn-group" style={{ marginLeft: 16 }}>
                <button className={`btn-tag ${sortBy === '최신순' ? 'active-purple' : ''}`} onClick={() => setSortBy('최신순')}>최신순</button>
                <button className={`btn-tag ${sortBy === '인기순' ? 'active-purple' : ''}`} onClick={() => setSortBy('인기순')}>인기순</button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 16 }}>
              <input
                type="text"
                className="text-input"
                placeholder="YouTube URL (채널, 영상, 쇼츠 모두 가능 — 예: @채널명, 영상/쇼츠 링크)"
                style={{ flex: 1 }}
              />
              <button className="btn-primary">분석 시작</button>
            </div>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
              YouTube API가 불안정합니다. 파일이나 텍스트로 분석하려면 '다른 입력도' 또는 '직접 입력' 탭을 사용하세요
            </p>
          </div>

          <div className="card">
            <h3 className="card-title">주제 입력</h3>
            <textarea
              className="text-input"
              placeholder="관심 있는 주제를 입력하세요 (예: AI 기술, 다이어트 식단, 일본 여행, 자취 꿀팁..)"
              rows={3}
            />
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
              채널 분석 없이도 사용 가능합니다. 주제만 입력하면 AI가 바이럴 가능성이 높은 영상 아이디어 10개를 추천합니다.
            </p>

            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <button className="btn-wide green" style={{ flex: 2 }}>
                ✨ 스타일 기반 주제 추천
              </button>
              <button className="btn-wide blue" style={{ flex: 1 }}>
                주제 10개 재추천
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'keyword' && (
        <div className="card">
          <h3 className="card-title"><Search size={18} /> 키워드 연구</h3>
          <p className="card-description">키워드를 입력하면 관련 키워드, 검색량, 경쟁도를 분석합니다.</p>
          <input type="text" className="text-input" placeholder="분석할 키워드를 입력하세요..." />
          <button className="btn-primary" style={{ marginTop: 12 }}>키워드 분석</button>
        </div>
      )}

      {activeTab === 'video' && (
        <div className="card">
          <h3 className="card-title"><TrendingUp size={18} /> 영상 분석실</h3>
          <p className="card-description">개별 영상의 성과를 분석하고 인사이트를 추출합니다.</p>
          <input type="text" className="text-input" placeholder="YouTube 영상 URL을 입력하세요..." />
          <button className="btn-primary" style={{ marginTop: 12 }}>영상 분석</button>
        </div>
      )}

      {activeTab === 'social' && (
        <div className="card">
          <h3 className="card-title"><Share2 size={18} /> 소셜 분석실</h3>
          <p className="card-description">소셜 미디어 트렌드를 분석합니다.</p>
          <input type="text" className="text-input" placeholder="분석할 키워드나 URL을 입력하세요..." />
          <button className="btn-primary" style={{ marginTop: 12 }}>소셜 분석</button>
        </div>
      )}

      {activeTab === 'views' && (
        <div className="card">
          <h3 className="card-title"><Bell size={18} /> 조회수 알림</h3>
          <p className="card-description">특정 영상의 조회수 변화를 모니터링합니다.</p>
          <input type="text" className="text-input" placeholder="모니터링할 YouTube 영상 URL..." />
          <button className="btn-primary" style={{ marginTop: 12 }}>알림 설정</button>
        </div>
      )}
    </div>
  );
}
