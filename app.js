/* ============================================================
   Portfolio app — rendering, navigation, terminal, snake game
   ============================================================ */

(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );

  /* ==========================================================
     RENDER — everything comes from data.js
     ========================================================== */

  function renderHero() {
    const p = DATA.profile;
    $("#hero-name").innerHTML =
      esc(p.name).replace(/^(\S+)/, '<span class="accent">$1</span>');
    $("#hero-role").textContent = `"${p.role}"`;
    $("#hero-tagline").textContent = `// ${p.tagline}`;
    $("#about-body").innerHTML = p.about.map((t) => `<p>${esc(t)}</p>`).join("");
    $("#icon-github").href = p.links.github;
    $("#icon-linkedin").href = p.links.linkedin;
  }

  function renderSkills() {
    $("#skills-body").innerHTML = Object.entries(DATA.skills)
      .map(
        ([group, items]) => `
        <div class="skill-group">
          <div class="skill-group-title">${esc(group)}</div>
          <div class="chip-row">${items.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>
        </div>`
      )
      .join("");
  }

  function renderExperience() {
    $("#experience-body").innerHTML = DATA.experience
      .map(
        (e) => `
        <div class="timeline-item">
          <div class="timeline-role">${esc(e.role)} <span class="timeline-company">@ ${esc(e.company)}</span></div>
          <div class="timeline-period">${esc(e.period)}</div>
          <ul class="timeline-points">${e.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>
        </div>`
      )
      .join("");
  }

  function renderProjects() {
    $("#projects-body").innerHTML = DATA.projects
      .map(
        (p) => `
        <article class="card">
          <div class="card-head">
            <span class="card-name">${esc(p.name)}</span>
            <span class="card-status ${esc(p.status)}">${esc(p.status)}</span>
          </div>
          <p class="card-desc">${esc(p.description)}</p>
          <div class="card-stack">${p.stack.map((s) => `<span class="stack-tag">${esc(s)}</span>`).join("")}</div>
          <div class="card-links">
            ${p.github ? `<a href="${esc(p.github)}" target="_blank" rel="noopener">→ source</a>` : ""}
            ${p.demo ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener">→ live demo</a>` : ""}
          </div>
        </article>`
      )
      .join("");
  }

  function renderUpdates() {
    $("#updates-body").innerHTML = DATA.updates
      .map(
        (u) => `
        <article class="update-entry">
          <div class="update-meta">
            <span class="update-date">[${esc(u.date)}]</span>
            <span class="update-tag">${esc(u.tag)}</span>
          </div>
          <div class="update-title">${esc(u.title)}</div>
          <p class="update-note">${esc(u.note)}</p>
          ${u.link ? `<a class="update-link" href="${esc(u.link)}" target="_blank" rel="noopener">→ read more</a>` : ""}
        </article>`
      )
      .join("");
  }

  function renderLearning() {
    const learning = DATA.learning.filter((l) => l.type === "learning");
    const articles = DATA.learning.filter((l) => l.type === "article");

    $("#learning-body").innerHTML = learning
      .map(
        (l) => `
        <div class="learn-card">
          <div class="learn-title">${l.link ? `<a href="${esc(l.link)}" target="_blank" rel="noopener">${esc(l.title)}</a>` : esc(l.title)}</div>
          <p class="learn-note">${esc(l.note)}</p>
          <div class="progress-track"><div class="progress-fill" style="width:0" data-progress="${Number(l.progress) || 0}"></div></div>
          <div class="progress-label">${Number(l.progress) || 0}% complete</div>
        </div>`
      )
      .join("");

    $("#articles-body").innerHTML = articles
      .map(
        (a) => `
        <div class="learn-card">
          <div class="learn-title">${a.link ? `<a href="${esc(a.link)}" target="_blank" rel="noopener">${esc(a.title)}</a>` : esc(a.title)}</div>
          <p class="learn-note">${esc(a.note)}</p>
          <div class="learn-date">📝 ${esc(a.date || "")}</div>
        </div>`
      )
      .join("");
  }

  function renderContact() {
    const p = DATA.profile;
    $("#contact-pre").innerHTML =
      `<span class="t-dim">#!/bin/bash</span>\n` +
      `<span class="t-dim"># reach out — I reply.</span>\n\n` +
      `$ echo $EMAIL\n<span class="out">${esc(p.email)}</span>\n\n` +
      `$ echo $LOCATION\n<span class="out">${esc(p.location)}</span>\n\n` +
      `$ ./status\n<span class="out">open to interesting opportunities ✓</span>`;

    $("#contact-links").innerHTML =
      `<a class="btn btn-primary" href="mailto:${esc(p.email)}">send email()</a>` +
      `<a class="btn btn-ghost" href="${esc(p.links.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a>` +
      `<a class="btn btn-ghost" href="${esc(p.links.github)}" target="_blank" rel="noopener">GitHub ↗</a>`;

    $("#footer-year").textContent = `© ${new Date().getFullYear()} ${p.name}`;
  }

  /* ==========================================================
     HERO TYPING ANIMATION
     ========================================================== */

  function typeHero() {
    const el = $("#hero-typed");
    const text = `$ whoami && cat tagline.txt`;
    let i = 0;
    (function tick() {
      if (i <= text.length) {
        el.innerHTML = esc(text.slice(0, i)) + '<span class="cursor">▍</span>';
        i++;
        setTimeout(tick, 40 + Math.random() * 40);
      }
    })();
  }

  /* ==========================================================
     NAVIGATION — sidebar files, tabs, scroll spy
     ========================================================== */

  const SECTION_FILES = {
    about: { label: "about.md", icon: "md", iconTxt: "M↓" },
    skills: { label: "skills.yml", icon: "yml", iconTxt: "≡" },
    experience: { label: "experience.ts", icon: "ts", iconTxt: "TS" },
    projects: { label: "projects.json", icon: "json", iconTxt: "{}" },
    updates: { label: "industry-updates.log", icon: "log", iconTxt: "✦" },
    learning: { label: "learning.md", icon: "md", iconTxt: "M↓" },
    contact: { label: "contact.sh", icon: "sh", iconTxt: "$" },
  };

  const openTabs = ["about"];

  function setActiveSection(id) {
    const f = SECTION_FILES[id];
    if (!f) return;

    if (!openTabs.includes(id)) openTabs.push(id);
    $("#tabbar").innerHTML = openTabs
      .map((t) => {
        const tf = SECTION_FILES[t];
        return `<div class="tab ${t === id ? "active" : ""}" data-section="${t}">
          <span class="fi ${tf.icon}">${tf.iconTxt}</span> ${tf.label}
          ${t === id ? '<span class="tab-dot">●</span>' : ""}
        </div>`;
      })
      .join("");

    $$(".file-item").forEach((el) =>
      el.classList.toggle("active", el.dataset.section === id)
    );
    $("#breadcrumbs").innerHTML = `portfolio <span class="crumb-sep">›</span> ${f.label}`;
    $("#status-section").textContent = f.label;
  }

  function goTo(id) {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  }

  document.addEventListener("click", (e) => {
    const nav = e.target.closest("[data-section], [data-goto]");
    if (!nav) return;
    const id = nav.dataset.section || nav.dataset.goto;
    if (nav.tagName === "A") e.preventDefault();
    goTo(id);
  });

  // Scroll spy
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) setActiveSection(en.target.id);
      });
    },
    { root: $("#editor-scroll"), rootMargin: "-40% 0px -55% 0px" }
  );

  // Reveal + progress bars on scroll
  const reveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("revealed");
        en.target.querySelectorAll(".progress-fill").forEach((bar) => {
          bar.style.width = bar.dataset.progress + "%";
        });
        reveal.unobserve(en.target);
      });
    },
    { root: $("#editor-scroll"), threshold: 0.15 }
  );

  /* ==========================================================
     SIDEBAR / TERMINAL TOGGLES
     ========================================================== */

  $('[data-action="toggle-sidebar"]').addEventListener("click", () =>
    $("#sidebar").classList.toggle("hidden-panel")
  );

  function toggleTerminal(forceOpen) {
    const t = $("#terminal");
    const collapsed = t.classList.contains("collapsed");
    if (forceOpen === true || collapsed) {
      t.classList.remove("collapsed");
      setTimeout(() => $("#terminal-input").focus(), 220);
    } else {
      t.classList.add("collapsed");
      stopSnake();
    }
  }
  $('[data-action="toggle-terminal"]').addEventListener("click", () => toggleTerminal());
  $("#terminal-close").addEventListener("click", () => toggleTerminal());

  document.addEventListener("keydown", (e) => {
    if (e.key === "`" && document.activeElement !== $("#terminal-input")) {
      e.preventDefault();
      toggleTerminal();
    }
  });

  /* ==========================================================
     TERMINAL
     ========================================================== */

  const termOut = $("#terminal-output");
  const termIn = $("#terminal-input");
  const history = [];
  let histIdx = -1;

  function print(html, cls = "") {
    const div = document.createElement("div");
    if (cls) div.className = cls;
    div.innerHTML = html;
    termOut.appendChild(div);
    $("#terminal-body").scrollTop = $("#terminal-body").scrollHeight;
  }

  const COMMANDS = {
    help() {
      print(
        `<span class="t-info">available commands:</span>\n` +
          `  <span class="t-ok">about</span>      — who am I\n` +
          `  <span class="t-ok">skills</span>     — tech I work with\n` +
          `  <span class="t-ok">projects</span>   — things I've built\n` +
          `  <span class="t-ok">updates</span>    — latest industry notes\n` +
          `  <span class="t-ok">contact</span>    — how to reach me\n` +
          `  <span class="t-ok">open &lt;section&gt;</span> — jump to a section\n` +
          `  <span class="t-ok">snake</span>      — play snake 🐍 (arrows/WASD, q to quit)\n` +
          `  <span class="t-ok">clear</span>      — clear terminal\n` +
          `  <span class="t-ok">exit</span>       — close terminal`
      );
    },
    about() {
      const p = DATA.profile;
      print(`<span class="t-ok">${esc(p.name)}</span> — ${esc(p.role)}\n${esc(p.tagline)}`);
    },
    skills() {
      Object.entries(DATA.skills).forEach(([g, items]) =>
        print(`<span class="t-info">${esc(g)}:</span> ${items.map(esc).join(", ")}`)
      );
    },
    projects() {
      DATA.projects.forEach((p) =>
        print(`<span class="t-warn">${esc(p.name)}</span> — ${esc(p.description.slice(0, 90))}…`)
      );
      print(`<span class="t-dim">run \`open projects\` to see full cards</span>`);
    },
    updates() {
      DATA.updates.slice(0, 3).forEach((u) =>
        print(`<span class="t-dim">[${esc(u.date)}]</span> <span class="t-warn">${esc(u.tag)}</span> ${esc(u.title)}`)
      );
    },
    contact() {
      const p = DATA.profile;
      print(
        `email:    <a href="mailto:${esc(p.email)}">${esc(p.email)}</a>\n` +
          `linkedin: <a href="${esc(p.links.linkedin)}" target="_blank" rel="noopener">${esc(p.links.linkedin)}</a>`
      );
    },
    open(arg) {
      if (SECTION_FILES[arg]) {
        goTo(arg);
        print(`<span class="t-ok">✓ opened ${esc(SECTION_FILES[arg].label)}</span>`);
      } else {
        print(`<span class="t-err">unknown section: ${esc(arg || "")}. try: ${Object.keys(SECTION_FILES).join(", ")}</span>`);
      }
    },
    snake() {
      startSnake();
    },
    clear() {
      termOut.innerHTML = "";
    },
    exit() {
      toggleTerminal();
    },
    whoami() {
      print(`<span class="t-ok">${esc(DATA.profile.handle)}</span>`);
    },
    ls() {
      print(Object.values(SECTION_FILES).map((f) => f.label).join("  "));
    },
    sudo() {
      print(`<span class="t-err">nice try. permission denied 😄</span>`);
    },
  };

  function runCommand(raw) {
    const line = raw.trim();
    print(`<span class="prompt">navdeep@portfolio <span class="prompt-dir">~</span> $</span> <span class="t-cmd">${esc(line)}</span>`);
    if (!line) return;
    history.unshift(line);
    histIdx = -1;

    const [cmd, ...args] = line.split(/\s+/);
    const fn = COMMANDS[cmd.toLowerCase()];
    if (fn) fn(args.join(" ").toLowerCase());
    else print(`<span class="t-err">command not found: ${esc(cmd)}</span> <span class="t-dim">— try \`help\`</span>`);
  }

  termIn.addEventListener("keydown", (e) => {
    if (snakeState.running) return; // snake owns the keys
    if (e.key === "Enter") {
      runCommand(termIn.value);
      termIn.value = "";
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIdx < history.length - 1) termIn.value = history[++histIdx] || "";
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      histIdx = Math.max(-1, histIdx - 1);
      termIn.value = histIdx === -1 ? "" : history[histIdx];
    }
  });

  /* ==========================================================
     SNAKE 🐍
     ========================================================== */

  const canvas = $("#snake-canvas");
  const ctx = canvas.getContext("2d");
  const CELL = 20;
  const COLS = canvas.width / CELL;
  const ROWS = canvas.height / CELL;

  const snakeState = { running: false, timer: null };

  function startSnake() {
    if (snakeState.running) return;
    print(`<span class="t-ok">🐍 snake started — arrows/WASD to move, q to quit</span>`);
    canvas.classList.remove("hidden");
    $("#terminal-input-row").style.display = "none";
    Object.assign(snakeState, {
      running: true,
      snake: [{ x: 8, y: 7 }, { x: 7, y: 7 }, { x: 6, y: 7 }],
      dir: { x: 1, y: 0 },
      nextDir: { x: 1, y: 0 },
      food: null,
      score: 0,
      speed: 120,
    });
    placeFood();
    snakeState.timer = setInterval(snakeTick, snakeState.speed);
    document.addEventListener("keydown", snakeKeys);
    $("#terminal-body").scrollTop = $("#terminal-body").scrollHeight;
  }

  function stopSnake(died) {
    if (!snakeState.running) return;
    clearInterval(snakeState.timer);
    snakeState.running = false;
    document.removeEventListener("keydown", snakeKeys);
    canvas.classList.add("hidden");
    $("#terminal-input-row").style.display = "flex";
    print(
      died
        ? `<span class="t-err">game over!</span> final score: <span class="t-warn">${snakeState.score}</span> — type \`snake\` to retry`
        : `<span class="t-dim">snake exited. score: ${snakeState.score}</span>`
    );
    termIn.focus();
  }

  function placeFood() {
    let f;
    do {
      f = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    } while (snakeState.snake.some((s) => s.x === f.x && s.y === f.y));
    snakeState.food = f;
  }

  function snakeKeys(e) {
    const k = e.key.toLowerCase();
    const d = snakeState.dir;
    const map = {
      arrowup: { x: 0, y: -1 }, w: { x: 0, y: -1 },
      arrowdown: { x: 0, y: 1 }, s: { x: 0, y: 1 },
      arrowleft: { x: -1, y: 0 }, a: { x: -1, y: 0 },
      arrowright: { x: 1, y: 0 }, d: { x: 1, y: 0 },
    };
    if (k === "q" || k === "escape") { stopSnake(false); return; }
    const nd = map[k];
    if (!nd) return;
    e.preventDefault();
    if (nd.x !== -d.x || nd.y !== -d.y) snakeState.nextDir = nd; // no reversing
  }

  function snakeTick() {
    const st = snakeState;
    st.dir = st.nextDir;
    const head = { x: st.snake[0].x + st.dir.x, y: st.snake[0].y + st.dir.y };

    // collisions: walls & self
    if (
      head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS ||
      st.snake.some((s) => s.x === head.x && s.y === head.y)
    ) {
      stopSnake(true);
      return;
    }

    st.snake.unshift(head);
    if (head.x === st.food.x && head.y === st.food.y) {
      st.score += 10;
      placeFood();
      if (st.speed > 60) {
        st.speed -= 3;
        clearInterval(st.timer);
        st.timer = setInterval(snakeTick, st.speed);
      }
    } else {
      st.snake.pop();
    }

    // draw
    ctx.fillStyle = "#16181d";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // food
    ctx.fillStyle = "#e06c75";
    ctx.beginPath();
    ctx.arc(st.food.x * CELL + CELL / 2, st.food.y * CELL + CELL / 2, CELL / 2.6, 0, Math.PI * 2);
    ctx.fill();

    // snake
    st.snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? "#98c379" : "#61afef";
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
    });

    // score
    ctx.fillStyle = "#5c6370";
    ctx.font = "12px JetBrains Mono, monospace";
    ctx.fillText(`score: ${st.score}`, 8, 16);
  }

  /* ==========================================================
     STATUS BAR CLOCK
     ========================================================== */

  function tickClock() {
    $("#status-clock").textContent = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  /* ==========================================================
     INIT
     ========================================================== */

  renderHero();
  renderSkills();
  renderExperience();
  renderProjects();
  renderUpdates();
  renderLearning();
  renderContact();
  typeHero();
  tickClock();
  setInterval(tickClock, 30000);

  $$(".doc").forEach((doc) => {
    spy.observe(doc);
    reveal.observe(doc);
  });

  // Welcome message in terminal
  print(`<span class="t-info">welcome to navdeep's portfolio terminal.</span>`);
  print(`<span class="t-dim">type \`help\` to see available commands, or \`snake\` to play 🐍</span>`);

  // Handle direct hash links (e.g. site.com/#projects)
  if (location.hash) {
    const id = location.hash.slice(1);
    if (SECTION_FILES[id]) setTimeout(() => goTo(id), 100);
  }
})();
