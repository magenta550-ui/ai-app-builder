import {
  Plus, FolderOpen, Search, FileText, Headphones, Volume2,
  Image, Scissors, Upload, Wrench, MonitorPlay, UserCircle,
  Import, Presentation, ShoppingBag, Subtitles
} from 'lucide-react';
import type { PageType } from '../App';

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        All In One Production <span>v4.5</span>
      </div>

      <button className="sidebar-new-btn" onClick={() => onPageChange('project')}>
        <Plus size={16} /> 새 프로젝트
      </button>

      <div className="sidebar-section">
        <div
          className={`sidebar-item ${currentPage === 'project' ? 'active' : ''}`}
          onClick={() => onPageChange('project')}
        >
          <FolderOpen className="icon" size={18} />
          프로젝트
        </div>

        <div
          className={`sidebar-item ${currentPage === 'channel-analysis' ? 'active' : ''}`}
          onClick={() => onPageChange('channel-analysis')}
        >
          <Search className="icon" size={18} />
          채널/영상 분석
          <span className="fire">🔥</span>
        </div>

        <div
          className={`sidebar-item ${currentPage === 'script-writing' ? 'active' : ''}`}
          onClick={() => onPageChange('script-writing')}
        >
          <FileText className="icon" size={18} />
          대본작성
          <span className="fire">🔥</span>
        </div>
      </div>

      <div className="sidebar-divider" />

      <div className="sidebar-group-title">
        <span>🎬 후반작업</span>
        <span className="toggle-icon">▲</span>
      </div>

      <div
        className={`sidebar-sub-item ${currentPage === 'sound-studio' ? 'active' : ''}`}
        onClick={() => onPageChange('sound-studio')}
      >
        <Headphones className="icon" size={16} />
        사운드스튜디오
      </div>
      <div
        className={`sidebar-sub-item ${currentPage === 'image-video' ? 'active' : ''}`}
        onClick={() => onPageChange('image-video')}
      >
        <Image className="icon" size={16} />
        이미지/영상
      </div>
      <div
        className={`sidebar-sub-item ${currentPage === 'edit-room' ? 'active' : ''}`}
        onClick={() => onPageChange('edit-room')}
      >
        <Scissors className="icon" size={16} />
        편집실
      </div>
      <div
        className={`sidebar-sub-item ${currentPage === 'upload' ? 'active' : ''}`}
        onClick={() => onPageChange('upload')}
      >
        <Upload className="icon" size={16} />
        업로드
      </div>

      <div className="sidebar-divider" />

      <div className="sidebar-group-title">
        <span>🧰 도구모음</span>
        <span className="toggle-icon">▲</span>
      </div>

      <div
        className={`sidebar-sub-item ${currentPage === 'bundamal-studio' ? 'active' : ''}`}
        onClick={() => onPageChange('bundamal-studio')}
      >
        <MonitorPlay className="icon" size={16} />
        번데말 스튜디오
      </div>
      <div
        className={`sidebar-sub-item ${currentPage === 'character-maker' ? 'active' : ''}`}
        onClick={() => onPageChange('character-maker')}
      >
        <UserCircle className="icon" size={16} />
        캐릭터 비틀기
      </div>
      <div
        className={`sidebar-sub-item ${currentPage === 'source-import' ? 'active' : ''}`}
        onClick={() => onPageChange('source-import')}
      >
        <Import className="icon" size={16} />
        소스 임포트
      </div>
      <div
        className={`sidebar-sub-item ${currentPage === 'ppt-master' ? 'active' : ''}`}
        onClick={() => onPageChange('ppt-master')}
      >
        <Presentation className="icon" size={16} />
        PPT 마스터
      </div>
      <div
        className={`sidebar-sub-item ${currentPage === 'shopping-content' ? 'active' : ''}`}
        onClick={() => onPageChange('shopping-content')}
      >
        <ShoppingBag className="icon" size={16} />
        쇼핑콘텐츠
      </div>
      <div
        className={`sidebar-sub-item ${currentPage === 'subtitle-remover' ? 'active' : ''}`}
        onClick={() => onPageChange('subtitle-remover')}
      >
        <Subtitles className="icon" size={16} />
        자막/워터마크 제거
      </div>
    </div>
  );
}
