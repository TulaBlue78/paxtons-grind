import React, { useState } from 'react';
import { useStorage } from './useStorage';
import WorkoutTab from './components/WorkoutTab';
import LogTab from './components/LogTab';
import ProgressTab from './components/ProgressTab';
import GuideTab from './components/GuideTab';
import './App.css';

const TABS = [
  { id: 'workout', label: 'WORKOUT', icon: '💪' },
  { id: 'log',     label: 'LOG',     icon: '📋' },
  { id: 'progress',label: 'PROGRESS',icon: '📈' },
  { id: 'guide',   label: 'GUIDE',   icon: '📖' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('workout');
  const [state, update] = useStorage();

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-glow" />
        <div className="header-title">PAXTON'S GRIND</div>
        <div className="header-sub">12-WEEK PROGRAM</div>
        <div className="week-badge">WEEK {state.currentWeek + 1} OF 12</div>
      </header>

      {/* Content */}
      <main className="main">
        {activeTab === 'workout'  && <WorkoutTab  state={state} update={update} />}
        {activeTab === 'log'      && <LogTab      state={state} update={update} />}
        {activeTab === 'progress' && <ProgressTab state={state} update={update} />}
        {activeTab === 'guide'    && <GuideTab />}
      </main>

      {/* Bottom nav */}
      <nav className="nav">
        {TABS.map(tab => (
          <button key={tab.id} className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}>
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
