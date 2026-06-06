@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

:root {
  --gold: #C9A84C;
  --gold-light: #E8C97A;
  --gold-dim: #8B6E2F;
  --bg: #0A0A0B;
  --bg2: #111113;
  --bg3: #18181C;
  --bg4: #222228;
  --border: rgba(201,168,76,0.15);
  --border2: rgba(201,168,76,0.08);
  --text: #F0EEE8;
  --text2: #9B9890;
  --text3: #5C5A55;
  --green: #2ECC8A;
  --green-bg: rgba(46,204,138,0.1);
  --red: #E05252;
  --red-bg: rgba(224,82,82,0.1);
  --blue: #5B8FE8;
  --blue-bg: rgba(91,143,232,0.1);
  --amber: #E8A93C;
  --amber-bg: rgba(232,169,60,0.1);
  --radius: 12px;
  --radius-sm: 8px;
  --radius-lg: 16px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Syne', sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  overflow-x: hidden;
}
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: var(--bg2); }
::-webkit-scrollbar-thumb { background: var(--gold-dim); border-radius: 2px; }
button { font-family: 'Syne', sans-serif; cursor: pointer; border: none; outline: none; }
input, select, textarea { font-family: 'Syne', sans-serif; outline: none; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
