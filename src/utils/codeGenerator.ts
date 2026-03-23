const templates: Record<string, (details: string) => string> = {
  counter: () => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Counter App</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); color: #fff; }
  .container { text-align: center; background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 48px 64px; }
  h1 { font-size: 1.2rem; text-transform: uppercase; letter-spacing: 3px; opacity: 0.7; margin-bottom: 24px; }
  .count { font-size: 6rem; font-weight: 800; margin: 16px 0; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .buttons { display: flex; gap: 16px; justify-content: center; margin-top: 24px; }
  button { padding: 14px 32px; font-size: 1.1rem; font-weight: 600; border: none; border-radius: 12px; cursor: pointer; transition: all 0.2s; }
  .btn-dec { background: rgba(255,255,255,0.1); color: #fff; }
  .btn-dec:hover { background: rgba(255,255,255,0.2); }
  .btn-inc { background: linear-gradient(135deg, #667eea, #764ba2); color: #fff; }
  .btn-inc:hover { opacity: 0.9; transform: translateY(-2px); }
  .btn-reset { background: transparent; color: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.2); }
  .btn-reset:hover { border-color: rgba(255,255,255,0.4); color: #fff; }
</style>
</head>
<body>
<div class="container">
  <h1>Counter</h1>
  <div class="count" id="count">0</div>
  <div class="buttons">
    <button class="btn-dec" onclick="update(-1)">− 1</button>
    <button class="btn-reset" onclick="reset()">Reset</button>
    <button class="btn-inc" onclick="update(1)">+ 1</button>
  </div>
</div>
<script>
  let count = 0;
  const el = document.getElementById('count');
  function update(n) { count += n; el.textContent = count; }
  function reset() { count = 0; el.textContent = 0; }
</script>
</body>
</html>`,

  todo: () => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Todo App</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; min-height: 100vh; background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); color: #fff; display: flex; align-items: flex-start; justify-content: center; padding-top: 80px; }
  .app { width: 420px; background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 32px; }
  h1 { font-size: 1.5rem; font-weight: 700; margin-bottom: 24px; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .input-row { display: flex; gap: 8px; margin-bottom: 24px; }
  input { flex: 1; padding: 12px 16px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; color: #fff; font-size: 0.95rem; outline: none; }
  input:focus { border-color: #667eea; }
  input::placeholder { color: rgba(255,255,255,0.3); }
  .add-btn { padding: 12px 20px; background: linear-gradient(135deg, #667eea, #764ba2); border: none; border-radius: 12px; color: #fff; font-weight: 600; cursor: pointer; }
  .add-btn:hover { opacity: 0.9; }
  .todo-list { list-style: none; }
  .todo-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: rgba(255,255,255,0.03); border-radius: 12px; margin-bottom: 8px; transition: all 0.2s; }
  .todo-item:hover { background: rgba(255,255,255,0.07); }
  .todo-item.done span { text-decoration: line-through; opacity: 0.4; }
  .todo-item input[type="checkbox"] { width: 20px; height: 20px; accent-color: #667eea; }
  .todo-item span { flex: 1; }
  .del-btn { background: none; border: none; color: rgba(255,255,255,0.3); cursor: pointer; font-size: 1.2rem; }
  .del-btn:hover { color: #ff6b6b; }
  .empty { text-align: center; padding: 32px; opacity: 0.3; }
</style>
</head>
<body>
<div class="app">
  <h1>📋 Todo List</h1>
  <div class="input-row">
    <input id="inp" placeholder="Add a new task..." onkeydown="if(event.key==='Enter')addTodo()" />
    <button class="add-btn" onclick="addTodo()">Add</button>
  </div>
  <ul class="todo-list" id="list"></ul>
  <div class="empty" id="empty">No tasks yet. Add one above!</div>
</div>
<script>
  let todos = [];
  function render() {
    const list = document.getElementById('list');
    const empty = document.getElementById('empty');
    list.innerHTML = '';
    empty.style.display = todos.length ? 'none' : 'block';
    todos.forEach((t, i) => {
      const li = document.createElement('li');
      li.className = 'todo-item' + (t.done ? ' done' : '');
      li.innerHTML = '<input type="checkbox" ' + (t.done ? 'checked' : '') + ' onchange="toggle(' + i + ')" /><span>' + t.text + '</span><button class="del-btn" onclick="del(' + i + ')">×</button>';
      list.appendChild(li);
    });
  }
  function addTodo() {
    const inp = document.getElementById('inp');
    const text = inp.value.trim();
    if (!text) return;
    todos.push({ text, done: false });
    inp.value = '';
    render();
  }
  function toggle(i) { todos[i].done = !todos[i].done; render(); }
  function del(i) { todos.splice(i, 1); render(); }
  render();
</script>
</body>
</html>`,

  calculator: () => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Calculator</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; min-height: 100vh; background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); display: flex; align-items: center; justify-content: center; }
  .calc { width: 320px; background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 24px; }
  .display { background: rgba(0,0,0,0.3); border-radius: 16px; padding: 24px; margin-bottom: 16px; text-align: right; min-height: 80px; display: flex; flex-direction: column; justify-content: flex-end; }
  .display .expr { color: rgba(255,255,255,0.4); font-size: 0.9rem; margin-bottom: 4px; min-height: 1.2em; }
  .display .value { color: #fff; font-size: 2.5rem; font-weight: 700; }
  .buttons { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
  button { padding: 18px; font-size: 1.2rem; font-weight: 600; border: none; border-radius: 12px; cursor: pointer; transition: all 0.15s; }
  .num { background: rgba(255,255,255,0.08); color: #fff; }
  .num:hover { background: rgba(255,255,255,0.15); }
  .op { background: rgba(102,126,234,0.3); color: #a5b4fc; }
  .op:hover { background: rgba(102,126,234,0.5); }
  .eq { background: linear-gradient(135deg, #667eea, #764ba2); color: #fff; }
  .eq:hover { opacity: 0.9; }
  .clear { background: rgba(255,107,107,0.2); color: #ff6b6b; }
  .clear:hover { background: rgba(255,107,107,0.3); }
</style>
</head>
<body>
<div class="calc">
  <div class="display"><div class="expr" id="expr"></div><div class="value" id="val">0</div></div>
  <div class="buttons">
    <button class="clear" onclick="cl()">C</button>
    <button class="op" onclick="inp('(')">(</button>
    <button class="op" onclick="inp(')')">)</button>
    <button class="op" onclick="inp('/')">÷</button>
    <button class="num" onclick="inp('7')">7</button>
    <button class="num" onclick="inp('8')">8</button>
    <button class="num" onclick="inp('9')">9</button>
    <button class="op" onclick="inp('*')">×</button>
    <button class="num" onclick="inp('4')">4</button>
    <button class="num" onclick="inp('5')">5</button>
    <button class="num" onclick="inp('6')">6</button>
    <button class="op" onclick="inp('-')">−</button>
    <button class="num" onclick="inp('1')">1</button>
    <button class="num" onclick="inp('2')">2</button>
    <button class="num" onclick="inp('3')">3</button>
    <button class="op" onclick="inp('+')">+</button>
    <button class="num" onclick="inp('0')" style="grid-column:span 2">0</button>
    <button class="num" onclick="inp('.')">.</button>
    <button class="eq" onclick="calc()">=</button>
  </div>
</div>
<script>
  let expression = '';
  function inp(v) { expression += v; document.getElementById('expr').textContent = expression; }
  function cl() { expression = ''; document.getElementById('expr').textContent = ''; document.getElementById('val').textContent = '0'; }
  function calc() {
    try { const r = Function('"use strict"; return (' + expression + ')')(); document.getElementById('val').textContent = Number.isFinite(r) ? parseFloat(r.toFixed(8)) : 'Error'; }
    catch { document.getElementById('val').textContent = 'Error'; }
  }
</script>
</body>
</html>`,

  weather: () => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Weather App</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; min-height: 100vh; background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); display: flex; align-items: center; justify-content: center; color: #fff; }
  .app { width: 380px; background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 32px; text-align: center; }
  .icon { font-size: 5rem; margin: 16px 0; }
  .temp { font-size: 4rem; font-weight: 800; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .city { font-size: 1.5rem; margin: 8px 0; opacity: 0.8; }
  .desc { opacity: 0.5; text-transform: capitalize; margin-bottom: 24px; }
  .details { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
  .detail { background: rgba(255,255,255,0.05); border-radius: 12px; padding: 16px 8px; }
  .detail .label { font-size: 0.75rem; opacity: 0.4; text-transform: uppercase; letter-spacing: 1px; }
  .detail .value { font-size: 1.2rem; font-weight: 700; margin-top: 4px; }
  .search-row { display: flex; gap: 8px; margin-bottom: 24px; }
  .search-row input { flex: 1; padding: 12px 16px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; color: #fff; font-size: 0.95rem; outline: none; }
  .search-row input::placeholder { color: rgba(255,255,255,0.3); }
  .search-row button { padding: 12px 20px; background: linear-gradient(135deg, #667eea, #764ba2); border: none; border-radius: 12px; color: #fff; font-weight: 600; cursor: pointer; }
</style>
</head>
<body>
<div class="app">
  <div class="search-row">
    <input id="cityInp" placeholder="Enter city name..." value="Seoul" onkeydown="if(event.key==='Enter')search()" />
    <button onclick="search()">Search</button>
  </div>
  <div class="icon" id="icon">☀️</div>
  <div class="temp" id="temp">22°C</div>
  <div class="city" id="city">Seoul</div>
  <div class="desc" id="desc">Sunny with light clouds</div>
  <div class="details">
    <div class="detail"><div class="label">Humidity</div><div class="value" id="hum">45%</div></div>
    <div class="detail"><div class="label">Wind</div><div class="value" id="wind">12 km/h</div></div>
    <div class="detail"><div class="label">Feels like</div><div class="value" id="feels">20°C</div></div>
  </div>
</div>
<script>
  const data = {
    seoul: { icon: '☀️', temp: 22, desc: 'Sunny with light clouds', hum: 45, wind: 12, feels: 20 },
    tokyo: { icon: '⛅', temp: 18, desc: 'Partly cloudy', hum: 60, wind: 15, feels: 16 },
    'new york': { icon: '🌧️', temp: 8, desc: 'Light rain', hum: 78, wind: 22, feels: 5 },
    london: { icon: '🌫️', temp: 10, desc: 'Foggy', hum: 85, wind: 8, feels: 8 },
    paris: { icon: '⛅', temp: 14, desc: 'Overcast', hum: 55, wind: 18, feels: 12 },
    sydney: { icon: '☀️', temp: 28, desc: 'Clear sky', hum: 35, wind: 10, feels: 30 },
  };
  function search() {
    const city = document.getElementById('cityInp').value.trim().toLowerCase();
    const d = data[city] || { icon: '🌤️', temp: Math.floor(Math.random()*30)+5, desc: 'Fair weather', hum: Math.floor(Math.random()*50)+30, wind: Math.floor(Math.random()*25)+5, feels: Math.floor(Math.random()*28)+3 };
    document.getElementById('icon').textContent = d.icon;
    document.getElementById('temp').textContent = d.temp + '°C';
    document.getElementById('city').textContent = document.getElementById('cityInp').value.trim();
    document.getElementById('desc').textContent = d.desc;
    document.getElementById('hum').textContent = d.hum + '%';
    document.getElementById('wind').textContent = d.wind + ' km/h';
    document.getElementById('feels').textContent = d.feels + '°C';
  }
</script>
</body>
</html>`,

  timer: () => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Timer App</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; min-height: 100vh; background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); display: flex; align-items: center; justify-content: center; color: #fff; }
  .app { text-align: center; background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 48px 64px; }
  h1 { font-size: 1rem; text-transform: uppercase; letter-spacing: 3px; opacity: 0.5; margin-bottom: 32px; }
  .time { font-size: 5rem; font-weight: 800; font-variant-numeric: tabular-nums; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 32px; }
  .buttons { display: flex; gap: 12px; justify-content: center; }
  button { padding: 14px 28px; font-size: 1rem; font-weight: 600; border: none; border-radius: 12px; cursor: pointer; transition: all 0.2s; }
  .start { background: linear-gradient(135deg, #667eea, #764ba2); color: #fff; }
  .pause { background: rgba(255,165,0,0.3); color: #ffa500; }
  .reset { background: rgba(255,255,255,0.1); color: #fff; }
  .lap { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.6); }
  .laps { margin-top: 24px; max-height: 150px; overflow-y: auto; }
  .laps div { padding: 8px; opacity: 0.5; font-variant-numeric: tabular-nums; border-bottom: 1px solid rgba(255,255,255,0.05); }
</style>
</head>
<body>
<div class="app">
  <h1>Stopwatch</h1>
  <div class="time" id="display">00:00.00</div>
  <div class="buttons">
    <button class="start" id="startBtn" onclick="startStop()">Start</button>
    <button class="lap" onclick="lap()">Lap</button>
    <button class="reset" onclick="reset()">Reset</button>
  </div>
  <div class="laps" id="laps"></div>
</div>
<script>
  let ms = 0, interval = null, running = false, lapCount = 0;
  function fmt(t) { const m = Math.floor(t/60000); const s = Math.floor((t%60000)/1000); const c = Math.floor((t%1000)/10); return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')+'.'+String(c).padStart(2,'0'); }
  function startStop() {
    const btn = document.getElementById('startBtn');
    if (running) { clearInterval(interval); btn.textContent = 'Start'; btn.className = 'start'; }
    else { interval = setInterval(() => { ms += 10; document.getElementById('display').textContent = fmt(ms); }, 10); btn.textContent = 'Pause'; btn.className = 'pause'; }
    running = !running;
  }
  function reset() { clearInterval(interval); ms = 0; running = false; lapCount = 0; document.getElementById('display').textContent = '00:00.00'; document.getElementById('startBtn').textContent = 'Start'; document.getElementById('startBtn').className = 'start'; document.getElementById('laps').innerHTML = ''; }
  function lap() { if (running) { lapCount++; const d = document.createElement('div'); d.textContent = 'Lap ' + lapCount + ': ' + fmt(ms); document.getElementById('laps').prepend(d); } }
</script>
</body>
</html>`,

  landing: () => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Landing Page</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); color: #fff; }
  nav { display: flex; justify-content: space-between; align-items: center; padding: 24px 48px; }
  nav .logo { font-size: 1.4rem; font-weight: 800; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  nav .links { display: flex; gap: 32px; }
  nav a { color: rgba(255,255,255,0.6); text-decoration: none; font-weight: 500; }
  nav a:hover { color: #fff; }
  .hero { text-align: center; padding: 120px 48px 80px; }
  .hero h1 { font-size: 3.5rem; font-weight: 800; line-height: 1.1; max-width: 700px; margin: 0 auto 24px; }
  .hero h1 span { background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .hero p { font-size: 1.2rem; opacity: 0.6; max-width: 500px; margin: 0 auto 40px; }
  .hero button { padding: 16px 40px; font-size: 1.1rem; font-weight: 700; border: none; border-radius: 12px; background: linear-gradient(135deg, #667eea, #764ba2); color: #fff; cursor: pointer; }
  .features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding: 40px 48px 80px; max-width: 1000px; margin: 0 auto; }
  .feat { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 32px; }
  .feat .icon { font-size: 2rem; margin-bottom: 12px; }
  .feat h3 { font-size: 1.1rem; margin-bottom: 8px; }
  .feat p { font-size: 0.9rem; opacity: 0.5; line-height: 1.5; }
</style>
</head>
<body>
<nav><div class="logo">AppName</div><div class="links"><a href="#">Features</a><a href="#">Pricing</a><a href="#">About</a></div></nav>
<section class="hero">
  <h1>Build Something <span>Amazing</span> Today</h1>
  <p>The fastest way to go from idea to production. Simple, powerful, and beautiful.</p>
  <button>Get Started Free</button>
</section>
<section class="features">
  <div class="feat"><div class="icon">⚡</div><h3>Lightning Fast</h3><p>Optimized for speed and performance from the ground up.</p></div>
  <div class="feat"><div class="icon">🔒</div><h3>Secure by Default</h3><p>Enterprise-grade security built into every layer.</p></div>
  <div class="feat"><div class="icon">🎨</div><h3>Beautiful Design</h3><p>Stunning interfaces that your users will love.</p></div>
</section>
</body>
</html>`,
};

function detectTemplate(prompt: string): string {
  const p = prompt.toLowerCase();
  if (/counter|카운터|숫자\s*세기|증가|감소/.test(p)) return 'counter';
  if (/todo|할\s*일|투두|task\s*list|체크리스트/.test(p)) return 'todo';
  if (/calc|계산기|사칙연산/.test(p)) return 'calculator';
  if (/weather|날씨|기상|온도/.test(p)) return 'weather';
  if (/timer|타이머|stopwatch|스톱워치|시간\s*측정/.test(p)) return 'timer';
  if (/landing|랜딩|홈페이지|소개\s*페이지/.test(p)) return 'landing';
  return '';
}

function generateGenericApp(prompt: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Generated App</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; min-height: 100vh; background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); display: flex; align-items: center; justify-content: center; color: #fff; }
  .app { width: 480px; background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 40px; text-align: center; }
  h1 { font-size: 1.8rem; font-weight: 700; margin-bottom: 12px; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  p { opacity: 0.6; line-height: 1.6; margin-bottom: 24px; }
  .card { background: rgba(255,255,255,0.05); border-radius: 16px; padding: 24px; margin-bottom: 16px; text-align: left; }
  .card h3 { font-size: 1rem; margin-bottom: 8px; }
  .card p { font-size: 0.9rem; margin: 0; }
  button { padding: 14px 32px; font-size: 1rem; font-weight: 600; border: none; border-radius: 12px; background: linear-gradient(135deg, #667eea, #764ba2); color: #fff; cursor: pointer; transition: all 0.2s; }
  button:hover { opacity: 0.9; transform: translateY(-2px); }
</style>
</head>
<body>
<div class="app">
  <h1>✨ Your App</h1>
  <p>${prompt.slice(0, 100)}</p>
  <div class="card"><h3>🎯 Feature 1</h3><p>Core functionality based on your description.</p></div>
  <div class="card"><h3>⚡ Feature 2</h3><p>Enhanced with modern design patterns.</p></div>
  <div class="card"><h3>🔧 Feature 3</h3><p>Fully responsive and accessible.</p></div>
  <button onclick="alert('Hello from your generated app!')">Try It</button>
</div>
</body>
</html>`;
}

export function generateCode(prompt: string): string {
  const template = detectTemplate(prompt);
  if (template && templates[template]) {
    return templates[template](prompt);
  }
  return generateGenericApp(prompt);
}

export function generateAssistantResponse(prompt: string): string {
  const template = detectTemplate(prompt);
  const responses: Record<string, string> = {
    counter: "카운터 앱을 만들었습니다! +1, -1 버튼으로 숫자를 조절하고 리셋할 수 있어요. 오른쪽 미리보기에서 확인해보세요.",
    todo: "할 일 관리 앱을 만들었습니다! 새로운 할 일을 추가하고, 체크하고, 삭제할 수 있어요. 오른쪽에서 확인해보세요.",
    calculator: "계산기 앱을 만들었습니다! 사칙연산과 괄호를 지원하는 깔끔한 계산기에요. 오른쪽에서 직접 사용해보세요.",
    weather: "날씨 앱을 만들었습니다! 도시 이름을 입력하면 날씨 정보를 확인할 수 있어요. (데모 데이터) 오른쪽에서 확인해보세요.",
    timer: "스톱워치 앱을 만들었습니다! 시작, 일시정지, 랩 기록 기능이 있어요. 오른쪽에서 사용해보세요.",
    landing: "랜딩 페이지를 만들었습니다! 네비게이션, 히어로 섹션, 기능 소개가 포함된 모던한 페이지에요. 오른쪽에서 확인해보세요.",
  };
  if (template && responses[template]) {
    return responses[template];
  }
  return `요청하신 앱을 만들었습니다! 오른쪽 미리보기에서 결과를 확인해보세요. 추가로 수정하고 싶은 부분이 있으면 말씀해주세요.`;
}
