import React from 'react';
import { today } from '../useStorage';

export default function LogTab({ state, update }) {
  const t = today();
  const water = state.water[t] || 0;
  const protein = state.proteinWins[t] || 0;
  const fv = state.fvWins[t] || 0;
  const weight = state.weight[t] || '';

  const setWater = (val) => update(p => ({ ...p, water: { ...p.water, [t]: val } }));
  const setProtein = (val) => update(p => ({ ...p, proteinWins: { ...p.proteinWins, [t]: val } }));
  const setFV = (val) => update(p => ({ ...p, fvWins: { ...p.fvWins, [t]: val } }));
  const setWeight = (val) => update(p => ({ ...p, weight: { ...p.weight, [t]: val } }));

  const dateStr = new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' }).toUpperCase();

  return (
    <div style={s.page}>
      <div style={s.dateLabel}>{dateStr}</div>

      {/* Score row */}
      <div style={s.scoreRow}>
        <ScoreCard label="Water" value={water} total={8} color="#1e88e5" />
        <ScoreCard label="Protein" value={protein} total={6} color="#4caf7d" />
        <ScoreCard label="F&V" value={fv} total={5} color="#4caf7d" />
      </div>

      {/* Water */}
      <div style={s.card}>
        <div style={s.cardTitle}>💧 WATER</div>
        <div style={s.subtext}>Tap each drop — aim for 8 today</div>
        <div style={s.circles}>
          {Array.from({length:8},(_,i) => (
            <button key={i} onClick={() => setWater(i < water ? i : i+1)}
              style={{ ...s.circle, background: i < water ? '#1e88e5' : 'transparent', borderColor: i < water ? '#1e88e5' : '#1e4d6b', fontSize:'1.3rem' }}>
              💧
            </button>
          ))}
        </div>
      </div>

      {/* Protein */}
      <div style={s.card}>
        <div style={s.cardTitle}>🥩 PROTEIN WINS</div>
        <div style={s.subtext}>6 protein servings = ~110g. No counting — just hit 6.</div>
        <div style={s.circles}>
          {Array.from({length:6},(_,i) => (
            <button key={i} onClick={() => setProtein(i < protein ? i : i+1)}
              style={{ ...s.circle, background: i < protein ? '#4caf7d' : 'transparent', borderColor: i < protein ? '#4caf7d' : 'var(--border)', color: i < protein ? '#fff' : 'transparent', fontSize:'1rem', fontWeight:700 }}>
              ✓
            </button>
          ))}
        </div>
        <div style={s.hint}>See Guide tab for what counts as a win</div>
      </div>

      {/* F&V */}
      <div style={s.card}>
        <div style={s.cardTitle}>🥦 FRUITS & VEGGIES</div>
        <div style={s.subtext}>Tap a circle each time you eat a fruit or veggie. Hit 5 today.</div>
        <div style={s.circles}>
          {Array.from({length:5},(_,i) => (
            <button key={i} onClick={() => setFV(i < fv ? i : i+1)}
              style={{ ...s.circle, background: i < fv ? '#4caf7d' : 'transparent', borderColor: i < fv ? '#4caf7d' : 'var(--border)', fontSize:'1.2rem' }}>
              {i < fv ? '🥦' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Weigh-in */}
      <div style={s.card}>
        <div style={s.cardTitle}>⚖️ MORNING WEIGH-IN</div>
        <div style={s.subtext}>First thing in the morning, before eating. Same time every day.</div>
        <div style={{ display:'flex', gap:8, alignItems:'center', marginTop:10 }}>
          <input
            type="number" step="0.1" placeholder="lbs" value={weight}
            onChange={e => setWeight(e.target.value)}
            style={s.weightInput} />
          <div style={s.weightDisplay}>{weight ? `${weight} lbs` : '— lbs'}</div>
        </div>
        <WeightTrend weights={state.weight} />
      </div>
    </div>
  );
}

function ScoreCard({ label, value, total, color }) {
  return (
    <div style={s.scoreCard}>
      <div style={s.scoreLabel}>{label}</div>
      <div style={{ ...s.scoreValue, color }}>{value}</div>
      <div style={s.scoreTotal}>of {total}</div>
    </div>
  );
}

function WeightTrend({ weights }) {
  const entries = Object.entries(weights)
    .map(([d,v]) => ({ d, v: parseFloat(v) }))
    .filter(e => !isNaN(e.v))
    .sort((a,b) => new Date(a.d) - new Date(b.d));

  if (entries.length < 2) return null;
  const diff = (entries[entries.length-1].v - entries[0].v).toFixed(1);
  const up = diff >= 0;
  return (
    <div style={{ fontSize:'0.82rem', color: up ? '#4caf7d' : '#ff6b35', marginTop:8 }}>
      {up ? '↑' : '↓'} {Math.abs(diff)} lbs since you started — keep going!
    </div>
  );
}

const s = {
  page: { padding:16, paddingBottom:80 },
  dateLabel: { fontFamily:'Bebas Neue', fontSize:'1.4rem', letterSpacing:'3px', marginBottom:14, color:'var(--text)' },
  scoreRow: { display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:12 },
  scoreCard: { background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:'12px 8px', textAlign:'center' },
  scoreLabel: { fontSize:'0.62rem', letterSpacing:'2px', textTransform:'uppercase', color:'var(--muted)', marginBottom:4 },
  scoreValue: { fontFamily:'Bebas Neue', fontSize:'1.8rem', lineHeight:1 },
  scoreTotal: { fontSize:'0.65rem', color:'var(--muted)', marginTop:2 },
  card: { background:'var(--card)', border:'1px solid var(--border)', borderRadius:14, padding:16, marginBottom:12 },
  cardTitle: { fontFamily:'Bebas Neue', fontSize:'1.05rem', letterSpacing:'2px', color:'var(--accent)', marginBottom:6 },
  subtext: { fontSize:'0.78rem', color:'var(--muted)', marginBottom:12, lineHeight:1.4 },
  hint: { fontSize:'0.7rem', color:'var(--muted)', marginTop:10, borderTop:'1px solid var(--border)', paddingTop:8 },
  circles: { display:'flex', gap:8, flexWrap:'wrap' },
  circle: { width:44, height:44, borderRadius:'50%', border:'2.5px solid', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.15s', flexShrink:0 },
  weightInput: { width:100, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:10, padding:'10px 12px', color:'var(--text)', fontFamily:'DM Sans', fontSize:'0.9rem', outline:'none' },
  weightDisplay: { fontFamily:'Bebas Neue', fontSize:'1.6rem', color:'var(--accent)', letterSpacing:'2px' },
};
