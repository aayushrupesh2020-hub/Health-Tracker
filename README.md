# Health Balance Tracker

A clean, medical-professional daily wellness dashboard built with React.

## Features

- Track 6 key health metrics: **Sleep**, **Water**, **Steps**, **Mood**, **Calories**, **Meditation**
- Real-time **health score** (0–100) calculated from all logged metrics
- Per-metric **progress bars** and **percentage toward daily goal**
- **7-day streak dots** showing which days you've logged each metric
- Animated score ring that updates as you log
- Dark mode support (follows system preference)
- Fully responsive — works on mobile and desktop

## Tech Stack

- React 18
- CSS Modules
- No external UI libraries — pure HTML + CSS + JS

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── App.js                  # Root component + state management
├── App.module.css          # App layout styles
├── index.js                # React entry point
├── index.css               # Global CSS variables + resets
├── metricsConfig.js        # Metric definitions, goals, score functions
└── components/
    ├── ScoreRing.js        # Animated circular score ring
    ├── ScoreRing.module.css
    ├── MetricCard.js       # Individual metric card with progress
    ├── MetricCard.module.css
    ├── LogPanel.js         # Log entry form (range / number input)
    ├── LogPanel.module.css
    ├── Toast.js            # Notification toast
    └── Toast.module.css
```

## Customising Goals

Edit `src/metricsConfig.js` to change daily goals, min/max values, score functions, or add new metrics.

```js
{
  id: 'sleep',
  goal: 8,          // daily goal
  min: 0,
  max: 12,
  scoreFn: (v) => Math.min(100, Math.round((v / 8) * 100)),
}
```

## Deploying to GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json`:
```json
"homepage": "https://<your-username>.github.io/health-balance-tracker",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Then run:
```bash
npm run deploy
```

## License

MIT
