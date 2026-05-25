import React, { useRef, useEffect } from 'react';
import { getWorkout } from '../data';

export default function ProgressTab({ state, update }) {
  const canvasRef = useRef(null);
  const { completedWorkouts, weight } = state;

  // Count completed workouts
  let total = 0, done = 0;
  for (let w = 0; w < 12; w++) {
    for (let d = 0; d < 7; d++) {
      total++;
      if (completedWorkouts[`${w}-${d}`]) done++;
    }
  }
  const pct = Math.round((done / total) * 100);

  // Export
  const exportData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `paxton-grind-backup.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.completedExercises) { update(data); alert('✅ Imported!'); }
        else alert('Not a valid backup file.');
      } catch { alert('Could not read file.'); }
    };
    reader.readAsText(file);
  };

  // Draw weight chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const entries = Object.entries(weight)
      .map(([d,v]) => ({ d, v: parseFloat(v) }))
      .filter(e => !isNaN(e.v))
      .sort((a,b) => new Date(a.d) - new Date(b.d));

    const ctx = canvas.getContext('2d');
    const W = canvas.parentElement.clientWidth - 32;
    canvas.width = W; canvas.height = 160;
    ctx.clearRect(0, 0, W, 160);

    if (entries.length < 2) {
      ctx.fillStyle = '#6b6b80';
      ctx.font = '13px DM Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Log your weight daily to see the trend', W/2, 80);
      return;
    }

    const vals = entries.map(e => e.v);
    const minV = Math.min(...vals) - 3, maxV = Math.max(...vals) + 3;
    const pad = { t:14, r:12, b:28, l:44 };
    const cW = W - pad.l - pad.r, cH = 160 - pad.t - pad.b;
    const toX = i => pad.l + (i / Math.max(entries.length-1,1)) * cW;
    const toY = v => pad.t + cH - ((v - minV) / (maxV - minV)) * cH;

    // Grid
    for (let g = 0; g <= 4; g++) {
      const y = pad.t + (g/4) * cH;
      ctx.strokeStyle = '#2a2a3a'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l+cW, y); ctx.stroke();
      ctx.fillStyle = '#6b6b80'; ctx.font = '10px DM Sans,sans-serif'; ctx.textAlign = 'right';
      ctx.fillText((maxV - (g/4)*(maxV-minV)).toFixed(0), pad.l-4, y+3);
    }

    // Goal line (+0.5/wk)
    ctx.beginPath(); ctx.strokeStyle = 'rgba(76,175,125,0.5)'; ctx.lineWidth = 1.5; ctx.setLineDash([4,3]);
    entries.forEach((e,i) => {
      const goalV = entries[0].v + (i/7)*0.5;
      const y = toY(Math.min(goalV, maxV));
      i===0 ? ctx.moveTo(toX(i),y) : ctx.lineTo(toX(i),y);
    });
    ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle='#4caf7d'; ctx.font='9px DM Sans,sans-serif'; ctx.textAlign='left';
    ctx.fillText('goal +0.5/wk', pad.l+2, toY(entries[0].v+0.4)-4);

    // Fill
    const grad = ctx.createLinearGradient(0,pad.t,0,pad.t+cH);
    grad.addColorStop(0,'rgba(244,196,48,0.28)'); grad.addColorStop(1,'rgba(244,196,48,0)');
    ctx.beginPath();
    entries.forEach((e,i) => i===0 ? ctx.moveTo(toX(i),toY(e.v)) : ctx.lineTo(toX(i),toY(e.v)));
    ctx.lineTo(toX(entries.length-1), pad.t+cH); ctx.lineTo(toX(0), pad.t+cH);
    ctx.closePath(); ctx.fillStyle=grad; ctx.fill();

    // Line
    ctx.beginPath(); ctx.strokeStyle='#f4c430'; ctx.lineWidth=2; ctx.lineJoin='round';
    entries.forEach((e,i) => i===0?ctx.moveTo(toX(i),toY(e.v)):ctx.lineTo(toX(i),toY(e.v)));
    ctx.stroke();

    // Dots
    entries.forEach((e,i) => {
      const wk = i%7===0;
      ctx.beginPath(); ctx.arc(toX(i),toY(e.v),wk?4:2.5,0,Math.PI*2);
      ctx.fillStyle = wk?'#f4c430':'#c89e20'; ctx.fill();
      if (wk) {
        ctx.fillStyle='#e8e8f0'; ctx.font='bold 9px DM Sans,sans-serif'; ctx.textAlign='center';
        ctx.fillText(`W${Math.floor(i/7)+1}`, toX(i), pad.t+cH+18);
      }
    });
    // Latest callout
    const last = entries[entries.length-1];
    ctx.fillStyle='#f4c430'; ctx.font='bold 11px DM Sans,sans-serif'; ctx.textAlign='right';
    ctx.fillText(`${last.v} lbs`, toX(entries.length-1), toY(last.v)-8);
  }, [weight]);

  // Streak dots
  const streakDots = [];
  for (let w = 0; w < 12; w++) {
    for (let d = 0; d < 7; d++) {
      const key = `${w}-${d}`;
      const isCurrent = w===state.currentWeek && d===state.currentDay;
      const isDone = completedWorkouts[key];
      streakDots.push(
        <div key={key} style={{
          width:18, height:18, borderRadius:5, flexShrink:0,
          background: isDone ? '#4caf7d' : isCurrent ? '#f4c430' : 'var(--border)'
        }} />
      );
    }
  }

  return (
    <div style={s.page}>
      {/* Save */}
      <div style={s.card}>
        <div style={s.cardTitle}>💾 SAVE YOUR DATA</div>
        <div style={s.sub}>Export before clearing your browser. Import to restore.</div>
        <div style={{ display:'flex', gap:8, marginTop:10 }}>
          <button onClick={exportData} style={s.exportBtn}>⬇ EXPORT</button>
          <label style={s.importBtn}>
            ⬆ IMPORT
            <input type="file" accept=".json" onChange={importData} style={{ display:'none' }} />
          </label>
        </div>
      </div>

      {/* Weight chart */}
      <div style={s.card}>
        <div style={s.cardTitle}>⚖️ WEIGHT TREND</div>
        <div style={s.sub}>Log every morning — dashed green line is your +0.5 lbs/week goal</div>
        <canvas ref={canvasRef} style={{ width:'100%', display:'block', marginTop:8 }} />
      </div>

      {/* Progress bar */}
      <div style={s.card}>
        <div style={s.cardTitle}>⚡ PROGRAM PROGRESS</div>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.8rem', color:'var(--muted)', marginBottom:6 }}>
          <span>{done} workouts completed</span><span style={{ color:'var(--accent)' }}>{pct}%</span>
        </div>
        <div style={s.barBg}><div style={{ ...s.barFill, width:`${pct}%` }} /></div>
        <div style={{ display:'flex', gap:12, marginTop:14, fontSize:'0.78rem' }}>
          {[['🔥','Phase 1','Wks 1–4','#ff6b35'],['⚡','Phase 2','Wks 5–8','#f4c430'],['🏆','Phase 3','Wks 9–12','#4caf7d']].map(([ico,name,range,color])=>(
            <div key={name} style={{ flex:1, textAlign:'center' }}>
              <div style={{ fontSize:'1.2rem' }}>{ico}</div>
              <div style={{ color, fontWeight:600 }}>{name}</div>
              <div style={{ color:'var(--muted)' }}>{range}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Streak */}
      <div style={s.card}>
        <div style={s.cardTitle}>📅 84-DAY STREAK</div>
        <div style={s.sub}>Green = done · Gold = today · Gray = upcoming</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginTop:8 }}>{streakDots}</div>
      </div>
    </div>
  );
}

const s = {
  page: { padding:16, paddingBottom:80 },
  card: { background:'var(--card)', border:'1px solid var(--border)', borderRadius:14, padding:16, marginBottom:12 },
  cardTitle: { fontFamily:'Bebas Neue', fontSize:'1.05rem', letterSpacing:'2px', color:'var(--accent)', marginBottom:4 },
  sub: { fontSize:'0.78rem', color:'var(--muted)', lineHeight:1.4 },
  exportBtn: { flex:1, padding:'10px 0', background:'var(--accent)', color:'#000', border:'none', borderRadius:10, fontFamily:'DM Sans', fontWeight:700, fontSize:'0.82rem', letterSpacing:'1px', cursor:'pointer' },
  importBtn: { flex:1, padding:'10px 0', background:'var(--card)', color:'var(--text)', border:'1px solid var(--border)', borderRadius:10, fontFamily:'DM Sans', fontWeight:700, fontSize:'0.82rem', letterSpacing:'1px', cursor:'pointer', textAlign:'center', display:'block' },
  barBg: { background:'var(--border)', borderRadius:100, height:8, overflow:'hidden' },
  barFill: { height:'100%', borderRadius:100, background:'linear-gradient(90deg,#ff6b35,#f4c430)', transition:'width 0.6s ease' },
};
