import React, { useState } from 'react';
import { getWorkout, WEEK_TIPS, PHASES } from '../data';

const DAYS = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

export default function WorkoutTab({ state, update }) {
  const { currentWeek, currentDay, completedExercises, completedWorkouts, sports } = state;
  const workout = getWorkout(currentWeek, currentDay);
  const phase = PHASES[currentWeek];
  const dayKey = `${currentWeek}-${currentDay}`;
  const todaySports = sports[dayKey] || [];

  const [sportInput, setSportInput] = useState('');

  const toggleExercise = (i) => {
    const key = `${dayKey}-${i}`;
    const next = { ...completedExercises, [key]: !completedExercises[key] };
    update(prev => {
      const allDone = workout.exercises.every((_, idx) => next[`${dayKey}-${idx}`]);
      const nextWorkouts = allDone
        ? { ...prev.completedWorkouts, [dayKey]: true }
        : prev.completedWorkouts;
      return { ...prev, completedExercises: next, completedWorkouts: nextWorkouts };
    });
  };

  const addSport = () => {
    if (!sportInput.trim()) return;
    const next = [...todaySports, { name: sportInput.trim(), done: false }];
    update(prev => ({ ...prev, sports: { ...prev.sports, [dayKey]: next } }));
    setSportInput('');
  };

  const toggleSport = (i) => {
    const next = todaySports.map((s, idx) => idx === i ? { ...s, done: !s.done } : s);
    update(prev => ({ ...prev, sports: { ...prev.sports, [dayKey]: next } }));
  };

  const removeSport = (i) => {
    const next = todaySports.filter((_, idx) => idx !== i);
    update(prev => ({ ...prev, sports: { ...prev.sports, [dayKey]: next } }));
  };

  const allDone = workout.exercises.every((_, i) => completedExercises[`${dayKey}-${i}`]);

  return (
    <div style={s.page}>
      {/* Week selector */}
      <div style={s.weekScroll}>
        {Array.from({length:12},(_,i)=> (
          <button key={i}
            onClick={() => update({ currentWeek: i, currentDay: 0 })}
            style={{
              ...s.weekBtn,
              background: i === currentWeek ? '#f4c430' : completedWorkouts[`${i}-0`] ? 'transparent' : 'var(--card)',
              color: i === currentWeek ? '#000' : 'var(--muted)',
              border: `1.5px solid ${i === currentWeek ? '#f4c430' : 'var(--border)'}`,
            }}>
            {i+1}
          </button>
        ))}
      </div>

      {/* Phase banner */}
      <div style={{ ...s.phaseBanner, background: `linear-gradient(135deg, ${phase.color}33, transparent)`, borderLeft: `3px solid ${phase.color}` }}>
        <div>
          <div style={{ fontFamily:'Bebas Neue', fontSize:'1.1rem', letterSpacing:'2px', color: phase.color }}>{phase.name}</div>
          <div style={{ fontSize:'0.7rem', color:'var(--muted)', letterSpacing:'2px' }}>WEEKS {phase.weeks}</div>
        </div>
        <div style={{ fontSize:'1.8rem' }}>{currentWeek < 4 ? '🔥' : currentWeek < 8 ? '⚡' : '🏆'}</div>
      </div>

      {/* Day tabs */}
      <div style={s.dayTabs}>
        {DAYS.map((d, i) => (
          <button key={d} onClick={() => update({ currentDay: i })}
            style={{
              ...s.dayBtn,
              color: i === currentDay ? '#f4c430' : 'var(--muted)',
              borderBottom: `2px solid ${i === currentDay ? '#f4c430' : 'transparent'}`,
            }}>{d}</button>
        ))}
      </div>

      {/* Exercises */}
      {workout.rest ? (
        <div style={s.restCard}>
          <div style={s.restEmoji}>😴</div>
          <div style={s.restTitle}>REST DAY</div>
          <div style={s.restMsg}>Today is yours. No workout, no guilt.</div>
          <div style={s.restSub}>Rest and recovery is where your muscles actually grow. Every great athlete treats their off day as seriously as their training day. Eat well, sleep 8–9 hours, and let your body do its thing.</div>
          <div style={s.restTips}>
            <div style={s.restTip}>💧 Still hit your water goal</div>
            <div style={s.restTip}>🥩 Still hit your 6 protein wins</div>
            <div style={s.restTip}>😴 Get to bed on time tonight</div>
            <div style={s.restTip}>🚶 A walk is fine — nothing intense</div>
          </div>
        </div>
      ) : (
        <>
          {workout.note && (
            <div style={s.practiceNote}>{workout.note}</div>
          )}
          <div style={s.card}>
            <div style={s.cardTitle}>{workout.label}</div>
            {workout.exercises.map((ex, i) => {
              const done = completedExercises[`${dayKey}-${i}`];
              return (
                <div key={i} style={{ ...s.exRow, opacity: done ? 0.55 : 1 }}>
                  <div style={s.exLeft}>
                    {ex.kb && <span style={s.kbBadge}>KB</span>}
                    {ex.db && <span style={s.dbBadge}>DB</span>}
                    {ex.knee && <span style={s.kneeBadge}>KNEE</span>}
                    <div>
                      <div style={{ ...s.exName, textDecoration: done ? 'line-through' : 'none' }}>{ex.name}</div>
                      {ex.weight && <div style={s.exWeight}>{ex.weight}</div>}
                    </div>
                  </div>
                  <span style={s.exSets}>{ex.sets}</span>
                  <button onClick={() => toggleExercise(i)}
                    style={{ ...s.checkBtn, background: done ? '#4caf7d' : 'transparent', borderColor: done ? '#4caf7d' : 'var(--border)', color: done ? '#fff' : 'transparent' }}>
                    ✓
                  </button>
                </div>
              );
            })}
            {allDone && <div style={s.allDone}>✅ WORKOUT COMPLETE!</div>}
          </div>
        </>
      )}

      {/* Week tip */}
      <div style={s.card}>
        <div style={s.cardTitle}>THIS WEEK</div>
        <div style={s.tip}>{WEEK_TIPS[currentWeek]}</div>
      </div>

      {/* Sports log */}
      <div style={s.card}>
        <div style={s.cardTitle}>🏀 SPORTS & ACTIVITIES</div>
        <div style={{ fontSize:'0.78rem', color:'var(--muted)', marginBottom:10 }}>Check off what you did today — rock climbing, basketball, whatever it is.</div>
        {todaySports.map((sp, i) => (
          <div key={i} style={s.sportRow}>
            <button onClick={() => toggleSport(i)}
              style={{ ...s.checkBtn, background: sp.done?'#4caf7d':'transparent', borderColor: sp.done?'#4caf7d':'var(--border)', color: sp.done?'#fff':'transparent', flexShrink:0 }}>✓</button>
            <span style={{ flex:1, fontSize:'0.88rem', textDecoration: sp.done?'line-through':'none', color: sp.done?'var(--muted)':'var(--text)' }}>{sp.name}</span>
            <button onClick={() => removeSport(i)} style={s.removeBtn}>✕</button>
          </div>
        ))}
        <div style={{ display:'flex', gap:8, marginTop:8 }}>
          <input value={sportInput} onChange={e => setSportInput(e.target.value)}
            onKeyDown={e => e.key==='Enter' && addSport()}
            placeholder="Add activity..." style={s.input} />
          <button onClick={addSport} style={s.addBtn}>+</button>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { padding:16, paddingBottom:80 },
  weekScroll: { display:'flex', gap:6, overflowX:'auto', marginBottom:14, paddingBottom:4, scrollbarWidth:'none' },
  weekBtn: { minWidth:40, height:40, borderRadius:10, cursor:'pointer', fontFamily:'Bebas Neue', fontSize:'1rem', flexShrink:0 },
  phaseBanner: { borderRadius:12, padding:'12px 16px', marginBottom:12, display:'flex', justifyContent:'space-between', alignItems:'center' },
  dayTabs: { display:'flex', gap:4, marginBottom:14, overflowX:'auto', scrollbarWidth:'none' },
  dayBtn: { flex:1, minWidth:44, padding:'10px 4px', background:'none', border:'none', fontFamily:'DM Sans', fontSize:'0.7rem', fontWeight:600, letterSpacing:'1.5px', cursor:'pointer', transition:'all 0.15s', paddingBottom:8 },
  card: { background:'var(--card)', border:'1px solid var(--border)', borderRadius:14, padding:16, marginBottom:12 },
  cardTitle: { fontFamily:'Bebas Neue', fontSize:'1.05rem', letterSpacing:'2px', color:'var(--accent)', marginBottom:12 },
  exRow: { display:'flex', alignItems:'center', gap:8, padding:'9px 0', borderBottom:'1px solid var(--border)', transition:'opacity 0.2s' },
  exLeft: { flex:1, display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' },
  exName: { fontSize:'0.88rem', fontWeight:500 },
  kbBadge: { fontSize:'0.65rem', background:'rgba(255,107,53,0.2)', color:'#ff6b35', border:'1px solid rgba(255,107,53,0.4)', borderRadius:5, padding:'1px 5px', letterSpacing:'0.5px', flexShrink:0 },
  dbBadge: { fontSize:'0.65rem', background:'rgba(100,160,255,0.2)', color:'#64a0ff', border:'1px solid rgba(100,160,255,0.4)', borderRadius:5, padding:'1px 5px', letterSpacing:'0.5px', flexShrink:0 },
  kneeBadge: { fontSize:'0.65rem', background:'rgba(76,175,125,0.2)', color:'#4caf7d', border:'1px solid rgba(76,175,125,0.4)', borderRadius:5, padding:'1px 5px', letterSpacing:'0.5px', flexShrink:0 },
  exWeight: { fontSize:'0.7rem', color:'var(--muted)', marginTop:1 },
  exSets: { fontSize:'0.78rem', color:'var(--accent)', fontWeight:600, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:8, padding:'3px 8px', whiteSpace:'nowrap' },
  checkBtn: { width:30, height:30, borderRadius:8, border:'2px solid', cursor:'pointer', fontSize:'0.9rem', fontWeight:700, transition:'all 0.15s', flexShrink:0 },
  allDone: { textAlign:'center', padding:12, color:'#4caf7d', fontFamily:'Bebas Neue', fontSize:'1.1rem', letterSpacing:'2px', marginTop:8 },
  tip: { background:'rgba(244,196,48,0.07)', borderLeft:'3px solid var(--accent)', borderRadius:'0 10px 10px 0', padding:'10px 12px', fontSize:'0.83rem', lineHeight:1.5 },
  practiceNote: { background:'rgba(244,196,48,0.08)', border:'1px solid rgba(244,196,48,0.25)', borderRadius:12, padding:'10px 14px', marginBottom:12, fontSize:'0.82rem', color:'var(--accent)', lineHeight:1.4 },
  restCard: { background:'var(--card)', border:'1px solid var(--border)', borderRadius:14, padding:24, marginBottom:12, textAlign:'center' },
  restEmoji: { fontSize:'3rem', marginBottom:10 },
  restTitle: { fontFamily:'Bebas Neue', fontSize:'2rem', letterSpacing:'4px', color:'var(--accent)', marginBottom:8 },
  restMsg: { fontSize:'1rem', fontWeight:600, color:'var(--text)', marginBottom:10 },
  restSub: { fontSize:'0.82rem', color:'var(--muted)', lineHeight:1.6, marginBottom:16 },
  restTips: { display:'flex', flexDirection:'column', gap:8, textAlign:'left' },
  restTip: { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:10, padding:'10px 14px', fontSize:'0.84rem', color:'var(--text)' },
  sportRow: { display:'flex', alignItems:'center', gap:8, padding:'8px 0', borderBottom:'1px solid var(--border)' },
  removeBtn: { background:'none', border:'none', color:'var(--red)', cursor:'pointer', fontSize:'0.85rem', padding:'2px 6px' },
  input: { flex:1, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:10, padding:'9px 12px', color:'var(--text)', fontFamily:'DM Sans', fontSize:'0.85rem', outline:'none' },
  addBtn: { width:38, height:38, borderRadius:10, border:'none', background:'var(--accent)', color:'#000', fontSize:'1.3rem', cursor:'pointer', fontWeight:700, flexShrink:0 },
};
