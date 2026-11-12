// Simple tab manager. Each tab has an id, a title, and a panel element.
// Later, each "module" (notes, todo, timer...) can supply a render(panel) function.

const tabsEl = document.getElementById('tabs');
const contentEl = document.getElementById('content');
const newTabBtn = document.getElementById('new-tab');

let tabs = [];       // [{ id, title, tabEl, panelEl }]
let activeId = null;
let counter = 0;

function addTab(title) {
  const id = ++counter;
  title = title || `Tab ${id}`;

  const tabEl = document.createElement('div');
  tabEl.className = 'tab';
  tabEl.setAttribute('role', 'tab');

  const titleEl = document.createElement('span');
  titleEl.className = 'tab-title';
  titleEl.textContent = title;

  const closeEl = document.createElement('button');
  closeEl.className = 'tab-close';
  closeEl.textContent = '×';
  closeEl.title = 'Close tab';

  tabEl.append(titleEl, closeEl);

  const panelEl = document.createElement('section');
  panelEl.className = 'panel'; // blank for now

  tabEl.addEventListener('click', () => selectTab(id));
  closeEl.addEventListener('click', (e) => {
    e.stopPropagation();
    closeTab(id);
  });

  tabsEl.appendChild(tabEl);
  contentEl.appendChild(panelEl);
  tabs.push({ id, title, tabEl, panelEl });
  selectTab(id);
}

function selectTab(id) {
  activeId = id;
  for (const t of tabs) {
    const on = t.id === id;
    t.tabEl.classList.toggle('active', on);
    t.panelEl.classList.toggle('active', on);
    t.tabEl.setAttribute('aria-selected', String(on));
  }
}

function closeTab(id) {
  const idx = tabs.findIndex((t) => t.id === id);
  if (idx === -1) return;
  const [t] = tabs.splice(idx, 1);
  t.tabEl.remove();
  t.panelEl.remove();

  if (tabs.length === 0) {
    addTab();
  } else if (activeId === id) {
    selectTab(tabs[Math.max(0, idx - 1)].id);
  }
}

function cycleTab(step) {
  const idx = tabs.findIndex((t) => t.id === activeId);
  selectTab(tabs[(idx + step + tabs.length) % tabs.length].id);
}

newTabBtn.addEventListener('click', () => addTab());

// Keyboard shortcuts: Ctrl/Cmd+T new, +W close, Ctrl+Tab / Ctrl+Shift+Tab cycle
window.addEventListener('keydown', (e) => {
  const mod = e.ctrlKey || e.metaKey;
  if (!mod) return;
  const key = e.key.toLowerCase();
  if (key === 't') { e.preventDefault(); addTab(); }
  else if (key === 'w') { e.preventDefault(); closeTab(activeId); }
  else if (e.key === 'Tab') { e.preventDefault(); cycleTab(e.shiftKey ? -1 : 1); }
});

// Start with three blank tabs so you can test flipping between them
addTab('Home');
selectTab(tabs[0].id);
