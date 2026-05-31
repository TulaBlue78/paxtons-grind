// Day index: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
// Sun=Lower+Power, Mon=Upper Pull Heavy, Tue AM=Light Upper Push, Wed=REST
// Thu=Upper Pull Light, Fri=Core+Speed, Sat=LEG DAY
// kb:true = kettlebell, db:true = dumbbell, knee:true = knee rehab

export function getWorkout(week, day) {
  const w = week + 1;
  const p1 = w <= 4, p2 = w >= 5 && w <= 8, p3 = w >= 9;

  // Wednesday = protected rest day
  if (day === 3) {
    return { label: 'REST DAY', rest: true };
  }

  // Sunday = Lower Body + Power
  if (day === 0) {
    if (p1) return { label: 'LOWER + POWER', note: 'Legs are fresh — go hard today.', exercises: [
      { name: 'KB Goblet Squat', sets: '3×10', weight: '30 lb KB', kb: true },
      { name: 'KB Romanian Deadlift', sets: '3×10', weight: '30 lb KB', kb: true },
      { name: 'Dumbbell Reverse Lunge', sets: '3×10 each', weight: '15 lb DBs', db: true },
      { name: 'Bodyweight Jump Squat', sets: '3×8', weight: 'explosive!' },
      { name: 'Broad Jumps', sets: '3×5', weight: 'max distance' },
      { name: 'Glute Bridges', sets: '3×15', weight: 'bodyweight' },
      { name: 'Calf Raises', sets: '3×20', weight: 'bodyweight' },
      { name: 'Band TKE', sets: '3×15 each', knee: true },
      { name: 'Backward Drag (30s)', sets: '3 rounds', knee: true },
    ]};
    if (p2) return { label: 'LOWER + POWER', note: 'Increase weight from Phase 1. Push the goblet squat.', exercises: [
      { name: 'KB Goblet Squat', sets: '4×12', weight: '30 lb KB', kb: true },
      { name: 'KB Romanian Deadlift', sets: '4×12', weight: '30 lb KB', kb: true },
      { name: 'Dumbbell Reverse Lunge', sets: '4×10 each', weight: '20 lb DBs', db: true },
      { name: 'Jump Squats', sets: '4×10', weight: 'explosive!' },
      { name: 'Broad Jumps', sets: '4×5', weight: 'max distance' },
      { name: 'Single-Leg Glute Bridge', sets: '3×12 each', weight: 'bodyweight' },
      { name: 'Dumbbell Step-Ups', sets: '3×12 each', weight: '15 lb DBs', db: true },
      { name: 'Band TKE', sets: '3×20 each', knee: true },
      { name: 'Backward Drag (45s)', sets: '3 rounds', knee: true },
    ]};
    return { label: 'LOWER + POWER', note: 'Phase 3 — max effort on every set.', exercises: [
      { name: 'KB Goblet Squat', sets: '4×15', weight: '30 lb KB', kb: true },
      { name: 'KB Single-Leg RDL', sets: '4×8 each', weight: '30 lb KB', kb: true },
      { name: 'Dumbbell Reverse Lunge', sets: '4×12 each', weight: '20 lb DBs', db: true },
      { name: 'Jump Lunges', sets: '4×10 each', weight: 'explosive!' },
      { name: 'Broad Jumps', sets: '4×6', weight: 'max distance' },
      { name: 'Dumbbell Step-Ups', sets: '4×12 each', weight: '20 lb DBs', db: true },
      { name: 'Nordic Curl Progression', sets: '4×6', weight: 'bodyweight' },
      { name: 'Band TKE', sets: '4×20 each', knee: true },
      { name: 'Backward Drag (60s)', sets: '4 rounds', knee: true },
    ]};
  }

  // Monday = Upper Pull Heavy
  if (day === 1) {
    if (p1) return { label: 'UPPER PULL — HEAVY', note: 'Back and biceps. Pull hard.', exercises: [
      { name: 'DB Bent-Over Row', sets: '3×10 each', weight: '20 lb DB', db: true },
      { name: 'KB Single-Arm Row', sets: '3×10 each', weight: '30 lb KB', kb: true },
      { name: 'Inverted Row (table)', sets: '3×10', weight: 'bodyweight' },
      { name: 'DB Hammer Curl', sets: '3×10', weight: '15 lb DBs', db: true },
      { name: 'DB Bicep Curl', sets: '3×10', weight: '12 lb DBs', db: true },
      { name: 'Band Pull-Apart', sets: '3×15', weight: 'resistance band' },
      { name: 'Superman Hold', sets: '3×30s', weight: 'bodyweight' },
    ]};
    if (p2) return { label: 'UPPER PULL — HEAVY', note: 'Add weight this phase. Rows should feel hard by rep 8.', exercises: [
      { name: 'DB Bent-Over Row', sets: '4×12 each', weight: '20 lb DB', db: true },
      { name: 'KB Single-Arm Row', sets: '4×12 each', weight: '30 lb KB', kb: true },
      { name: 'Inverted Row (table)', sets: '4×12', weight: 'bodyweight' },
      { name: 'DB Hammer Curl', sets: '3×12', weight: '15 lb DBs', db: true },
      { name: 'DB Bicep Curl', sets: '3×12', weight: '15 lb DBs', db: true },
      { name: 'Band Pull-Apart', sets: '3×20', weight: 'resistance band' },
      { name: 'DB Suitcase Carry (30s)', sets: '3 each side', weight: '20 lb DB', db: true },
    ]};
    return { label: 'UPPER PULL — HEAVY', note: 'Phase 3 — squeeze every rep at the top.', exercises: [
      { name: 'DB Bent-Over Row', sets: '4×15 each', weight: '20 lb DB', db: true },
      { name: 'KB Single-Arm Row', sets: '4×15 each', weight: '30 lb KB', kb: true },
      { name: 'Inverted Row (table)', sets: '4×15', weight: 'add pause at top' },
      { name: 'DB Hammer Curl', sets: '4×12', weight: '20 lb DBs', db: true },
      { name: 'DB Bicep Curl', sets: '4×12', weight: '20 lb DBs', db: true },
      { name: 'Band Pull-Apart', sets: '4×20', weight: 'resistance band' },
      { name: 'DB Suitcase Carry (45s)', sets: '3 each side', weight: '20 lb DB', db: true },
    ]};
  }

  // Tuesday = Light Upper Push (morning before practices)
  if (day === 2) {
    return { label: 'LIGHT UPPER PUSH', note: '🏈🏀 Practice tonight — keep this under 20 min. No heavy lifting. Just activate the muscles.', exercises: [
      { name: 'Push-Ups', sets: p1?'2×15':p2?'2×20':'2×25', weight: 'bodyweight' },
      { name: 'Pike Push-Ups', sets: '2×10', weight: 'bodyweight' },
      { name: 'DB Lateral Raise', sets: '2×12', weight: '10 lb DBs', db: true },
      { name: 'Tricep Dips (chair)', sets: '2×12', weight: 'bodyweight' },
      { name: 'Diamond Push-Ups', sets: '2×8', weight: 'bodyweight' },
    ]};
  }

  // Thursday = Upper Pull Light (before basketball)
  if (day === 4) {
    return { label: 'UPPER PULL — LIGHT', note: '🏀 Basketball tonight — done in 25 min. Light weight, good form.', exercises: [
      { name: 'DB Bent-Over Row', sets: p1?'3×10':'3×12', weight: '15 lb DB', db: true },
      { name: 'Inverted Row (table)', sets: '3×10', weight: 'bodyweight' },
      { name: 'DB Hammer Curl', sets: '3×10', weight: '12 lb DBs', db: true },
      { name: 'Band Pull-Apart', sets: '3×15', weight: 'resistance band' },
      { name: 'Superman Hold', sets: '2×30s', weight: 'bodyweight' },
    ]};
  }

  // Friday = Core + Speed (before football)
  if (day === 5) {
    if (p1) return { label: 'CORE + SPEED', note: '🏈 Football today — athletic work only. No heavy legs.', exercises: [
      { name: 'KB Swing', sets: '3×10', weight: '30 lb KB', kb: true },
      { name: 'Broad Jumps', sets: '3×5', weight: 'max distance' },
      { name: 'Lateral Bounds', sets: '3×8 each', weight: 'explosive!' },
      { name: 'Plank', sets: '3×30s', weight: 'bodyweight' },
      { name: 'Mountain Climbers', sets: '3×20', weight: 'bodyweight' },
      { name: 'Hollow Body Hold', sets: '3×20s', weight: 'bodyweight' },
      { name: 'DB Suitcase Carry (30s)', sets: '2 each side', weight: '20 lb DB', db: true },
    ]};
    if (p2) return { label: 'CORE + SPEED', note: '🏈 Football today — athletic work only. No heavy legs.', exercises: [
      { name: 'KB Swing', sets: '4×15', weight: '30 lb KB', kb: true },
      { name: 'Broad Jumps', sets: '4×5', weight: 'max distance' },
      { name: 'Lateral Bounds', sets: '4×8 each', weight: 'explosive!' },
      { name: 'Plank', sets: '3×45s', weight: 'bodyweight' },
      { name: 'Mountain Climbers', sets: '3×30', weight: 'bodyweight' },
      { name: 'Hollow Body Hold', sets: '3×30s', weight: 'bodyweight' },
      { name: 'DB Suitcase Carry (45s)', sets: '3 each side', weight: '20 lb DB', db: true },
    ]};
    return { label: 'CORE + SPEED', note: '🏈 Football today — athletic work only. No heavy legs.', exercises: [
      { name: 'KB Swing', sets: '4×20', weight: '30 lb KB', kb: true },
      { name: 'Broad Jumps', sets: '4×6', weight: 'max distance' },
      { name: 'Lateral Bounds', sets: '4×10 each', weight: 'explosive!' },
      { name: 'Plank', sets: '4×60s', weight: 'bodyweight' },
      { name: 'KB Russian Twist', sets: '3×20', weight: '30 lb KB', kb: true },
      { name: 'Hollow Body Hold', sets: '3×40s', weight: 'bodyweight' },
      { name: 'DB Suitcase Carry (60s)', sets: '3 each side', weight: '20 lb DB', db: true },
    ]};
  }

  // Saturday = LEG DAY
  if (day === 6) {
    if (p1) return { label: 'LEG DAY 💪', note: 'Most important day of the week. No rush — do it right.', exercises: [
      { name: 'KB Goblet Squat', sets: '4×10', weight: '30 lb KB', kb: true },
      { name: 'KB Romanian Deadlift', sets: '4×10', weight: '30 lb KB', kb: true },
      { name: 'DB Step-Ups', sets: '3×10 each', weight: '15 lb DBs', db: true },
      { name: 'DB Reverse Lunge', sets: '3×10 each', weight: '15 lb DBs', db: true },
      { name: 'Glute Bridge', sets: '3×15', weight: 'bodyweight' },
      { name: 'Wall Sit', sets: '3×30s', weight: 'bodyweight' },
      { name: 'Calf Raises', sets: '3×20', weight: 'bodyweight' },
      { name: 'Band TKE', sets: '3×15 each', knee: true },
      { name: 'Band Lateral Walk', sets: '3×15 steps', knee: true },
      { name: 'Backward Drag (30s)', sets: '3 rounds', knee: true },
    ]};
    if (p2) return { label: 'LEG DAY 💪', note: 'Phase 2 — heavier, more reps. Legs should be burning.', exercises: [
      { name: 'KB Goblet Squat', sets: '4×12', weight: '30 lb KB', kb: true },
      { name: 'KB Romanian Deadlift', sets: '4×12', weight: '30 lb KB', kb: true },
      { name: 'DB Step-Ups', sets: '4×12 each', weight: '20 lb DBs', db: true },
      { name: 'Bulgarian Split Squat', sets: '4×10 each', weight: '15 lb DBs', db: true },
      { name: 'KB Swing', sets: '3×15', weight: '30 lb KB', kb: true },
      { name: 'Single-Leg Glute Bridge', sets: '3×12 each', weight: 'bodyweight' },
      { name: 'Wall Sit', sets: '3×45s', weight: 'bodyweight' },
      { name: 'Band TKE', sets: '3×20 each', knee: true },
      { name: 'Band Lateral Walk', sets: '3×20 steps', knee: true },
      { name: 'Backward Drag (45s)', sets: '3 rounds', knee: true },
    ]};
    return { label: 'LEG DAY 💪', note: 'Phase 3 — final push. This is where the gains happen.', exercises: [
      { name: 'KB Goblet Squat', sets: '5×12', weight: '30 lb KB', kb: true },
      { name: 'KB Single-Leg RDL', sets: '4×8 each', weight: '30 lb KB', kb: true },
      { name: 'DB Step-Ups', sets: '4×15 each', weight: '20 lb DBs', db: true },
      { name: 'Bulgarian Split Squat', sets: '4×12 each', weight: '20 lb DBs', db: true },
      { name: 'KB Swing', sets: '4×20', weight: '30 lb KB', kb: true },
      { name: 'Nordic Curl Progression', sets: '4×6', weight: 'bodyweight' },
      { name: 'Wall Sit', sets: '3×60s', weight: 'bodyweight' },
      { name: 'Band TKE', sets: '4×20 each', knee: true },
      { name: 'Backward Drag (60s)', sets: '4 rounds', knee: true },
    ]};
  }
}

export const WEEK_TIPS = [
  'Phase 1 — learn every movement. Form beats reps every time.',
  'Add 1–2 reps to each exercise vs last week. Small gains add up.',
  'Squeeze the target muscle on every rep. Feel it working.',
  'End of Phase 1 — test yourself. Max push-ups and rows.',
  'Phase 2 — increase weight where you can. Push the KB harder.',
  'Slow the lowering phase to 3 seconds. Slow = stronger.',
  'No rest between two exercises back-to-back. Supersets build conditioning.',
  'Halfway! You should be noticeably stronger than Week 1.',
  'Phase 3 — this is where real size and strength is built.',
  'Mind-muscle connection. Don\'t just move the weight — feel it.',
  'Second to last week. Every set counts. No junk reps.',
  'FINAL WEEK. Leave nothing. You\'ve earned every rep.',
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
