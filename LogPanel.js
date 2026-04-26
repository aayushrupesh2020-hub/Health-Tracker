import React, { useState, useEffect } from 'react';
import styles from './LogPanel.module.css';

export default function LogPanel({ metric, onSave, onClear }) {
  const defaultVal = metric
    ? metric.inputType === 'range'
      ? Math.round((metric.min + metric.max) / 2)
      : metric.goal
    : 0;

  const [inputVal, setInputVal] = useState(defaultVal);

  useEffect(() => {
    setInputVal(defaultVal);
  }, [metric?.id]);

  if (!metric) {
    return (
      <div className={styles.panel}>
        <div className={styles.header}>
          <span>Log entry</span>
          <span className={styles.metricName}>Select a metric above</span>
        </div>
        <p className={styles.placeholder}>Click any metric card to log data for it.</p>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span>Log entry</span>
        <span className={styles.metricName}>
          {metric.label} — goal: {metric.goal} {metric.unit}
        </span>
      </div>

      <div className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="logInput">{metric.logLabel}</label>
          {metric.inputType === 'range' ? (
            <>
              <input
                id="logInput"
                type="range"
                min={metric.min}
                max={metric.max}
                step={metric.step}
                value={inputVal}
                onChange={(e) => setInputVal(Number(e.target.value))}
              />
              <span className={styles.rangeVal}>{inputVal}</span>
            </>
          ) : (
            <input
              id="logInput"
              type="number"
              min={metric.min}
              max={metric.max}
              step={metric.step}
              value={inputVal}
              placeholder={metric.placeholder || ''}
              onChange={(e) => setInputVal(Number(e.target.value))}
            />
          )}
        </div>

        <div className={styles.btnRow}>
          <button className={styles.primary} onClick={() => onSave(inputVal)}>
            Save entry
          </button>
          <button className={styles.secondary} onClick={onClear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
