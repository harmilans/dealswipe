import React from 'react';
import { CheckCircle, Shield, Star, TrendingUp, Users, FileText, Home } from 'lucide-react';
import { Agent, formatAED } from './data';

interface TopBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  role: 'buyer' | 'seller';
  onRoleChange: (role: 'buyer' | 'seller') => void;
}

export const TopBar: React.FC<TopBarProps> = ({ activeTab, onTabChange, role, onRoleChange }) => {
  const tabs = [
    { id: 'matches', label: 'Matches', icon: <Home size={14} /> },
    { id: 'pipeline', label: 'Pipeline', icon: <TrendingUp size={14} /> },
    { id: 'network', label: 'Network', icon: <Users size={14} /> },
    { id: 'briefs', label: role === 'buyer' ? 'My Briefs' : 'My Listings', icon: <FileText size={14} /> },
  ];

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(10,10,11,0.92)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(201,168,76,0.1)',
      padding: '0 24px',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, height: 56 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div style={{
              width: 28, height: 28, background: 'var(--gold)',
              borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 800, color: '#0A0A0B',
            }}>D</div>
            <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.02em' }}>
              Deal<span style={{ color: 'var(--gold)' }}>Swipe</span>
            </span>
            <span style={{
              fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--text3)', borderLeft: '1px solid var(--border2)', paddingLeft: 8, marginLeft: 4,
            }}>Dubai · RERA</span>
          </div>

          {/* Nav */}
          <nav style={{ display: 'flex', gap: 2, flex: 1 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => onTabChange(t.id)} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 500,
                background: activeTab === t.id ? 'rgba(201,168,76,0.1)' : 'transparent',
                color: activeTab === t.id ? 'var(--gold)' : 'var(--text2)',
                border: 'none', cursor: 'pointer', transition: 'all 0.15s',
              }}>
                {t.icon}{t.label}
              </button>
            ))}
          </nav>

          {/* Role toggle */}
          <div style={{
            display: 'flex', background: 'var(--bg3)', borderRadius: 8,
            border: '1px solid var(--border2)', padding: 3, gap: 2,
          }}>
            {(['buyer', 'seller'] as const).map(r => (
              <button key={r} onClick={() => onRoleChange(r)} style={{
                padding: '5px 14px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                letterSpacing: '0.04em', textTransform: 'capitalize',
                background: role === r ? (r === 'buyer' ? '#3D7BE8' : 'var(--gold)') : 'transparent',
                color: role === r ? '#fff' : 'var(--text2)',
                border: 'none', cursor: 'pointer', transition: 'all 0.15s',
              }}>
                {r === 'buyer' ? '🔍 Buyer Agent' : '🏷 Seller Agent'}
              </button>
            ))}
          </div>

          {/* Agent pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--gold-dim), var(--gold))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, color: '#0A0A0B',
            }}>RP</div>
            <div style={{ display: 'none' }}>
              <div style={{ fontSize: 12, fontWeight: 500 }}>Raj Patel</div>
              <div style={{ fontSize: 10, color: 'var(--text3)' }}>Haus & Haus</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export const AgentCard: React.FC<{ agent: Agent; revealed?: boolean }> = ({ agent, revealed }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 12,
    background: 'var(--bg3)', borderRadius: 10, padding: '12px 14px',
    border: '1px solid var(--border2)',
  }}>
    <div style={{
      width: 40, height: 40, borderRadius: '50%',
      background: 'linear-gradient(135deg, #1a3a6b, #3D7BE8)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0,
    }}>{agent.avatar}</div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 13, fontWeight: 600 }}>{agent.name}</div>
      <div style={{ fontSize: 11, color: 'var(--text2)' }}>{agent.company}</div>
      {revealed && (
        <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>
          {agent.phone} · {agent.email}
        </div>
      )}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <CheckCircle size={11} color="var(--green)" />
        <span style={{ fontSize: 10, color: 'var(--green)', fontWeight: 600 }}>RERA</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Star size={10} color="var(--gold)" fill="var(--gold)" />
        <span style={{ fontSize: 11, fontWeight: 600 }}>{agent.rating}</span>
      </div>
      <div style={{ fontSize: 10, color: 'var(--text3)' }}>{agent.transactions} deals</div>
    </div>
  </div>
);

export const ScoreBadge: React.FC<{ score: number; size?: 'sm' | 'md' | 'lg' }> = ({ score, size = 'md' }) => {
  const color = score >= 85 ? 'var(--green)' : score >= 70 ? 'var(--amber)' : 'var(--red)';
  const bg = score >= 85 ? 'var(--green-bg)' : score >= 70 ? 'var(--amber-bg)' : 'var(--red-bg)';
  const fontSize = size === 'lg' ? 22 : size === 'sm' ? 11 : 14;
  return (
    <div style={{
      background: bg, color, borderRadius: 8, padding: size === 'lg' ? '8px 14px' : '4px 10px',
      fontSize, fontWeight: 700, fontFamily: "'DM Mono', monospace", flexShrink: 0,
    }}>{score}%</div>
  );
};

export const KpiCard: React.FC<{ label: string; value: string; sub?: string; color?: string }> = ({ label, value, sub, color }) => (
  <div style={{
    background: 'var(--bg3)', borderRadius: 10, padding: '12px 14px',
    border: '1px solid var(--border2)', display: 'flex', flexDirection: 'column', gap: 4,
  }}>
    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text3)' }}>{label}</div>
    <div style={{ fontSize: 16, fontWeight: 700, color: color || 'var(--text)', fontFamily: "'DM Mono', monospace" }}>{value}</div>
    {sub && <div style={{ fontSize: 10, color: 'var(--text2)' }}>{sub}</div>}
  </div>
);

export const FieldRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '8px 0', borderBottom: '1px solid var(--border2)',
  }}>
    <span style={{ fontSize: 12, color: 'var(--text2)' }}>{label}</span>
    <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)', textAlign: 'right', maxWidth: '55%' }}>{value}</span>
  </div>
);

export const CreditBar: React.FC<{ score: number }> = ({ score }) => {
  if (score === 0) return <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text2)' }}>N/A — cash buyer</span>;
  const pct = Math.round(((score - 300) / 550) * 100);
  const color = score >= 750 ? 'var(--green)' : score >= 650 ? 'var(--amber)' : 'var(--red)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 4, background: 'var(--bg4)', borderRadius: 2 }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 2 }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color, fontFamily: "'DM Mono', monospace", minWidth: 32 }}>{score}</span>
    </div>
  );
};

export const Tag: React.FC<{ label: string; variant?: 'green' | 'blue' | 'amber' | 'red' | 'gray' | 'gold' }> = ({ label, variant = 'gray' }) => {
  const styles: Record<string, { bg: string; color: string }> = {
    green: { bg: 'var(--green-bg)', color: 'var(--green)' },
    blue: { bg: 'var(--blue-bg)', color: 'var(--blue)' },
    amber: { bg: 'var(--amber-bg)', color: 'var(--amber)' },
    red: { bg: 'var(--red-bg)', color: 'var(--red)' },
    gold: { bg: 'rgba(201,168,76,0.12)', color: 'var(--gold)' },
    gray: { bg: 'rgba(255,255,255,0.06)', color: 'var(--text2)' },
  };
  const s = styles[variant];
  return (
    <span style={{
      background: s.bg, color: s.color, borderRadius: 100, padding: '3px 9px',
      fontSize: 10, fontWeight: 600, letterSpacing: '0.04em', whiteSpace: 'nowrap',
    }}>{label}</span>
  );
};

export const MatchReasons: React.FC<{ reasons: string[]; misses: string[] }> = ({ reasons, misses }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
    {reasons.map(r => <Tag key={r} label={r} variant="green" />)}
    {misses.map(m => <Tag key={m} label={m} variant="red" />)}
  </div>
);

export const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
    color: 'var(--text3)', marginBottom: 10,
  }}>{children}</div>
);

export const PriceChart: React.FC<{ history: { date: string; price: number }[] }> = ({ history }) => {
  if (history.length < 2) return null;
  const max = Math.max(...history.map(h => h.price));
  const min = Math.min(...history.map(h => h.price));
  const range = max - min || 1;
  const w = 240; const h = 60;
  const points = history.map((item, i) => {
    const x = (i / (history.length - 1)) * (w - 20) + 10;
    const y = ((1 - (item.price - min) / range) * (h - 20)) + 10;
    return `${x},${y}`;
  }).join(' ');

  const trend = history[history.length - 1].price < history[0].price;

  return (
    <div>
      <SectionLabel>Price history</SectionLabel>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
        <polyline fill="none" stroke={trend ? 'var(--green)' : 'var(--red)'}
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
        {history.map((item, i) => {
          const x = (i / (history.length - 1)) * (w - 20) + 10;
          const y = ((1 - (item.price - min) / range) * (h - 20)) + 10;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={3} fill={trend ? 'var(--green)' : 'var(--red)'} />
              <text x={x} y={h + 4} textAnchor="middle" fontSize={8} fill="var(--text3)" fontFamily="'DM Mono', monospace">
                {item.date.split(' ')[0]}
              </text>
              {i === history.length - 1 && (
                <text x={x} y={y - 7} textAnchor="middle" fontSize={8} fill="var(--text2)" fontFamily="'DM Mono', monospace">
                  {formatAED(item.price)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <div style={{ fontSize: 11, color: trend ? 'var(--green)' : 'var(--red)', fontWeight: 600, marginTop: 4 }}>
        {trend ? '▼' : '▲'} {formatAED(Math.abs(history[history.length - 1].price - history[0].price))} from first listed
      </div>
    </div>
  );
};
