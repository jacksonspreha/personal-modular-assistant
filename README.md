# My Toolbox

A minimal Electron app with a browser-style tab bar. Tab contents are blank for now.

## Setup

1. Install Node.js (LTS) from https://nodejs.org if you don't have it. Check with `node -v` and `npm -v`.
2. In this folder, run:

   ```
   npm install --save-dev electron
   npm start
   ```

A window should open with three tabs (Home, Notes, Tools).

## Controls

- Click a tab to switch, `×` to close, `+` to add a new one
- `Ctrl/Cmd + T` new tab, `Ctrl/Cmd + W` close tab, `Ctrl + Tab` / `Ctrl + Shift + Tab` next/previous tab

## File layout

- `main.js` – main process: creates the window (Node.js side)
- `preload.js` – bridge between main process and page (empty for now)
- `index.html`, `styles.css` – the UI shell
- `renderer.js` – tab logic running in the page

## Next steps

To make tabs modular, give each tab a module with a `render(panel)` function (notes, todo list, timer, etc.) and call it when the tab is created in `addTab`.
