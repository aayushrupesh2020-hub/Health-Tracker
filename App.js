import React, { useState, useCallback } from 'react';
import styles from './App.module.css';
import { METRICS } from './metricsConfig';
import ScoreRing from './components/ScoreRing';
import MetricCard from './components/MetricCard';
import LogPanel from './components/LogPanel';
import Toast from './components/Toast';

function buildInitialState() {
  const s = {};
  METRICS.forEach((m) => {
    s[m.id] = { value: null, week: Array(7).fill(false) };
  });
  return s;
}

function computeScore(state) {
  const logged = METRICS.filter((m) => state[m.id].value !== null);
  if (logged.length === 0) return 0;
  const sum = logged.reduce((acc, m) => acc + m.scoreFn(state[m.id].value), 0);
  return Math.round(sum / METRICS.length);
}

export default function App() {
  const [metricState, setMetricState] = useState(buildInitialState);
  const [activeId, setActiveId] = useState(null);
  const [toast, setToast] = useState('');
  const [toastKey, setToastKey] = useState(0);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setToastKey((k) => k + 1);
  }, []);

  const handleSave = useCallback(
    (value) => {
      if (!activeId) return;
      const metric = METRICS.find((m) => m.id === activeId);
      const dow = new Date().getDay();
      const dayIdx = dow === 0 ? 6 : dow - 1;
      setMetricState((prev) => ({
        ...prev,
        [activeId]: {
          value,
          week: prev[activeId].week.map((v, i) => (i === dayIdx ? true : v)),
        },
      }));
      showToast(`${metric.icon} ${metric.label} logged: ${metric.formatVal(value)}`);
    },
    [activeId, showToast]
  );

  const handleClear = useCallback(() => {
    if (!activeId) return;
    setMetricState((prev) => ({
      ...prev,
      [activeId]: { ...prev[activeId], value: null },
    }));
    showToast('Entry cleared');
  }, [activeId, showToast]);

  const score = computeScore(metricState);
  const activeMetric = METRICS.find((m) => m.id === activeId) || null;

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className={styles.app}>
      <h2 className="sr-only">
        Health Balance Tracker — daily wellness dashboard tracking sleep, water, steps, mood,
        calories, and meditation.
      </h2>

      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Health Balance</h1>
          <p className={styles.subtitle}>Daily wellness dashboard</p>
        </div>
        <div className={styles.dateBadge}>{today}</div>
      </header>

      <ScoreRing score={score} />

      <div className={styles.grid}>
        {METRICS.map((m) => (
          <MetricCard
            key={m.id}
            metric={m}
            value={metricState[m.id].value}
            week={metricState[m.id].week}
            isActive={activeId === m.id}
            onClick={() => setActiveId(m.id)}
          />
        ))}
      </div>

      <LogPanel metric={activeMetric} onSave={handleSave} onClear={handleClear} />

      <Toast key={toastKey} message={toast} />
    </div>
  );
}
