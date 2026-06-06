import React, { useState } from 'react';
import { X, Plug, Check, Lock, AlertTriangle, Shield, TrendingDown } from 'lucide-react';
import { BuyerBrief, BUYERS, MY_LISTING, formatAED } from './data';
import { ScoreBadge, KpiCard, AgentCard, FieldRow, Tag, MatchReasons, SectionLabel, CreditBar } from './Components';

const BuyerCard: React.FC<{
  buyer: BuyerBrief;
  selected: boolean;
  onSelect: () => void;
  onConnect: () => void;
  onPass: () => void;
  connected: boolean;
  passed: boolean;
}> = ({ buyer: b, selected, onSelect, onConnect, onPass, connected, passed }) => (
  <div onClick={onSelect} style={{
    background: selected ? 'rgba(201,168,76,0.04)' : 'var(--bg2)',
    border: `1px solid ${selected ? 'var(--gold)' : 'var(--border2)'}`,
    borderRadius: 12, overflow: 'hidden', cursor: 'pointer',
    opacity: passed ? 0.35 : 1, pointerEvents: passed ? 'none' : 'auto',
    transition: 'all 0.2s',
  }}>
    <div style={{ padding: '14px 16px' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        {/* Avatar */}
        <div style={{
          width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
          background: 'var(--bg4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
          border: '1px solid var(--border2)',
        }}>{b.emoji}</div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{b.nationality} · {b.financeType}</div>
              <div style={{ fontSize: 11, color: 'var(--text2)' }}>{b.agent.company} · Ref: {b.refCode}</div>
            </div>
            <ScoreBadge score={b.matchScore} size="sm" />
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 5, fontFamily: "'DM Mono', monospace" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{formatAED(b.budgetMin)}</span>
            <span style={{ color: 'var(--text3)', fontSize: 12 }}>–</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--gold)' }}>{formatAED(b.budgetMax)}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
            <Tag label={b.financeType} variant={b.financeType === 'Cash' ? 'gold' : 'blue'} />
            <Tag label={b.creditRating === 'N/A' ? 'Cash buyer' : `Credit: ${b.creditRating}`}
              variant={b.creditRating === 'Excellent' ? 'green' : b.creditRating === 'Good' ? 'amber' : b.creditRating === 'N/A' ? 'gold' : 'red'} />
            <Tag label={`${b.timeline}`} variant="gray" />
            <Tag label={`Serious: ${b.seriousness}/5`} variant={b.seriousness >= 4 ? 'green' : b.seriousness >= 3 ? 'amber' : 'gray'} />
          </div>
        </div>
      </div>
    </div>

    <div style={{ display: 'flex', gap: 8, padding: '8px 14px 12px', borderTop: '1px solid var(--border2)' }}>
      <button onClick={e => { e.stopPropagation(); onPass(); }} style={{
        flex: 1, padding: '7px 0', borderRadius: 8, fontSize: 12, fontWeight: 600,
        background: 'var(--bg4)', color: 'var(--text2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
      }}>
        <X size={13} /> Pass
      </button>
      <button onClick={e => { e.stopPropagation(); onConnect(); }} style={{
        flex: 2, padding: '7px 0', borderRadius: 8, fontSize: 12, fontWeight: 600,
        background: connected ? 'var(--green-bg)' : 'var(--gold)',
        color: connected ? 'var(--green)' : '#0A0A0B',
        border: connected ? '1px solid var(--green)' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
      }}>
        {connected ? <><Check size={13} /> Connected</> : <><Plug size={13} /> Connect with buyer agent</>}
      </button>
    </div>
  </div>
);

const BuyerDetail: React.FC<{ buyer: BuyerBrief; connected: boolean; onConnect: () => void }> = ({ buyer: b, connected, onConnect }) => (
  <div style={{ animation: 'fadeUp 0.3s ease' }}>
    {/* Header */}
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%', background: 'var(--bg4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
          border: '1px solid var(--border2)', flexShrink: 0,
        }}>{b.emoji}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'DM Serif Display', serif" }}>
            {b.nationality} · {b.financeType} buyer
          </div>
          <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 2 }}>
            Ref: {b.refCode} · Via {b.agent.company}
          </div>
        </div>
        <ScoreBadge score={b.matchScore} size="lg" />
      </div>
      <div style={{ display: 'flex', gap: 8, fontFamily: "'DM Mono', monospace", alignItems: 'baseline' }}>
        <span style={{ fontSize: 12, color: 'var(--text2)' }}>Budget:</span>
        <span style={{ fontSize: 14, fontWeight: 700 }}>{formatAED(b.budgetMin)}</span>
        <span style={{ color: 'var(--text3)' }}>–</span>
        <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--gold)' }}>{formatAED(b.budgetMax)}</span>
        {b.budgetStretch > b.budgetMax && (
          <span style={{ fontSize: 11, color: 'var(--text3)' }}>(stretch {formatAED(b.budgetStretch)})</span>
        )}
      </div>
    </div>

    {/* Match reasons */}
    <div style={{ marginBottom: 20 }}>
      <SectionLabel>Why this buyer matched your listing</SectionLabel>
      <MatchReasons reasons={b.matchReasons} misses={b.matchMisses} />
    </div>

    {/* Financial KPIs */}
    <div style={{ marginBottom: 20 }}>
      <SectionLabel>Financial KPIs</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        <KpiCard label="Finance type" value={b.financeType} color={b.financeType === 'Cash' ? 'var(--gold)' : 'var(--blue)'} />
        <KpiCard label="Down payment" value={formatAED(b.downPayment)} color="var(--green)" />
        {b.financeType === 'Cash'
          ? <KpiCard label="AML status" value={b.amlCleared ? 'Cleared' : 'Pending'} color={b.amlCleared ? 'var(--green)' : 'var(--red)'} />
          : <KpiCard label="Pre-approval" value={b.mortgagePreApproval > 0 ? formatAED(b.mortgagePreApproval) : 'In process'} color={b.mortgagePreApproval > 0 ? 'var(--green)' : 'var(--amber)'} />
        }
        <KpiCard label="Annual income" value={b.annualIncome > 0 ? formatAED(b.annualIncome) : 'Undisclosed'} />
        <KpiCard label="Timeline" value={b.timeline} />
        <KpiCard label="Seriousness" value={`${b.seriousness} / 5`} color={b.seriousness >= 4 ? 'var(--green)' : 'var(--amber)'} />
      </div>
    </div>

    {/* Credit score */}
    <div style={{
      background: 'var(--bg3)', borderRadius: 10, padding: '14px 16px',
      border: '1px solid var(--border2)', marginBottom: 20,
    }}>
      <SectionLabel>Credit & financial standing</SectionLabel>
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 6 }}>Credit score</div>
        <CreditBar score={b.creditScore} />
      </div>
      <FieldRow label="Credit rating" value={
        <span style={{ color: b.creditRating === 'Excellent' ? 'var(--green)' : b.creditRating === 'Good' ? 'var(--amber)' : b.creditRating === 'N/A' ? 'var(--text2)' : 'var(--red)' }}>
          {b.creditRating}
        </span>
      } />
      {b.mortgageLender && <FieldRow label="Mortgage lender" value={b.mortgageLender} />}
      <FieldRow label="Proof of funds" value={connected ? b.proofOfFunds : <span style={{ color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 4 }}><Lock size={10} /> Connect to view</span>} />
    </div>

    {/* Buyer profile */}
    <div style={{ marginBottom: 20 }}>
      <SectionLabel>Buyer profile</SectionLabel>
      <FieldRow label="Nationality" value={b.nationality} />
      <FieldRow label="Residency status" value={b.residencyStatus} />
      <FieldRow label="Source of income" value={b.incomeSource} />
      <FieldRow label="Employer" value={b.employer} />
      <FieldRow label="AML cleared" value={b.amlCleared ? <span style={{ color: 'var(--green)' }}>Yes <Check size={11} /></span> : <span style={{ color: 'var(--red)' }}>No</span>} />
    </div>

    {/* Requirements */}
    <div style={{ marginBottom: 20 }}>
      <SectionLabel>What the buyer needs</SectionLabel>
      <FieldRow label="Property type" value={b.propertyType} />
      <FieldRow label="Bedrooms" value={b.bedsMin === b.bedsMax ? `${b.bedsMin} BR` : `${b.bedsMin}–${b.bedsMax} BR`} />
      <FieldRow label="Min size" value={`${b.sqftMin.toLocaleString()} sqft`} />
      <FieldRow label="Primary locations" value={b.locationPrimary.join(', ')} />
      <FieldRow label="Alternative locations" value={b.locationAlternate.join(', ')} />
      <FieldRow label="Timeline" value={b.timeline} />
      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 6 }}>Deal-breakers</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {b.dealBreakers.map(d => <Tag key={d} label={d} variant="red" />)}
        </div>
      </div>
    </div>

    {/* History */}
    <div style={{ marginBottom: 20 }}>
      <SectionLabel>Viewing history & intent signals</SectionLabel>
      <FieldRow label="Previous viewings" value={`${b.previousViewings} properties`} />
      <FieldRow label="Viewings rejected" value={b.rejectionReasons.join(' · ')} />
      <FieldRow label="Seriousness rating" value={`${b.seriousness}/5 — ${['', 'Just browsing', 'Interested', 'Motivated', 'Ready to sign', 'Will sign this week'][b.seriousness]}`} />
      {connected && (
        <div style={{
          marginTop: 8, background: 'var(--bg4)', borderRadius: 8, padding: '10px 14px',
          fontSize: 12, color: 'var(--text2)', lineHeight: 1.6, borderLeft: '2px solid var(--gold)',
        }}>
          <strong style={{ color: 'var(--gold)', fontSize: 11 }}>Agent note (private):</strong> {b.notes}
        </div>
      )}
    </div>

    {/* Agent */}
    <div style={{ marginBottom: 20 }}>
      <SectionLabel>Buyer agent</SectionLabel>
      <AgentCard agent={b.agent} revealed={connected} />
      {connected && (
        <div style={{
          marginTop: 8, background: 'var(--green-bg)', borderRadius: 8, padding: '10px 14px',
          fontSize: 12, color: 'var(--green)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Check size={14} /> Connected · Contact {b.agent.name.split(' ')[0]} to arrange viewing
        </div>
      )}
      {!connected && (
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Lock size={11} /> Agent contact + private notes revealed after mutual connection
        </div>
      )}
    </div>

    <button onClick={onConnect} style={{
      width: '100%', padding: '13px 0', borderRadius: 10, fontSize: 13, fontWeight: 700,
      background: connected ? 'var(--green-bg)' : 'var(--gold)',
      color: connected ? 'var(--green)' : '#0A0A0B',
      border: connected ? '1px solid var(--green)' : 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    }}>
      {connected ? <><Check size={16} /> Connected — viewing can be arranged</> : <><Plug size={16} /> Connect with buyer agent</>}
    </button>
  </div>
);

export const SellerView: React.FC = () => {
  const [selected, setSelected] = useState<string | null>('b1');
  const [connected, setConnected] = useState<Set<string>>(new Set(['b1']));
  const [passed, setPassed] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'new' | 'connected'>('all');

  const buyers = BUYERS.filter(b => {
    if (passed.has(b.id)) return filter !== 'connected';
    if (filter === 'connected') return connected.has(b.id);
    return true;
  });

  const selectedBuyer = BUYERS.find(b => b.id === selected);

  return (
    <div>
      {/* My listing pill */}
      <div style={{
        background: 'var(--bg3)', borderRadius: 10, padding: '12px 16px',
        border: '1px solid var(--border)', marginBottom: 20,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{ fontSize: 24 }}>{MY_LISTING.emoji}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Your listing: {MY_LISTING.title}</div>
          <div style={{ fontSize: 11, color: 'var(--text2)' }}>
            {formatAED(MY_LISTING.askingPrice)} · {MY_LISTING.sqft.toLocaleString()} sqft · {MY_LISTING.community}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <Tag label="RERA verified" variant="green" />
          <Tag label={MY_LISTING.reraPermit} variant="gray" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 20, alignItems: 'start' }}>
        {/* Cards */}
        <div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
            {(['all', 'new', 'connected'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '5px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600,
                textTransform: 'capitalize',
                background: filter === f ? 'var(--gold)' : 'var(--bg3)',
                color: filter === f ? '#0A0A0B' : 'var(--text2)',
                border: `1px solid ${filter === f ? 'var(--gold)' : 'var(--border2)'}`,
              }}>{f === 'all' ? `All (${BUYERS.length})` : f === 'new' ? `New (${BUYERS.filter(b => !connected.has(b.id) && !passed.has(b.id)).length})` : `Connected (${connected.size})`}</button>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {buyers.sort((a, b) => b.matchScore - a.matchScore).map(b => (
              <BuyerCard key={b.id} buyer={b}
                selected={selected === b.id}
                connected={connected.has(b.id)}
                passed={passed.has(b.id)}
                onSelect={() => setSelected(selected === b.id ? null : b.id)}
                onConnect={() => { const s = new Set(connected); s.has(b.id) ? s.delete(b.id) : s.add(b.id); setConnected(s); }}
                onPass={() => { const s = new Set(passed); s.add(b.id); setPassed(s); if (selected === b.id) setSelected(null); }}
              />
            ))}
          </div>
        </div>

        {/* Detail */}
        <div style={{
          background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 16,
          padding: '20px 22px', position: 'sticky', top: 76, maxHeight: 'calc(100vh - 100px)', overflowY: 'auto',
        }}>
          {selectedBuyer ? (
            <BuyerDetail key={selectedBuyer.id} buyer={selectedBuyer}
              connected={connected.has(selectedBuyer.id)}
              onConnect={() => { const s = new Set(connected); s.has(selectedBuyer.id) ? s.delete(selectedBuyer.id) : s.add(selectedBuyer.id); setConnected(s); }}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text3)' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>👤</div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>Select a buyer brief to review</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
