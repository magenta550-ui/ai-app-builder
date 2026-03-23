import { MonitorPlay, UserCircle, Import, Presentation, ShoppingBag, Subtitles, Wrench } from 'lucide-react';
import type { PageType } from '../App';

interface ToolsPageProps {
  page: PageType;
}

const toolPages: Record<string, { icon: React.ReactNode; name: string; desc: string }> = {
  'bundamal-studio': {
    icon: <MonitorPlay size={48} />,
    name: '번데말 스튜디오',
    desc: '번데말(더빙) 스타일의 영상을 자동으로 제작합니다. 대본만 입력하면 AI가 영상까지 완성해드립니다.',
  },
  'character-maker': {
    icon: <UserCircle size={48} />,
    name: '캐릭터 비틀기',
    desc: '기존 캐릭터의 스타일을 변형하여 새로운 캐릭터를 생성합니다. AI 기반 캐릭터 디자인 도구입니다.',
  },
  'source-import': {
    icon: <Import size={48} />,
    name: '소스 임포트',
    desc: '외부 소스(이미지, 영상, 오디오)를 프로젝트에 불러옵니다.',
  },
  'ppt-master': {
    icon: <Presentation size={48} />,
    name: 'PPT 마스터',
    desc: 'PPT/PDF 파일을 영상으로 변환합니다. 슬라이드를 자동으로 영상화합니다.',
  },
  'shopping-content': {
    icon: <ShoppingBag size={48} />,
    name: '쇼핑콘텐츠',
    desc: '쇼핑/커머스용 콘텐츠를 AI로 자동 생성합니다. 상품 설명, 리뷰 영상 등을 제작합니다.',
  },
  'subtitle-remover': {
    icon: <Subtitles size={48} />,
    name: '자막/워터마크 제거',
    desc: '영상에서 자막이나 워터마크를 AI로 깔끔하게 제거합니다.',
  },
};

export function ToolsPage({ page }: ToolsPageProps) {
  const tool = toolPages[page];

  if (!tool) {
    return (
      <div className="placeholder-page">
        <Wrench size={48} style={{ opacity: 0.3 }} />
        <h3>도구를 선택해주세요</h3>
        <p>왼쪽 사이드바에서 사용할 도구를 선택하세요.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header-icon" style={{ fontSize: 24 }}>🧰</div>
        <div className="page-header-text">
          <h2>{tool.name}</h2>
          <p>{tool.desc}</p>
        </div>
      </div>

      <div className="card" style={{ padding: 40 }}>
        <div className="narration-empty">
          <div style={{ opacity: 0.3, marginBottom: 8 }}>{tool.icon}</div>
          <h3>{tool.name}</h3>
          <p>{tool.desc}</p>
          <button className="btn-primary" style={{ marginTop: 20 }}>
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
