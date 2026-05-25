// Day index: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
// Sun+Sat = Core/Cardio, Mon/Wed/Fri = Upper, Tue/Thu = Lower
// KB exercises marked kb:true, knee rehab marked knee:true

export function getWorkout(week, day) {
  const w = week + 1;
  const p1 = w <= 4, p2 = w >= 5 && w <= 8, p3 = w >= 9;

  const label = (day === 0 || day === 6) ? 'CORE + CARDIO'
    : [1,3,5].includes(day) ? 'UPPER BODY' : 'LOWER BODY';

  if (day === 0 || day === 6) {
    const r = p1 ? 2 : p2 ? 3 : 4;
    const plank = p1 ? '30s' : p2 ? '45s' : '60s';
    return { label, exercises: [
      { name: 'Plank', sets: `${r}×${plank}` },
      { name: 'Mountain Climbers', sets: `${r}×${p1?20:p2?30:40}` },
      { name: p1?'KB Deadlift':'KB Swing', sets: `${r}×${p1?10:p2?15:20}`, kb: true },
      { name: 'Bicycle Crunches', sets: `${r}×${p1?15:p2?20:25}` },
      { name: 'KB Russian Twist', sets: `${r}×${p1?12:p2?16:20}`, kb: true },
      { name: 'Burpees', sets: `${r}×${p1?8:p2?12:15}` },
      { name: 'Hollow Body Hold', sets: `${r}×${p1?20:p2?30:40}s` },
    ]};
  }

  if ([1,3,5].includes(day)) {
    if (p1) return { label, exercises: [
      { name: 'Push-Ups', sets: '3×10' },
      { name: 'KB Single-Arm Press', sets: '3×8 each', kb: true },
      { name: 'Diamond Push-Ups', sets: '3×8' },
      { name: 'Pike Push-Ups', sets: '3×8' },
      { name: 'KB Bent-Over Row', sets: '3×10 each', kb: true },
      { name: 'Dips (chair)', sets: '3×10' },
      { name: 'Inverted Rows (table)', sets: '3×8' },
    ]};
    if (p2) return { label, exercises: [
      { name: 'Push-Ups', sets: '4×20' },
      { name: 'KB Single-Arm Press', sets: '4×10 each', kb: true },
      { name: 'Wide Push-Ups', sets: '4×15' },
      { name: 'KB Bent-Over Row', sets: '4×12 each', kb: true },
      { name: 'Pike Push-Ups', sets: '4×12' },
      { name: 'Dips (chair)', sets: '4×14' },
      { name: 'KB Halo', sets: '3×8 each dir', kb: true },
    ]};
    return { label, exercises: [
      { name: 'Archer Push-Ups', sets: '4×10 each' },
      { name: 'KB Push Press', sets: '4×10 each', kb: true },
      { name: 'KB Renegade Row', sets: '4×8 each', kb: true },
      { name: 'Pike Push-Ups', sets: '4×15' },
      { name: 'Decline Push-Ups', sets: '4×15' },
      { name: 'Dips (chair)', sets: '4×18' },
      { name: 'KB Halo', sets: '3×10 each dir', kb: true },
    ]};
  }

  // Lower
  if (p1) return { label, exercises: [
    { name: 'Bodyweight Squats', sets: '3×15' },
    { name: 'KB Goblet Squat', sets: '3×10', kb: true },
    { name: 'Reverse Lunges', sets: '3×10 each' },
    { name: 'KB Romanian Deadlift', sets: '3×10', kb: true },
    { name: 'Glute Bridges', sets: '3×15' },
    { name: 'Band TKE', sets: '3×15 each', knee: true },
    { name: 'Band Lateral Walk', sets: '3×15 steps', knee: true },
    { name: 'Backward Drag (30s)', sets: '3 rounds', knee: true },
  ]};
  if (p2) return { label, exercises: [
    { name: 'KB Goblet Squat', sets: '4×12', kb: true },
    { name: 'Jump Squats', sets: '4×12' },
    { name: 'KB Romanian Deadlift', sets: '4×12', kb: true },
    { name: 'Bulgarian Split Squats', sets: '4×10 each' },
    { name: 'KB Swing', sets: '4×15', kb: true },
    { name: 'Single-Leg Glute Bridge', sets: '4×12 each' },
    { name: 'Band TKE', sets: '3×20 each', knee: true },
    { name: 'Backward Drag (45s)', sets: '3 rounds', knee: true },
  ]};
  return { label, exercises: [
    { name: 'KB Goblet Squat', sets: '4×15', kb: true },
    { name: 'Pistol Squat Progression', sets: '4×6 each' },
    { name: 'KB Swing', sets: '4×20', kb: true },
    { name: 'Jump Lunges', sets: '4×12 each' },
    { name: 'KB Single-Leg RDL', sets: '4×8 each', kb: true },
    { name: 'Nordic Curl Progression', sets: '4×6' },
    { name: 'Band TKE', sets: '4×20 each', knee: true },
    { name: 'Backward Drag (60s)', sets: '4 rounds', knee: true },
  ]};
}

export const WEEK_TIPS = [
  'Focus on FORM over reps. Quality reps build real strength.',
  'Try to add 1–2 reps to each exercise from last week.',
  'Squeeze your abs on every single exercise, even upper body.',
  'End of Phase 1 — test yourself! Max push-ups to see your baseline.',
  'Phase 2 is harder. If something feels easy, try the harder variation.',
  'Add a slow 3-second lowering on every rep. Slow = stronger.',
  'Superset two exercises with no rest between them.',
  'Halfway! Compare your numbers to Week 1. Real improvement.',
  'Phase 3 is the payoff. Every workout counts now.',
  'Mind-muscle connection — feel each muscle working.',
  'Second to last week. This is where champions are made.',
  'FINAL WEEK. Give everything you have. You earned it.',
];

export const PHASES = [
  { name: 'PHASE 1 — FOUNDATION', weeks: '1–4', color: '#ff6b35' },
  { name: 'PHASE 1 — FOUNDATION', weeks: '1–4', color: '#ff6b35' },
  { name: 'PHASE 1 — FOUNDATION', weeks: '1–4', color: '#ff6b35' },
  { name: 'PHASE 1 — FOUNDATION', weeks: '1–4', color: '#ff6b35' },
  { name: 'PHASE 2 — BUILD', weeks: '5–8', color: '#f4c430' },
  { name: 'PHASE 2 — BUILD', weeks: '5–8', color: '#f4c430' },
  { name: 'PHASE 2 — BUILD', weeks: '5–8', color: '#f4c430' },
  { name: 'PHASE 2 — BUILD', weeks: '5–8', color: '#f4c430' },
  { name: 'PHASE 3 — MAX OUT', weeks: '9–12', color: '#4caf7d' },
  { name: 'PHASE 3 — MAX OUT', weeks: '9–12', color: '#4caf7d' },
  { name: 'PHASE 3 — MAX OUT', weeks: '9–12', color: '#4caf7d' },
  { name: 'PHASE 3 — MAX OUT', weeks: '9–12', color: '#4caf7d' },
];

export const PROTEIN_GUIDE = [
  { time: '🌅 Breakfast — Win #1', items: [
    { food: '3 scrambled eggs', g: 18, note: 'best breakfast option' },
    { food: '2 eggs', g: 12, note: 'quick and easy' },
    { food: 'Greek yogurt (6 oz)', g: 15, note: 'add fruit or honey' },
    { food: 'Cottage cheese (½ cup)', g: 14, note: '' },
    { food: 'Protein shake', g: 25, note: 'if running late' },
  ]},
  { time: '☀️ Mid-Morning — Win #2', items: [
    { food: 'String cheese + almonds', g: 10, note: 'easy grab-and-go' },
    { food: 'Hard boiled eggs ×2', g: 12, note: 'prep night before' },
    { food: 'Protein bar (Quest/RXBAR)', g: 20, note: 'aim for 20g+' },
    { food: 'Beef jerky (1 oz)', g: 9, note: 'good travel snack' },
  ]},
  { time: '🌤 Lunch — Win #3', items: [
    { food: 'Chicken breast (4 oz)', g: 30, note: 'most protein per bite' },
    { food: 'Ground beef (4 oz)', g: 28, note: 'burger, taco, bowl' },
    { food: 'Turkey sandwich', g: 25, note: '2 slices deli turkey + cheese' },
    { food: 'Tuna (1 can)', g: 25, note: 'quick and cheap' },
  ]},
  { time: '⚡ Post-Workout — Win #4', items: [
    { food: 'Chocolate milk (2 cups)', g: 16, note: 'perfect post-workout ratio' },
    { food: 'Protein shake', g: 25, note: 'drink within 30 min of training' },
    { food: 'Greek yogurt + banana', g: 15, note: 'carbs + protein' },
  ]},
  { time: '🌙 Dinner — Win #5', items: [
    { food: 'Chicken breast (5 oz)', g: 35, note: '' },
    { food: 'Ground beef (5 oz)', g: 35, note: 'tacos, pasta, stir fry' },
    { food: 'Salmon (5 oz)', g: 34, note: 'omega-3s help joints too' },
    { food: 'Pork tenderloin (5 oz)', g: 30, note: '' },
  ]},
  { time: '🌛 Before Bed — Win #6', items: [
    { food: 'PB&J sandwich', g: 14, note: 'slow digesting — great overnight fuel' },
    { food: 'Cottage cheese (½ cup)', g: 14, note: 'best before-bed protein' },
    { food: 'Peanut butter on toast', g: 8, note: 'add milk for +8g' },
    { food: 'Chocolate milk (1 cup)', g: 8, note: '' },
  ]},
  { time: '🥜 Nuts & Quick Snacks', items: [
    { food: 'Almonds (1 oz / ~23)', g: 6, note: 'healthy fats too' },
    { food: 'Peanut butter (2 tbsp)', g: 8, note: 'add to anything' },
    { food: 'Peanuts (1 oz)', g: 7, note: '' },
    { food: 'Edamame (½ cup)', g: 9, note: 'great with dinner' },
    { food: 'Sunflower seeds (1 oz)', g: 6, note: '' },
  ]},
];
