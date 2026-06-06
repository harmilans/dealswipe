import React, { useState } from 'react';
import { X, Plug, Check, ChevronRight, MapPin, Maximize2, Building, Calendar, Percent, Lock, Shield, Star, Wifi } from 'lucide-react';
import { Listing, LISTINGS, formatAED, scoreColor } from './data';
import { ScoreBadge, KpiCard, AgentCard, FieldRow, Tag, MatchReasons, SectionLabel, PriceChart } from './Components';

const EMOJIS_ROOM: Record<string, string> = {
  living: '🛋', kitchen: '🍳', master: '🛏', bathroom: '🚿', balcony: '🌅', view: '🌊',
};

const ListingCard: React.FC<{
  listing: Listing;
  selected: boolean;
  onSelect: () => void;
  onConnect: () => void;
  onPass: () => void;
  connected: boolean;
  passed: boolean;
}> = ({ listing: l, selected, onSelect, onConnect, onPass, connected, passed }) => {
  const motColor = { 'High': 'var(--green)', 'Medium': 'var(--amber)', 'Low': 'var(--red)', 'Testing market': 'var(--text2)' }[l.motivation];

  return (
    <div onClick={onSelect} style={{
      background: selected ? 'rgba(201,168,76,0.04)' : 'var(--bg2)',
      border: `1px solid ${selected ? 'var(--gold)' : 'var(--border2)'}`,
      borderRadius: 12, overflow: 'hidden', cursor: 'pointer',
      opacity: passed ? 0.35 : 1, pointerEvents: passed ? 'none' : 'auto',
      transition: 'all 0.2s',
    }}>
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          {/* Photo placeholder */}
          <div style={{
            width: 72, height: 56, borderRadius: 8, flexShrink: 0,
            background: 'var(--bg4)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 28, border: '1px solid var(--border2)',
          }}>{l.emoji}</div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{l.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <MapPin size={10} /> {l.community} · {l.sqft.toLocaleString()} sqft · Floor {l.floor}
                </div>
              </div>
              <ScoreBadge score={l.matchScore} size="sm" />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)', marginTop: 4, fontFamily: "'DM Mono', monospace" }}>
              {formatAED(l.askingPrice)}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
              {l.financeAccepted.map(f => <Tag key={f} label={f} variant={f === 'Cash' ? 'gold' : 'blue'} />)}
              <Tag label={`${l.commissionSplit}% co-broke`} variant="amber" />
              <Tag label={`${l.motivation} motivation`} variant={l.motivation === 'High' ? 'green' : l.motivation === 'Medium' ? 'amber' : 'gray'} />
              {l.status !== 'Listed' && <Tag label={l.status} variant="gold" />}
            </div>
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex', gap: 8, padding: '8px 14px 12px',
        borderTop: '1px solid var(--border2)',
      }}>
        <button onClick={e => { e.stopPropagation(); onPass(); }} style={{
          flex: 1, padding: '7px 0', borderRadius: 8, fontSize: 12, fontWeight: 600,
          background: 'var(--bg4)', color: 'var(--text2)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', gap: 5,
        }}>
          <X size={13} /> Pass
        </button>
        <button onClick={e => { e.stopPropagation(); onConnect(); }} style={{
          flex: 2, padding: '7px 0', borderRadius: 8, fontSize: 12, fontWeight: 600,
          background: connected ? 'var(--green-bg)' : 'var(--gold)',
          color: connected ? 'var(--green)' : '#0A0A0B',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
          border: connected ? '1px solid var(--green)' : 'none',
        }}>
          {connected ? <><Check size={13} /> Connected</> : <><Plug size={13} /> Connect with agent</>}
        </button>
      </div>
    </div>
  );
};

const ListingDetail: React.FC<{
  listing: Listing;
  connected: boolean;
  onConnect: () => void;
}> = ({ listing: l, connected, onConnect }) => {
  const [imgTab, setImgTab] = useState(0);
  const rooms = ['🌊', '🛋', '🍳', '🛏', '🚿', '🌅'];

  return (
    <div style={{ animation: 'fadeUp 0.3s ease' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'DM Serif Display', serif", marginBottom: 4 }}>{l.title}</div>
            <div style={{ fontSize: 12, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <MapPin size={11} /> {l.subArea}, {l.community} · {l.status}
            </div>
          </div>
          <ScoreBadge score={l.matchScore} size="lg" />
        </div>
        <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--gold)', fontFamily: "'DM Mono', monospace" }}>
          {formatAED(l.askingPrice)}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>
          {formatAED(l.pricePerSqft)} per sqft · RERA: {l.reraPermit}
        </div>
      </div>

      {/* Match reasons */}
      <div style={{ marginBottom: 20 }}>
        <SectionLabel>Why this matched</SectionLabel>
        <MatchReasons reasons={l.matchReasons} misses={l.matchMisses} />
      </div>

      {/* Photos */}
      <div style={{ marginBottom: 20 }}>
        <SectionLabel>Property photos</SectionLabel>
        <div style={{
          height: 140, borderRadius: 10, background: 'var(--bg3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 60, border: '1px solid var(--border2)', marginBottom: 6,
        }}>{rooms[imgTab]}</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {rooms.map((r, i) => (
            <div key={i} onClick={() => setImgTab(i)} style={{
              flex: 1, height: 44, borderRadius: 6, background: 'var(--bg3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, cursor: 'pointer', border: `1px solid ${i === imgTab ? 'var(--gold)' : 'var(--border2)'}`,
            }}>{r}</div>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div style={{ marginBottom: 20 }}>
        <SectionLabel>Key KPIs</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          <KpiCard label="Beds / baths" value={`${l.beds}BR / ${l.baths}BA`} />
          <KpiCard label="Size" value={`${l.sqft.toLocaleString()} sqft`} />
          <KpiCard label="Floor" value={`${l.floor} / ${l.totalFloors}`} />
          <KpiCard label="Price / sqft" value={`AED ${l.pricePerSqft.toLocaleString()}`} />
          <KpiCard label="Service chg" value={`AED ${l.serviceCharge}/sqft`} />
          <KpiCard label="Parking" value={`${l.parking} covered`} />
          <KpiCard label="Handover" value={l.handover} />
          <KpiCard label="View" value={l.view} />
          <KpiCard label="Co-broke" value={`${l.commissionSplit}%`} color="var(--gold)" />
        </div>
      </div>

      {/* Description */}
      <div style={{ marginBottom: 20 }}>
        <SectionLabel>Description</SectionLabel>
        <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>{l.description}</p>
      </div>

      {/* Highlights & amenities */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div>
          <SectionLabel>Highlights</SectionLabel>
          {l.highlights.map(h => (
            <div key={h} style={{ fontSize: 12, color: 'var(--text)', padding: '4px 0', borderBottom: '1px solid var(--border2)', display: 'flex', gap: 8, alignItems: 'center' }}>
              <Check size={11} color="var(--green)" style={{ flexShrink: 0 }} /> {h}
            </div>
          ))}
        </div>
        <div>
          <SectionLabel>Amenities</SectionLabel>
          {l.amenities.map(a => (
            <div key={a} style={{ fontSize: 12, color: 'var(--text)', padding: '4px 0', borderBottom: '1px solid var(--border2)', display: 'flex', gap: 8, alignItems: 'center' }}>
              <Wifi size={11} color="var(--blue)" style={{ flexShrink: 0 }} /> {a}
            </div>
          ))}
        </div>
      </div>

      {/* Full listing fields */}
      <div style={{ marginBottom: 20 }}>
        <SectionLabel>Listing details</SectionLabel>
        <FieldRow label="Property type" value="Apartment" />
        <FieldRow label="Furnishing" value={l.furnishing} />
        <FieldRow label="Finance accepted" value={l.financeAccepted.join(', ')} />
        <FieldRow label="Seller motivation" value={
          <span style={{ color: l.motivation === 'High' ? 'var(--green)' : l.motivation === 'Medium' ? 'var(--amber)' : 'var(--text2)' }}>
            {connected ? l.motivation : '••••••'} {!connected && <Lock size={10} />}
          </span>
        } />
        <FieldRow label="Commission to buyer agent" value={<span style={{ color: 'var(--gold)', fontWeight: 700 }}>{l.commissionSplit}%</span>} />
        <FieldRow label="RERA permit" value={l.reraPermit} />
        <FieldRow label="Listed date" value={l.listedDate} />
        <FieldRow label="Annual service charge" value={`AED ${(l.serviceCharge * l.sqft).toLocaleString()}`} />
      </div>

      {/* Price history */}
      <div style={{ marginBottom: 20 }}>
        <PriceChart history={l.priceHistory} />
      </div>

      {/* Agent */}
      <div style={{ marginBottom: 20 }}>
        <SectionLabel>Listing agent</SectionLabel>
        <AgentCard agent={l.agent} revealed={connected} />
        {connected && (
          <div style={{
            marginTop: 8, background: 'var(--green-bg)', borderRadius: 8, padding: '10px 14px',
            fontSize: 12, color: 'var(--green)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <Check size={14} /> Connected · You can now contact {l.agent.name.split(' ')[0]} directly
          </div>
        )}
        {!connected && (
          <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Lock size={11} /> Agent contact details revealed after mutual connection
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
        {connected ? <><Check size={16} /> Connected with {l.agent.name.split(' ')[0]}</> : <><Plug size={16} /> Connect with listing agent</>}
      </button>
    </div>
  );
};

export const BuyerView: React.FC = () => {
  const [selected, setSelected] = useState<string | null>('l1');
  const [connected, setConnected] = useState<Set<string>>(new Set());
  const [passed, setPassed] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'new' | 'connected'>('all');

  const listings = LISTINGS.filter(l => {
    if (passed.has(l.id)) return filter !== 'connected';
    if (filter === 'connected') return connected.has(l.id);
    return true;
  });

  const selectedListing = LISTINGS.find(l => l.id === selected);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 20, alignItems: 'start' }}>
      {/* Left — cards */}
      <div>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          {(['all', 'new', 'connected'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '5px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600,
              textTransform: 'capitalize',
              background: filter === f ? 'var(--gold)' : 'var(--bg3)',
              color: filter === f ? '#0A0A0B' : 'var(--text2)',
              border: `1px solid ${filter === f ? 'var(--gold)' : 'var(--border2)'}`,
            }}>{f === 'all' ? `All (${LISTINGS.length})` : f === 'new' ? `New (${LISTINGS.filter(l => !connected.has(l.id) && !passed.has(l.id)).length})` : `Connected (${connected.size})`}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {listings.sort((a, b) => b.matchScore - a.matchScore).map(l => (
            <ListingCard key={l.id} listing={l}
              selected={selected === l.id}
              connected={connected.has(l.id)}
              passed={passed.has(l.id)}
              onSelect={() => setSelected(selected === l.id ? null : l.id)}
              onConnect={() => { const s = new Set(connected); s.has(l.id) ? s.delete(l.id) : s.add(l.id); setConnected(s); }}
              onPass={() => { const s = new Set(passed); s.add(l.id); setPassed(s); if (selected === l.id) setSelected(null); }}
            />
          ))}
        </div>
      </div>

      {/* Right — detail */}
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 16,
        padding: '20px 22px', position: 'sticky', top: 76, maxHeight: 'calc(100vh - 100px)', overflowY: 'auto',
      }}>
        {selectedListing ? (
          <ListingDetail key={selectedListing.id} listing={selectedListing}
            connected={connected.has(selectedListing.id)}
            onConnect={() => { const s = new Set(connected); s.has(selectedListing.id) ? s.delete(selectedListing.id) : s.add(selectedListing.id); setConnected(s); }}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text3)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🏠</div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Select a listing to view details</div>
          </div>
        )}
      </div>
    </div>
  );
};
