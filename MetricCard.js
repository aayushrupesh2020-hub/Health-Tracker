import React from 'react';
import styles from './MetricCard.module.css';

export default function MetricCard({ metric, value, week, isActive, onClick }) {
  const pct = value !== null ? metric.scoreFn(value) : 0;

  return (
    <div
      className={`${styles.card} ${isActive ? styles.active : ''}`}
      style={{ '--accent': metric.color }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-pressed={isActive}
      aria-label={`${metric.label}: ${value !== null ? metric.formatVal(value) : 'not logged'}`}
    >
      <div className={styles.top}>
        <div className={styles.icon} style={{ background: metric.bg, color: metric.color }}>
          {metric.icon}
        </div>
        <span
          className={styles.pct}
          style={{ color: value !== null ? metric.color : 'var(--text-secondary)' }}
        >
          {value !== null ? `${pct}%` : '—'}
        </span>
      </div>

      <div className={styles.val}>{value !== null ? metric.formatVal(value) : '—'}</div>
      <div className={styles.lbl}>{metric.label}</div>

      <div className={styles.progTrack}>
        <div
          className={styles.progFill}
          style={{ width: `${pct}%`, background: metric.color }}
        />
      </div>

      <div className={styles.weekRow}>
        {week.map((filled, i) => (
          <div
            key={i}
            className={`${styles.weekDot} ${filled ? styles.filled : ''}`}
            style={{ '--dot-color': metric.color }}
            title={`Day ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
