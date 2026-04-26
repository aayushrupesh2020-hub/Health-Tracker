import React from 'react';
import styles from './ScoreRing.module.css';
import { SCORE_LABELS, SCORE_DETAILS, getScoreIndex } from '../metricsConfig';

const CIRCUMFERENCE = 188.5;

export default function ScoreRing({ score }) {
  const offset = CIRCUMFERENCE - CIRCUMFERENCE * (score / 100);
  const idx = getScoreIndex(score);

  return (
    <div className={styles.scoreBar}>
      <div className={styles.ring}>
        <svg viewBox="0 0 72 72" width="72" height="72" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="36" cy="36" r="30" fill="none" stroke="var(--border)" strokeWidth="6" />
          <circle
            cx="36"
            cy="36"
            r="30"
            fill="none"
            stroke="#378ADD"
            strokeWidth="6"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <div className={styles.ringNum}>
          <span className={styles.bigNum}>{score}</span>
          <span className={styles.subNum}>/ 100</span>
        </div>
      </div>
      <div className={styles.info}>
        <p className={styles.label}>{SCORE_LABELS[idx]}</p>
        <p className={styles.detail}>{SCORE_DETAILS[idx]}</p>
      </div>
    </div>
  );
}
