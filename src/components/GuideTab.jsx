import React, { useState } from 'react';
import { PROTEIN_GUIDE } from '../data';

const SVGS = {
  'Push-Up': `<svg viewBox="0 0 100 60" fill="none" stroke="#f4c430" strokeWidth="2.5" strokeLinecap="round"><circle cx="18" cy="10" r="5"/><line x1="18" y1="15" x2="18" y2="35"/><line x1="18" y1="35" x2="5" y2="45"/><line x1="18" y1="35" x2="31" y2="45"/><line x1="18" y1="22" x2="5" y2="30"/><line x1="18" y1="22" x2="31" y2="30"/><line x1="5" y1="30" x2="5" y2="45"/><line x1="31" y1="30" x2="31" y2="45"/><line x1="3" y1="45" x2="33" y2="45" stroke="#6b6b80"/><text x="42" y="30" fontSize="18" fill="#f4c430" stroke="none">→</text><circle cx="72" cy="18" r="5"/><line x1="72" y1="23" x2="55" y2="38"/><line x1="55" y1="38" x2="89" y2="38"/><line x1="72" y1="30" x2="60" y2="26"/><line x1="72" y1="30" x2="84" y2="26"/><line x1="60" y1="26" x2="55" y2="38"/><line x1="84" y1="26" x2="89" y2="38"/><line x1="53" y1="38" x2="91" y2="38" stroke="#6b6b80"/></svg>`,
  'Pike Push-Up': `<svg viewBox="0 0 100 70" fill="none" stroke="#f4c430" strokeWidth="2.5" strokeLinecap="round"><circle cx="50" cy="8" r="5"/><line x1="50" y1="13" x2="30" y2="35"/><line x1="30" y1="35" x2="18" y2="55"/><line x1="30" y1="35" x2="42" y2="55"/><line x1="50" y1="13" x2="62" y2="30"/><line x1="62" y1="30" x2="55" y2="55"/><line x1="62" y1="30" x2="72" y2="55"/><line x1="15" y1="55" x2="75" y2="55" stroke="#6b6b80"/></svg>`,
  'Inverted Row': `<svg viewBox="0 0 100 70" fill="none" stroke="#f4c430" strokeWidth="2.5" strokeLinecap="round"><line x1="10" y1="15" x2="90" y2="15" stroke="#6b6b80" strokeWidth="3"/><circle cx="50" cy="25" r="5"/><line x1="50" y1="30" x2="50" y2="50"/><line x1="50" y1="35" x2="35" y2="20"/><line x1="50" y1="35" x2="65" y2="20"/><line x1="50" y1="50" x2="35" y2="62"/><line x1="50" y1="50" x2="65" y2="62"/></svg>`,
  'Hollow Body Hold': `<svg viewBox="0 0 110 50" fill="none" stroke="#f4c430" strokeWidth="2.5" strokeLinecap="round"><circle cx="15" cy="28" r="5"/><line x1="15" y1="33" x2="55" y2="33"/><line x1="15" y1="28" x2="5" y2="18"/><line x1="15" y1="28" x2="25" y2="18"/><line x1="55" y1="33" x2="70" y2="26"/><line x1="55" y1="33" x2="70" y2="40"/></svg>`,
  'KB Goblet Squat': `<svg viewBox="0 0 100 75" fill="none" stroke="#f4c430" strokeWidth="2.5" strokeLinecap="round"><circle cx="50" cy="10" r="5"/><rect x="43" y="16" width="14" height="10" rx="3" stroke="#ff6b35" fill="rgba(255,107,53,0.2)"/><line x1="50" y1="26" x2="50" y2="45"/><line x1="50" y1="45" x2="35" y2="65"/><line x1="50" y1="45" x2="65" y2="65"/><line x1="50" y1="32" x2="38" y2="40"/><line x1="50" y1="32" x2="62" y2="40"/><line x1="33" y1="65" x2="67" y2="65" stroke="#6b6b80"/></svg>`,
  'KB Swing': `<svg viewBox="0 0 110 70" fill="none" stroke="#f4c430" strokeWidth="2.5" strokeLinecap="round"><circle cx="28" cy="15" r="5"/><line x1="28" y1="20" x2="28" y2="42"/><line x1="28" y1="42" x2="15" y2="58"/><line x1="28" y1="42" x2="41" y2="58"/><line x1="28" y1="28" x2="15" y2="38"/><line x1="28" y1="28" x2="41" y2="34"/><rect x="36" y="34" width="10" height="8" rx="2" stroke="#ff6b35" fill="rgba(255,107,53,0.2)"/><text x="52" y="38" fontSize="14" fill="#f4c430" stroke="none">→</text><circle cx="80" cy="12" r="5"/><line x1="80" y1="17" x2="80" y2="40"/><line x1="80" y1="40" x2="68" y2="58"/><line x1="80" y1="40" x2="92" y2="58"/><line x1="80" y1="26" x2="68" y2="20"/><line x1="80" y1="26" x2="92" y2="20"/><rect x="74" y="10" width="10" height="8" rx="2" stroke="#ff6b35" fill="rgba(255,107,53,0.2)"/></svg>`,
  'KB Romanian Deadlift': `<svg viewBox="0 0 100 75" fill="none" stroke="#f4c430" strokeWidth="2.5" strokeLinecap="round"><circle cx="50" cy="10" r="5"/><line x1="50" y1="15" x2="35" y2="40"/><line x1="35" y1="40" x2="30" y2="60"/><line x1="35" y1="40" x2="50" y2="55"/><line x1="50" y1="15" x2="65" y2="30"/><line x1="65" y1="30" x2="72" y2="55"/><rect x="26" y="55" width="10" height="8" rx="2" stroke="#ff6b35" fill="rgba(255,107,53,0.2)"/><line x1="20" y1="63" x2="80" y2="63" stroke="#6b6b80"/></svg>`,
  'Band TKE': `<svg viewBox="0 0 100 75" fill="none" stroke="#f4c430" strokeWidth="2.5" strokeLinecap="round"><line x1="10" y1="10" x2="10" y2="55" stroke="#6b6b80" strokeWidth="3"/><line x1="10" y1="38" x2="45" y2="38" stroke="#4caf7d" strokeDasharray="4 2"/><circle cx="55" cy="12" r="5"/><line x1="55" y1="17" x2="55" y2="40"/><line x1="55" y1="40" x2="42" y2="62"/><line x1="55" y1="40" x2="68" y2="62"/><line x1="55" y1="26" x2="42" y2="34"/><line x1="55" y1="26" x2="68" y2="34"/><line x1="40" y1="62" x2="70" y2="62" stroke="#6b6b80"/></svg>`,
  'Backward Drag': `<svg viewBox="0 0 110 70" fill="none" stroke="#f4c430" strokeWidth="2.5" strokeLinecap="round"><circle cx="70" cy="12" r="5"/><line x1="70" y1="17" x2="70" y2="40"/><line x1="70" y1="40" x2="56" y2="58"/><line x1="70" y1="40" x2="84" y2="58"/><line x1="70" y1="26" x2="55" y2="32"/><line x1="70" y1="26" x2="85" y2="32"/><line x1="55" y1="32" x2="40" y2="42"/><line x1="40" y1="42" x2="22" y2="50"/><rect x="10" y="46" width="16" height="10" rx="3" stroke="#4caf7d" fill="rgba(76,175,125,0.2)"/></svg>`,
};

const EXERCISES = [
  { name:'Push-Up', pill:'Chest / Triceps', desc:'Hands shoulder-width, body straight, chest to floor. Core tight the whole way.' },
  { name:'Pike Push-Up', pill:'Shoulders', desc:'Hips high in an upside-down V. Lower head toward floor. Builds shoulders.' },
  { name:'Inverted Row', pill:'Back / Biceps', desc:'Lie under a table, grip the edge, pull chest to it.' },
  { name:'Hollow Body Hold', pill:'Core', desc:'Back flat, arms overhead, legs elevated. Foundation of every gymnastic skill.' },
  { name:'KB Goblet Squat', pill:'KB Legs', desc:'Hold KB at chest, feet shoulder-width, squat deep. Keeps chest up.' },
  { name:'KB Swing', pill:'KB Power', desc:'Hinge at hips, drive hips forward explosively. Use glutes and hamstrings, not arms.' },
  { name:'KB Romanian Deadlift', pill:'KB Hamstrings', desc:'Hinge at hips, lower KB along shins, feel hamstring stretch, drive back up.' },
  { name:'Band TKE', pill:'Knee Rehab', desc:'Band at knee height, step back, straighten knee against band. Fires inner quad.' },
  { name:'Backward Drag', pill:'Best for Knees', desc:'Walk backward pulling weight. Loads quad without stressing the knee joint.' },
];

function ExerciseItem({ name, pill, desc, svg }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={s.exItem}>
      <div style={s.exHeader}>
        <div style={{ flex:1 }}>
          <span style={{ ...s.pill, background: pill.includes('KB')?'rgba(255,107,53,0.15)':pill.includes('Knee')||pill==='Best for Knees'?'rgba(76,175,125,0.15)':'rgba(244,196,48,0.12)', color: pill.includes('KB')?'#ff6b35':pill.includes('Knee')||pill==='Best for Knees'?'#4caf7d':'var(--accent)', borderColor: pill.includes('KB')?'rgba(255,107,53,0.3)':pill.includes('Knee')||pill==='Best for Knees'?'rgba(76,175,125,0.3)':'rgba(244,196,48,0.3)' }}>{pill}</span>
          <div style={s.exName}>{name}</div>
        </div>
        {svg && (
          <button onClick={() => setOpen(o=>!o)} style={s.seeHow}>
            {open ? '▼ HIDE' : '▶ SEE HOW'}
          </button>
        )}
      </div>
      {open && svg && (
        <div style={s.svgBox} dangerouslySetInnerHTML={{ __html: `<svg style="width:100%;max-width:280px;display:block;margin:0 auto;" ${svg.slice(4)}` }} />
      )}
      <div style={s.exDesc}>{desc}</div>
    </div>
  );
}

export default function GuideTab() {
  const [section, setSection] = useState('exercises');
  return (
    <div style={s.page}>
      <div style={s.tabs}>
        {[['exercises','💪 Exercises'],['protein','🥩 Protein'],['knee','🦵 Knee'],['recovery','😴 Recovery']].map(([k,label])=>(
          <button key={k} onClick={()=>setSection(k)}
            style={{ ...s.sectionTab, color: section===k?'#f4c430':'var(--muted)', borderBottom:`2px solid ${section===k?'#f4c430':'transparent'}` }}>
            {label}
          </button>
        ))}
      </div>

      {section === 'exercises' && (
        <div>
          {EXERCISES.map(e => <ExerciseItem key={e.name} {...e} svg={SVGS[e.name]} />)}
        </div>
      )}

      {section === 'protein' && (
        <div>
          <div style={s.goalBox}>
            <div style={s.goalTitle}>THE GOAL: 6 WINS A DAY ≈ 110–120g PROTEIN</div>
            <div style={s.goalDesc}>Don't count grams. Hit 6 solid protein servings spread across the day and you're there.</div>
          </div>
          {PROTEIN_GUIDE.map(section => (
            <div key={section.time} style={s.card}>
              <div style={s.timeLabel}>{section.time}</div>
              {section.items.map(item => (
                <div key={item.food} style={s.proteinRow}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:'0.86rem', fontWeight:500 }}>{item.food}</div>
                    {item.note && <div style={{ fontSize:'0.72rem', color:'var(--muted)' }}>{item.note}</div>}
                  </div>
                  <div style={s.gBadge}>{item.g}g</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {section === 'knee' && (
        <div>
          {[
            { name:'Backward Drag / Tire Pull', pill:'Best for Knees', desc:'Walk backward pulling weight. Loads the quad without stressing the knee joint. Start 3×30s, build up.' },
            { name:'Band TKE', pill:'Rehab Essential', desc:'Band at knee height, step back, straighten knee against resistance. Fires the VMO inner quad that stabilizes your kneecap.' },
            { name:'Band Lateral Walk', pill:'Hip Stability', desc:'Band around ankles, bend slightly, step side to side. Strong hips = less knee pain.' },
            { name:'Reverse Lunge', pill:'Knee-Friendly', desc:'Step backward not forward. Shin stays vertical = way less knee stress than a forward lunge.' },
            { name:'Glute Bridge', pill:'Knee Protection', desc:'Strong glutes take load off the knees. Never optional on lower body days.' },
            { name:'Avoid on bad days', pill:'Important', desc:'Skip deep jump squats, pistol squats, box jumps on hard floors when knees ache. Swap for drag, TKEs, and glute bridges.' },
          ].map(e=><ExerciseItem key={e.name} {...e} svg={SVGS[e.name]} />)}
        </div>
      )}

      {section === 'recovery' && (
        <div>
          {[
            { title:'Sleep 8–9 hours', desc:'Non-negotiable at your age. Growth hormone releases during sleep. Staying up late and training hard is a losing combo.' },
            { title:'Stretch after every workout', desc:'Hip flexors, chest, hamstrings. 5–10 minutes. You\'ll thank yourself in 5 years.' },
            { title:'Move on off days', desc:'Walk, shoot hoops, bike. Active recovery beats sitting all day.' },
            { title:'Soreness is normal, pain isn\'t', desc:'Muscle soreness (DOMS) means you worked. Sharp joint pain means stop and rest.' },
            { title:'Hydrate first thing', desc:'Drink a full glass of water before anything else every morning.' },
          ].map(r=>(
            <div key={r.title} style={s.card}>
              <div style={{ fontWeight:600, fontSize:'0.9rem', marginBottom:4 }}>{r.title}</div>
              <div style={{ fontSize:'0.8rem', color:'var(--muted)', lineHeight:1.5 }}>{r.desc}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const s = {
  page: { padding:16, paddingBottom:80 },
  tabs: { display:'flex', gap:0, marginBottom:16, overflowX:'auto', scrollbarWidth:'none', borderBottom:'1px solid var(--border)' },
  sectionTab: { padding:'10px 12px', background:'none', border:'none', fontFamily:'DM Sans', fontSize:'0.72rem', fontWeight:600, letterSpacing:'1px', cursor:'pointer', whiteSpace:'nowrap', paddingBottom:8 },
  exItem: { background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:14, marginBottom:10 },
  exHeader: { display:'flex', alignItems:'flex-start', gap:10, marginBottom:6 },
  pill: { display:'inline-block', border:'1px solid', borderRadius:100, padding:'2px 10px', fontSize:'0.68rem', letterSpacing:'1px', textTransform:'uppercase', marginBottom:4 },
  exName: { fontWeight:600, fontSize:'0.9rem' },
  exDesc: { fontSize:'0.8rem', color:'var(--muted)', lineHeight:1.5, marginTop:6 },
  seeHow: { background:'none', border:'1px solid var(--border)', borderRadius:8, padding:'4px 10px', color:'var(--muted)', fontSize:'0.7rem', fontFamily:'DM Sans', cursor:'pointer', whiteSpace:'nowrap', letterSpacing:'1px' },
  svgBox: { background:'rgba(244,196,48,0.04)', borderRadius:10, padding:10, margin:'8px 0' },
  goalBox: { background:'rgba(76,175,125,0.08)', border:'1px solid rgba(76,175,125,0.3)', borderRadius:12, padding:'12px 14px', marginBottom:12 },
  goalTitle: { fontFamily:'Bebas Neue', letterSpacing:'2px', color:'#4caf7d', fontSize:'1rem', marginBottom:4 },
  goalDesc: { fontSize:'0.78rem', color:'var(--muted)', lineHeight:1.5 },
  card: { background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, padding:14, marginBottom:10 },
  timeLabel: { fontSize:'0.72rem', letterSpacing:'2px', color:'var(--accent)', textTransform:'uppercase', fontWeight:600, marginBottom:10 },
  proteinRow: { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 0', borderBottom:'1px solid var(--border)' },
  gBadge: { background:'rgba(76,175,125,0.15)', border:'1px solid rgba(76,175,125,0.3)', borderRadius:8, padding:'3px 10px', fontSize:'0.78rem', color:'#4caf7d', fontWeight:700, marginLeft:10 },
};
