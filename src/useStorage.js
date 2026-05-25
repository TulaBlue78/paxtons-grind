import { useState, useEffect } from 'react';

export function today() {
  return new Date().toLocaleDateString('en-US');
}

const STORAGE_KEY = 'paxtons-grind-v2';

const defaultState = {
  currentWeek: 0,
  currentDay: 0,
  completedExercises: {},
  completedWorkouts: {},
  water: {},
  proteinWins: {},
  fvWins: {},
  weight: {},
  sports: {},
};

export function useStorage() {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState;
    } catch {
      return defaultState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const update = (updater) => setState(prev => {
    const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
    return next;
  });

  return [state, update];
}
