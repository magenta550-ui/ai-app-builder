import { DollarSign, Save, HelpCircle } from 'lucide-react';

export function Header() {
  return (
    <div className="top-header">
      <div className="header-left" />
      <div className="header-right">
        <div className="header-cost">
          <DollarSign size={14} />
          실시간 제작 비용 : <strong>₩ 0.00</strong>
        </div>
        <button className="header-btn">
          <Save size={12} style={{ marginRight: 4 }} />
          자동 저장됨
        </button>
        <button className="header-btn primary">
          로그인 / 회원가입
        </button>
        <button className="header-btn">
          <HelpCircle size={12} style={{ marginRight: 4 }} />
          도움말
        </button>
      </div>
    </div>
  );
}
