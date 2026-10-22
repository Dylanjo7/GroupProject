# Kakurasu

A browser version of **Kakurasu**, a logic puzzle where you shade cells in a grid so every row and column adds up to its clue. Built with React and Vite.

**Play it:** https://dylanjo7.github.io/GroupProject/

## How to play

1. Click **Generate New Puzzle** and pick a grid size from 3 to 10.
2. Check a cell to shade it. A shaded cell is worth its **column number** toward its row total, and its **row number** toward its column total.
3. The clue for each row is on the right and the clue for each column is along the bottom. Your running totals are shown in grey next to them.
4. Make every total match its clue to win. Any arrangement that satisfies all the clues counts, not just the one the generator started from.

## Features

- Random puzzle generation for grids from 3×3 to 10×10
- Live row and column totals so you can see how close you are
- Win detection that accepts any valid solution

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Tech

- React 18
- Vite 6
- ESLint
- GitHub Actions for CI (lint + build on pull requests) and deployment to GitHub Pages
