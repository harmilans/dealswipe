import React, { useState } from 'react';
import { TopBar } from './Components';
import { BuyerView } from './BuyerView';
import { SellerView } from './SellerView';
import { PipelineView } from './PipelineView';
import { NetworkView, BriefsView } from './OtherViews';

type Role = 'buyer' | 'seller';
type Tab = 'matches' | 'pipeline' | 'network' | 'briefs';

const App: React.FC = () => {
  const [role, setRole] = useState<Role>('buyer');
  const [tab, setTab] = useState<Tab>('matches');

  const handleRoleChange = (r: Role) => {
    setRole(r);
    setTab('matches');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <TopBar activeTab={tab} onTabChange={(t) => setTab(t as Tab)} role={role} onRoleChange={handleRoleChange} />

      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 24px 48px' }}>

        {/* Context banner */}
        <div style={{
          background: 'var(--bg2)', border: '1px solid var(--border2)',
          borderRadius: 12, padding: '10px 16px', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 12, fontSize: 12,
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--green)',
            boxShadow: '0 0 8px var(--green)',
          }} />
          <span style={{ color: 'var(--text2)' }}>
            {role === 'buyer'
              ? <><span style={{ color: 'var(--text)', fontWeight: 600 }}>Buyer agent view</span> — you see listing details, property photos, and seller KPIs. Buyer client data is private.</>
              : <><span style={{ color: 'var(--text)', fontWeight: 600 }}>Seller agent view</span> — you see buyer financials, credit score, income source, and purchase intent. Listing is Marina Gate 2.</>
            }
          </span>
          <div style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text3)', fontFamily: "'DM Mono', monospace" }}>
            RERA verified · Dubai Land Department
          </div>
        </div>

        {/* Tab content */}
        <div key={`${role}-${tab}`} style={{ animation: 'fadeIn 0.25s ease' }}>
          {tab === 'matches' && role === 'buyer' && <BuyerView />}
          {tab === 'matches' && role === 'seller' && <SellerView />}
          {tab === 'pipeline' && <PipelineView />}
          {tab === 'network' && <NetworkView />}
          {tab === 'briefs' && <BriefsView role={role} />}
        </div>
      </main>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        * { scrollbar-width: thin; scrollbar-color: var(--gold-dim) var(--bg2); }
        button { transition: opacity 0.15s, transform 0.1s; }
        button:hover { opacity: 0.88; }
        button:active { transform: scale(0.97); }
      `}</style>
    </div>
  );
};

export default App;
