import React, { useState } from 'react';
import { Star, Shield, Check, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { AGENTS, LISTINGS, MY_LISTING, formatAED } from './data';
import { AgentCard, Tag, SectionLabel, KpiCard, ScoreBadge } from './Components';

export const NetworkView: React.FC = () => {
  const agents = Object.values(AGENTS).slice(0, 6);
  const [selected, setSelected] = useState<string | null>(null);
  const selectedAgent = selected ? AGENTS[selected] : null;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 20, alignItems: 'start' }}>
      <div>
        <SectionLabel>Verified RERA agents on DealSwipe</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {agents.map(a => (
            <div key={a.id} onClick={() => setSelected(a.id === selected ? null : a.id)} style={{
              background: selected === a.id ? 'rgba(201,168,76,0.04)' : 'var(--bg2)',
              border: `1px solid ${selected === a.id ? 'var(--gold)' : 'var(--border2)'}`,
              borderRadius: 12, padding: '14px 16px', cursor: 'pointer', transition: 'all 0.15s',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                  background: 'var(--bg4)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'var(--gold)',
                  border: '1px solid var(--border)',
                }}>{a.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{a.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text2)' }}>{a.company}</div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                    <Tag label={`${a.transactions} deals`} variant="gold" />
                    <Tag label={`${a.yearsActive}yr exp`} variant="gray" />
                    <Tag label={`★ ${a.rating}`} variant="green" />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Shield size={11} color="var(--green)" />
                    <span style={{ fontSize: 10, color: 'var(--green)', fontWeight: 600 }}>RERA</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 16,
        padding: '20px 22px', position: 'sticky', top: 76,
      }}>
        {selectedAgent ? (
          <div style={{ animation: 'fadeUp 0.3s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--gold-dim), var(--gold))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 800, color: '#0A0A0B',
              }}>{selectedAgent.avatar}</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'DM Serif Display', serif" }}>{selectedAgent.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text2)' }}>{selectedAgent.company}</div>
                <div style={{ fontSize: 10, color: 'var(--text3)' }}>{selectedAgent.rera}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 20 }}>
              <KpiCard label="Transactions" value={selectedAgent.transactions.toString()} color="var(--gold)" />
              <KpiCard label="Rating" value={`★ ${selectedAgent.rating}`} color="var(--green)" />
              <KpiCard label="Experience" value={`${selectedAgent.yearsActive} years`} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <SectionLabel>Contact</SectionLabel>
              <div style={{ fontSize: 13, color: 'var(--text)', marginBottom: 6 }}>{selectedAgent.phone}</div>
              <div style={{ fontSize: 13, color: 'var(--blue)' }}>{selectedAgent.email}</div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <SectionLabel>Verification</SectionLabel>
              <div style={{ display: 'flex', gap: 8 }}>
                <Tag label="RERA verified" variant="green" />
                <Tag label="DLD registered" variant="green" />
                <Tag label="ID verified" variant="green" />
              </div>
            </div>

            <button style={{
              width: '100%', padding: '11px 0', borderRadius: 10,
              background: 'var(--gold)', color: '#0A0A0B', fontSize: 12, fontWeight: 700,
            }}>
              Send co-broke request
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text3)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>👥</div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Select an agent to view profile</div>
          </div>
        )}
      </div>
    </div>
  );
};

export const BriefsView: React.FC<{ role: 'buyer' | 'seller' }> = ({ role }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'DM Serif Display', serif" }}>
            {role === 'buyer' ? 'My buyer briefs' : 'My listings'}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>
            {role === 'buyer' ? 'Active buyer mandates you are representing' : 'Properties you are currently listing'}
          </div>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '9px 16px', borderRadius: 8, fontSize: 12, fontWeight: 700,
          background: 'var(--gold)', color: '#0A0A0B',
        }}>
          <Plus size={14} /> {role === 'buyer' ? 'New brief' : 'New listing'}
        </button>
      </div>

      {role === 'seller' && (
        <div style={{ marginBottom: 20 }}>
          <SectionLabel>Active listings</SectionLabel>
          {LISTINGS.slice(0, 2).map(l => (
            <div key={l.id} style={{
              background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 12,
              padding: '16px', marginBottom: 10,
            }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 28 }}>{l.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{l.title}</div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <Tag label={l.status} variant={l.status === 'Listed' ? 'green' : l.status === 'Off-market' ? 'amber' : 'gold'} />
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700, fontFamily: "'DM Mono', monospace", marginBottom: 6 }}>
                    {formatAED(l.askingPrice)}
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <Tag label={`${l.sqft.toLocaleString()} sqft`} variant="gray" />
                    <Tag label={l.community} variant="gray" />
                    <Tag label={`${l.commissionSplit}% co-broke`} variant="amber" />
                    <Tag label={l.reraPermit} variant="gray" />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 12 }}>
                <div style={{ background: 'var(--bg3)', borderRadius: 8, padding: '8px 10px' }}>
                  <div style={{ fontSize: 10, color: 'var(--text3)', marginBottom: 3 }}>Match score</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green)' }}>94%</div>
                </div>
                <div style={{ background: 'var(--bg3)', borderRadius: 8, padding: '8px 10px' }}>
                  <div style={{ fontSize: 10, color: 'var(--text3)', marginBottom: 3 }}>Buyer matches</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gold)' }}>4</div>
                </div>
                <div style={{ background: 'var(--bg3)', borderRadius: 8, padding: '8px 10px' }}>
                  <div style={{ fontSize: 10, color: 'var(--text3)', marginBottom: 3 }}>Connected</div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>1</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button style={{
                  flex: 1, padding: '7px 0', borderRadius: 8, fontSize: 11, fontWeight: 600,
                  background: 'var(--bg4)', color: 'var(--text2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                }}>
                  <Edit size={12} /> Edit
                </button>
                <button style={{
                  flex: 1, padding: '7px 0', borderRadius: 8, fontSize: 11, fontWeight: 600,
                  background: 'var(--bg4)', color: 'var(--text2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                }}>
                  <Eye size={12} /> Preview
                </button>
                <button style={{
                  padding: '7px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600,
                  background: 'var(--red-bg)', color: 'var(--red)',
                }}>
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {role === 'buyer' && (
        <div style={{ marginBottom: 20 }}>
          <SectionLabel>Active buyer briefs</SectionLabel>
          {[
            { ref: 'BA-2025-0102', label: 'UK expat · 2BR JLT / Marina', budget: '2.1M–2.6M', finance: 'Mortgage pre-approved', status: 'Active', matches: 4 },
            { ref: 'BA-2025-0089', label: 'UAE national · 3BR Dubai Hills', budget: '3.2M–4.0M', finance: 'Cash', status: 'Active', matches: 2 },
          ].map(b => (
            <div key={b.ref} style={{
              background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 12,
              padding: '16px', marginBottom: 10,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{b.label}</div>
                <Tag label={b.status} variant="green" />
              </div>
              <div style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700, fontFamily: "'DM Mono', monospace", marginBottom: 6 }}>
                AED {b.budget}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                <Tag label={b.finance} variant="blue" />
                <Tag label={b.ref} variant="gray" />
                <Tag label={`${b.matches} matches`} variant="gold" />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{
                  flex: 1, padding: '7px 0', borderRadius: 8, fontSize: 11, fontWeight: 600,
                  background: 'var(--bg4)', color: 'var(--text2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                }}>
                  <Edit size={12} /> Edit brief
                </button>
                <button style={{
                  flex: 1, padding: '7px 0', borderRadius: 8, fontSize: 11, fontWeight: 600,
                  background: 'var(--gold)', color: '#0A0A0B',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                }}>
                  View matches →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div style={{
          background: 'var(--bg2)', border: '1px solid var(--gold)', borderRadius: 16,
          padding: '20px', marginTop: 20, animation: 'fadeUp 0.3s ease',
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
            {role === 'buyer' ? 'New buyer brief' : 'New listing'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            {(role === 'buyer' ? [
              'Buyer nationality', 'Finance type', 'Budget min (AED)', 'Budget max (AED)',
              'Primary location', 'Secondary location', 'Min bedrooms', 'Min size (sqft)',
              'Timeline', 'Seriousness (1–5)',
            ] : [
              'Community', 'Sub-area / building', 'Bedrooms', 'Bathrooms',
              'BUA (sqft)', 'Asking price (AED)', 'Finance accepted', 'Commission split (%)',
              'Handover date', 'Seller motivation',
            ]).map(field => (
              <div key={field}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text3)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{field}</div>
                <input placeholder={field} style={{
                  width: '100%', padding: '8px 10px', borderRadius: 8, fontSize: 12,
                  background: 'var(--bg4)', border: '1px solid var(--border2)', color: 'var(--text)',
                }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setShowForm(false)} style={{
              flex: 1, padding: '10px 0', borderRadius: 8, fontSize: 12, fontWeight: 600,
              background: 'var(--bg4)', color: 'var(--text2)',
            }}>Cancel</button>
            <button style={{
              flex: 2, padding: '10px 0', borderRadius: 8, fontSize: 12, fontWeight: 700,
              background: 'var(--gold)', color: '#0A0A0B',
            }}>Post {role === 'buyer' ? 'brief' : 'listing'} →</button>
          </div>
        </div>
      )}
    </div>
  );
};
