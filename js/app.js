/* =========================================================
   EcoGuardiões — Núcleo do Aplicativo (app.js)
   Gerencia: estado/persistência, App Dashboard dinâmico,
   Bottom Sheets interativos, Segmented Controls, Steppers,
   acessibilidade (voz/fonte/som), calculadora e conquistas.
   ========================================================= */
(function () {
  'use strict';

  const D = window.ECO_DATA;
  const I = window.EcoIcons;
  const KEY = 'ecoguardioes:v1';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  /* ---------------- ESTADO E PERSISTÊNCIA ---------------- */
  const defaults = () => ({
    mode: null, fontScale: 1, sound: true, points: 0,
    lessons: {}, best: { sort: 0, detective: 0, pipes: 0, quiz: 0 },
    habits: { date: '', done: [], awarded: [], allAwarded: false },
    greenDays: 0, badges: [], name: '', trailFilter: 'all'
  });

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      if (!saved) return defaults();
      const s = Object.assign(defaults(), saved);
      s.best = Object.assign(defaults().best, saved.best || {});
      s.habits = Object.assign(defaults().habits, saved.habits || {});
      return s;
    } catch (e) { return defaults(); }
  }
  let state = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

  /* ---------------- UTILITÁRIOS ---------------- */
  const isKids = () => state.mode === 'kids';
  const t = (v) => (v && typeof v === 'object') ? (v[isKids() ? 'kids' : 'normal'] ?? v.normal) : v;
  const fmt = (n, d = 0) => Number(n).toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });
  const money = (n) => Number(n).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const today = () => new Date().toISOString().slice(0, 10);
  const escapeHTML = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function shuffle(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  /* ---------------- HIDRATAÇÃO DE SVGs AUTORAIS ---------------- */
  function hydrateIcons(root = document) {
    $$('[data-icon]', root).forEach(el => { el.innerHTML = I.ui(el.dataset.icon); });
    $$('[data-mascot]', root).forEach(el => { el.innerHTML = I.mascot(el.dataset.mascot); });
    $$('[data-bin-preview]', root).forEach(el => {
      const b = D.bins[el.dataset.binPreview];
      if (b) el.innerHTML = I.bin(b.color, b.text, b.symbol);
    });
    $$('[data-obj-preview]', root).forEach(el => {
      el.innerHTML = I.sceneObj(el.dataset.objPreview, false);
    });
    const closeBtn = $('.modal-close', root);
    if (closeBtn && !closeBtn.innerHTML) closeBtn.innerHTML = I.ui('cross');
    const pipesPrev = $('#preview-pipes', root);
    if (pipesPrev && !pipesPrev.innerHTML) {
      pipesPrev.innerHTML = `<svg viewBox="0 0 180 68" width="160" height="60" aria-hidden="true">
        <rect x="6" y="14" width="40" height="40" rx="8" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
        <path d="M26 14 V34 H46" fill="none" stroke="#0284C7" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="54" y="14" width="40" height="40" rx="8" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
        <path d="M54 34 H94" fill="none" stroke="#0284C7" stroke-width="8" stroke-linecap="round"/>
        <rect x="102" y="14" width="40" height="40" rx="8" fill="#DCFCE7" stroke="#16A34A" stroke-width="2"/>
        <path d="M102 34 H122 V54" fill="none" stroke="#16A34A" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="158" cy="34" r="12" fill="#22C55E"/>
        <path d="M153 34 L157 38 L164 30" fill="none" stroke="#FFF" stroke-width="2.5" stroke-linecap="round"/>
      </svg>`;
    }
  }

  /* ---------------- FEEDBACK TÁTIL (VIBRATION API) & SONS ---------------- */
  function haptic(pattern = 15) {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(pattern); } catch (e) {}
    }
  }

  let actx = null;
  const SEQ = {
    ok: [[587, 0], [880, 0.09]],
    bad: [[260, 0], [210, 0.12]],
    win: [[523, 0], [659, 0.1], [784, 0.2], [1047, 0.32]],
    click: [[520, 0]]
  };
  function sfx(type) {
    haptic(type === 'win' ? [25, 40, 25] : type === 'bad' ? [40, 30, 40] : 15);
    if (!state.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const now = actx.currentTime;
      (SEQ[type] || []).forEach(([f, dt]) => {
        const o = actx.createOscillator(), g = actx.createGain();
        o.type = isKids() ? 'triangle' : 'sine';
        o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, now + dt);
        g.gain.exponentialRampToValueAtTime(isKids() ? 0.15 : 0.08, now + dt + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + dt + 0.18);
        o.connect(g).connect(actx.destination);
        o.start(now + dt); o.stop(now + dt + 0.2);
      });
    } catch (e) {}
  }

  /* ---------------- LEITURA EM VOZ ALTA (Web Speech API) ---------------- */
  const canSpeak = 'speechSynthesis' in window;
  let speakingBtn = null;
  function stopSpeaking() {
    if (canSpeak) speechSynthesis.cancel();
    if (speakingBtn) { speakingBtn.classList.remove('speaking'); speakingBtn = null; }
  }
  function speak(text, btn) {
    if (!canSpeak) { toast('Seu navegador não suporta leitura em voz alta.'); return; }
    if (speakingBtn && speakingBtn === btn) { stopSpeaking(); return; }
    stopSpeaking();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'pt-BR';
    u.rate = isKids() ? 1.0 : 0.92;
    u.pitch = isKids() ? 1.12 : 1.0;
    const voice = speechSynthesis.getVoices().find(v => v.lang && v.lang.toLowerCase().startsWith('pt'));
    if (voice) u.voice = voice;
    u.onend = u.onerror = () => { if (btn) btn.classList.remove('speaking'); if (speakingBtn === btn) speakingBtn = null; };
    if (btn) { btn.classList.add('speaking'); speakingBtn = btn; }
    speechSynthesis.speak(u);
  }
  function visibleText(area) {
    const nodes = $$('h1, h2, h3, p, li, legend, th, td', area)
      .filter(el => el.offsetParent !== null && !el.closest('button, [data-no-speak]'));
    return nodes.map(n => n.innerText.trim()).filter(Boolean).join('. ').replace(/\.\s*\./g, '.');
  }
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-speak]');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    if (btn.dataset.speakText) {
      speak(btn.dataset.speakText, btn);
      return;
    }
    const area = btn.closest('[data-speak-area]') || btn.parentElement;
    speak(visibleText(area), btn);
  });

  /* ---------------- PALCO INTERATIVO DOS MASCOTES (INFANTIL) ---------------- */
  let mascotTipIdx = 0;
  $$('[data-mascot-talk]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.mascotTalk;
      $$('[data-mascot-talk]').forEach(b => b.classList.toggle('active', b === btn));
      const pool = D.tips.filter(x => x.mascotKey === key);
      const item = pool[mascotTipIdx++ % pool.length] || D.tips[0];
      $('#mascot-speaker').textContent = item.name + ':';
      $('#mascot-phrase').textContent = item.kids;
      const bubble = $('#mascot-speech');
      bubble.classList.remove('pop'); void bubble.offsetWidth; bubble.classList.add('pop');
      sfx('click');
      if (canSpeak && state.sound) speak(`${item.name} diz: ${item.kids}`);
    });
  });

  /* ---------------- FEEDBACK VISUAL ---------------- */
  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    el.innerHTML = `${I.ui('star')} <span>${escapeHTML(msg)}</span>`;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
  }
  function confetti() {
    if (!isKids() || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = $('#confetti');
    const colors = ['#22C55E', '#0EA5E9', '#F59E0B', '#EC4899', '#A855F7'];
    for (let i = 0; i < 26; i++) {
      const s = document.createElement('span');
      s.className = 'confetti-bit';
      s.style.left = Math.random() * 100 + 'vw';
      s.style.background = colors[i % colors.length];
      s.style.animationDelay = Math.random() * 0.5 + 's';
      box.appendChild(s);
      setTimeout(() => s.remove(), 2800);
    }
  }
  function addPoints(n, msg) {
    if (n <= 0) return;
    state.points += n;
    save();
    updatePoints(true);
    toast(`+${n} pts • ${msg || ''}`);
    checkBadges();
  }
  function updatePoints(bump) {
    const el = $('#points');
    if (el) {
      el.textContent = fmt(state.points);
      if (bump) { el.parentElement.classList.remove('bump'); void el.offsetWidth; el.parentElement.classList.add('bump'); }
    }
    const streakEl = $('#streak-count');
    if (streakEl) streakEl.textContent = fmt(state.greenDays || 0);
  }

  /* ---------------- MEDALHAS ---------------- */
  const trailDone = (id) => D.trilhas.find(tr => tr.id === id).lessons.every(l => state.lessons[l.id]);
  const BADGES = [
    { id: 'agua',      ico: 'water',   name: { kids: 'Amigo da Gotinha',     normal: 'Guardião da Água' },      how: 'Concluir a trilha de Água',        test: () => trailDone('agua') },
    { id: 'energia',   ico: 'energy',  name: { kids: 'Parceiro da Centelha', normal: 'Guardião da Energia' },   how: 'Concluir a trilha de Energia',     test: () => trailDone('energia') },
    { id: 'lixo',      ico: 'leaf',    name: { kids: 'Turma da Folha',       normal: 'Guardião dos Resíduos' }, how: 'Concluir a trilha de Resíduos',    test: () => trailDone('lixo') },
    { id: 'sort',      ico: 'recycle', name: { kids: 'Mestre das Lixeiras',  normal: 'Especialista em Coleta' },how: '80% no Ecoponto Express',          test: () => state.best.sort >= 80 },
    { id: 'detective', ico: 'search',  name: { kids: 'Super Detetive',       normal: 'Inspetor da Casa' },      how: '100% no Detetive da Casa',         test: () => state.best.detective >= 100 },
    { id: 'quiz',      ico: 'quiz',    name: { kids: 'Mente Rápida',         normal: 'Decisão Sustentável' },   how: '75% nas Decisões ou Fluxo Limpo',  test: () => state.best.quiz >= 75 || state.best.pipes >= 100 },
    { id: 'habit',     ico: 'habits',  name: { kids: 'Dia 100% Verde',       normal: 'Rotina Sustentável' },    how: 'Completar todos os hábitos do dia', test: () => state.greenDays >= 1 },
    { id: 'super',     ico: 'trophy',  name: { kids: 'Lenda do Planeta',     normal: 'Embaixador Ambiental' },  how: 'Acumular 500 pontos',              test: () => state.points >= 500 }
  ];
  const CERT_MIN = 4;

  function checkBadges() {
    let gained = false;
    BADGES.forEach(b => {
      if (!state.badges.includes(b.id) && b.test()) {
        state.badges.push(b.id);
        gained = true;
        setTimeout(() => { toast(`Nova medalha: ${t(b.name)}!`); sfx('win'); confetti(); }, 800);
      }
    });
    if (gained) { save(); renderBadges(); renderCert(); renderHomeStats(); }
  }

  function renderBadges() {
    const cnt = $('#badges-count');
    if (cnt) cnt.textContent = `${state.badges.length}/${BADGES.length}`;
    $('#badges').innerHTML = BADGES.map(b => {
      const got = state.badges.includes(b.id);
      return `<li class="badge ${got ? 'got' : ''}">
        <div class="badge-icon" aria-hidden="true">${got ? I.ui(b.ico) : I.ui('lock')}</div>
        <span class="badge-name">${t(b.name)}</span>
        <span class="badge-how">${got ? '✓ Desbloqueada' : b.how}</span>
      </li>`;
    }).join('');
  }

  /* ---------------- CERTIFICADO ---------------- */
  function renderCert() {
    const area = $('#cert-area');
    const n = state.badges.length;
    if (n < CERT_MIN) {
      area.innerHTML = `<div class="cert-locked">
        <p>${isKids()
          ? `Ganhe <strong>${CERT_MIN} medalhas</strong> para liberar seu diploma! Você já tem <strong>${n}</strong>.`
          : `Conquiste <strong>${CERT_MIN} medalhas</strong> nas trilhas, jogos ou hábitos para emitir seu certificado nominal (${n}/${CERT_MIN} concluídas).`}</p>
        <div class="bar"><span style="width:${Math.min(100, n / CERT_MIN * 100)}%"></span></div>
      </div>`;
      return;
    }
    area.innerHTML = `
      <form class="cert-form" id="cert-form">
        <label>${isKids() ? 'Digite seu nome completo:' : 'Nome para emissão do certificado:'}
          <input type="text" id="cert-name" maxlength="60" placeholder="Ex.: Maria Silva" value="${escapeHTML(state.name)}" required autocomplete="name">
        </label>
        <button class="btn btn-primary" type="submit">Emitir certificado</button>
      </form>
      <div id="cert-preview"></div>`;
    $('#cert-form').addEventListener('submit', (e) => {
      e.preventDefault();
      state.name = $('#cert-name').value.trim();
      if (!state.name) return;
      save();
      showCertificate();
    });
    if (state.name) showCertificate();
  }

  function showCertificate() {
    const date = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    const badges = BADGES.filter(b => state.badges.includes(b.id));
    $('#cert-preview').innerHTML = `
      <div class="certificate" id="certificate">
        <div class="cert-inner">
          <p class="cert-top">Programa de Educação Socioambiental • EcoGuardiões</p>
          <h3>Certificado de Guardião do Planeta</h3>
          <p>Certificamos que</p>
          <p class="cert-name">${escapeHTML(state.name)}</p>
          <p class="cert-body">concluiu com êxito as atividades práticas de conservação hídrica, eficiência energética e gestão de resíduos, somando <strong>${badges.length} medalhas</strong> e <strong>${fmt(state.points)} pontos</strong>.</p>
          <div class="cert-badges">${badges.map(b => `<span class="cert-badge-chip" title="${t(b.name)}">${I.ui(b.ico)} ${t(b.name)}</span>`).join('')}</div>
          <p class="cert-date">Emitido em ${date}</p>
        </div>
      </div>
      <button class="btn btn-secondary" id="cert-print">${I.ui('print')} <span>Imprimir / Salvar em PDF</span></button>`;
    $('#cert-print').addEventListener('click', () => {
      document.body.classList.add('printing-cert');
      window.print();
      setTimeout(() => document.body.classList.remove('printing-cert'), 500);
    });
  }

  /* ---------------- DASHBOARD DO APLICATIVO (INÍCIO) ---------------- */
  function findNextUnfinishedLesson() {
    for (const tr of D.trilhas) {
      for (let i = 0; i < tr.lessons.length; i++) {
        const l = tr.lessons[i];
        if (!state.lessons[l.id]) return { trail: tr, lesson: l, index: i };
      }
    }
    return null;
  }

  function renderContinueBanner() {
    const banner = $('#continue-banner');
    if (!banner) return;
    const totalLessons = D.trilhas.reduce((a, tr) => a + tr.lessons.length, 0);
    const done = Object.keys(state.lessons).length;
    const pct = Math.round(done / totalLessons * 100);
    const nextItem = findNextUnfinishedLesson();

    const circ = 163.36; // 2 * PI * 26
    const ringOffset = circ - (circ * pct / 100);

    if (nextItem) {
      const { trail, lesson, index } = nextItem;
      const kicker = done === 0
        ? (isKids() ? 'Comece sua jornada' : 'Próximo passo recomendado')
        : (isKids() ? `Continue de onde parou • ${trail.category}` : `Continuar • ${trail.category} (${index + 1}/${trail.lessons.length})`);
      const title = t(lesson.title);
      const sub = isKids()
        ? 'Veja os cartões ilustrados ou abra os jogos!'
        : `Avance nos guias práticos ou pratique nos 4 jogos interativos.`;

      banner.innerHTML = `
        <div class="apb-left">
          <div class="apb-ring-wrap" title="${pct}% concluído">
            <svg class="activity-ring-svg" viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
              <circle class="aring-track" cx="32" cy="32" r="26" />
              <circle class="aring-fill" cx="32" cy="32" r="26" stroke-dasharray="${circ}" stroke-dashoffset="${ringOffset}" />
            </svg>
            <div class="apb-mascot">${I.mascot(trail.mascotKey)}</div>
            <span class="apb-ring-badge">${pct}%</span>
          </div>
          <div class="apb-info">
            <span class="apb-kicker">${kicker}</span>
            <h1 id="home-title" class="apb-title">${title}</h1>
            <p class="apb-sub">${sub}</p>
            <div class="apb-progress">
              <div class="bar"><span style="width:${pct}%"></span></div>
              <small>${done}/${totalLessons} (${pct}%)</small>
            </div>
          </div>
        </div>
        <div class="apb-actions">
          <button type="button" class="btn btn-app-cta" data-lesson="${lesson.id}">
            ${done === 0 ? (isKids() ? 'Começar' : 'Iniciar Guia') : 'Continuar'}
          </button>
          <button type="button" class="btn btn-app-speak" data-speak aria-label="Ouvir destaque">${I.ui('speaker')}</button>
        </div>`;
    } else {
      banner.innerHTML = `
        <div class="apb-left">
          <div class="apb-ring-wrap" title="100% concluído">
            <svg class="activity-ring-svg" viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
              <circle class="aring-track" cx="32" cy="32" r="26" />
              <circle class="aring-fill" cx="32" cy="32" r="26" stroke-dasharray="${circ}" stroke-dashoffset="0" />
            </svg>
            <div class="apb-mascot">${I.mascot('leaf')}</div>
            <span class="apb-ring-badge">100%</span>
          </div>
          <div class="apb-info">
            <span class="apb-kicker">Guias 100% Concluídos!</span>
            <h1 id="home-title" class="apb-title">${isKids() ? 'Você completou todos os cartões!' : 'Todos os módulos concluídos!'}</h1>
            <p class="apb-sub">${isKids() ? 'Agora bata seu recorde nos 4 jogos!' : 'Teste seus conhecimentos no nível Difícil dos 4 jogos.'}</p>
            <div class="apb-progress">
              <div class="bar"><span style="width:100%"></span></div>
              <small>${totalLessons}/${totalLessons} (100%)</small>
            </div>
          </div>
        </div>
        <div class="apb-actions">
          <a href="#jogos" class="btn btn-app-cta">Jogar Agora</a>
          <button type="button" class="btn btn-app-speak" data-speak aria-label="Ouvir destaque">${I.ui('speaker')}</button>
        </div>`;
    }
  }

  function renderTip() {
    const start = new Date(new Date().getFullYear(), 0, 0);
    const day = Math.floor((Date.now() - start) / 86400000);
    const tip = D.tips[day % D.tips.length];
    $('#tip-of-day').innerHTML = `
      <span class="tip-mascot">${I.mascot(tip.mascotKey)}</span>
      <div class="tip-content">
        <span class="tip-label">${isKids() ? `Dica rápida da ${tip.name}` : 'Dica do Dia'}</span>
        <p class="tip-text">${t(tip)}</p>
      </div>
      <button class="btn btn-ghost btn-sm" data-speak aria-label="Ouvir dica">${I.ui('speaker')}</button>`;
  }

  function renderHomeStats() {
    ensureToday();
    const totalLessons = D.trilhas.reduce((a, tr) => a + tr.lessons.length, 0);
    const done = Object.keys(state.lessons).length;
    const habitsToday = state.habits.done.length;
    const pendingHabits = Math.max(0, D.habits.length - habitsToday);

    // Atualiza badges dinâmicos na Bottom Tab Bar e nos App Tiles
    const navBadge = $('#nav-habit-badge');
    if (navBadge) {
      navBadge.hidden = pendingHabits === 0;
      navBadge.textContent = pendingHabits;
    }

    const bestAvg = Math.round(((state.best.sort || 0) + (state.best.detective || 0) + (state.best.pipes || 0) + (state.best.quiz || 0)) / 4);
    const tbGames = $('#tile-badge-games');
    if (tbGames) tbGames.textContent = bestAvg > 0 ? `Recorde ${bestAvg}%` : '4 jogos';
    const tbTrails = $('#tile-badge-trails');
    if (tbTrails) tbTrails.textContent = `${done}/${totalLessons}`;
    const tbHabits = $('#tile-badge-habits');
    if (tbHabits) tbHabits.textContent = `${habitsToday}/${D.habits.length} hoje`;

    renderContinueBanner();

    const cards = [
      { ico: 'star',   value: fmt(state.points),                        label: isKids() ? 'Estrelas' : 'Pontos' },
      { ico: 'trails', value: `${done}/${totalLessons}`,                label: isKids() ? 'Cartões' : 'Módulos' },
      { ico: 'trophy', value: `${state.badges.length}/${BADGES.length}`,label: 'Medalhas' },
      { ico: 'check',  value: `${habitsToday}/${D.habits.length}`,      label: isKids() ? 'Missões' : 'Hábitos hoje' }
    ];
    $('#home-stats').innerHTML = cards.map(c =>
      `<div class="stat">
        <span class="stat-icon">${I.ui(c.ico)}</span>
        <div>
          <strong>${c.value}</strong>
          <span>${c.label}</span>
        </div>
      </div>`
    ).join('');
  }

  /* ---------------- TRILHAS COM SEGMENTED FILTER ---------------- */
  function renderTrails() {
    const f = state.trailFilter || 'all';
    $$('[data-trail-filter]').forEach(btn => {
      const act = btn.dataset.trailFilter === f;
      btn.classList.toggle('active', act);
      btn.setAttribute('aria-selected', String(act));
    });

    const list = f === 'all' ? D.trilhas : D.trilhas.filter(tr => tr.id === f);
    const grid = $('#trails-grid');
    grid.classList.toggle('filtered-single', list.length === 1);

    grid.innerHTML = list.map(tr => {
      const done = tr.lessons.filter(l => state.lessons[l.id]).length;
      const total = tr.lessons.length;
      const pct = Math.round(done / total * 100);
      let foundNext = false;

      return `<article class="trail-card theme-${tr.theme}">
        <header class="trail-head">
          <div class="trail-mascot-box">
            <span class="trail-mascot">${I.mascot(tr.mascotKey)}</span>
          </div>
          <div class="trail-head-info">
            <div class="trail-cat-row">
              <span class="trail-tag">${tr.category}</span>
              <span class="trail-status-capsule ${pct === 100 ? 'done' : ''}">${pct === 100 ? '✓ 100% Dominado' : `${done}/${total} concluídos`}</span>
            </div>
            <h2>${t(tr.title)}</h2>
          </div>
        </header>
        <p class="trail-desc">${t(tr.desc)}</p>
        <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}" aria-label="Progresso da trilha"><span style="width:${pct}%"></span></div>
        
        <div class="learning-path" role="list">
          ${tr.lessons.map((l, idx) => {
            const isDone = !!state.lessons[l.id];
            let isCurrent = false;
            if (!isDone && !foundNext) {
              isCurrent = true;
              foundNext = true;
            }
            const isPending = !isDone && !isCurrent;
            const statusCls = isDone ? 'is-done' : (isCurrent ? 'is-current' : 'is-pending');
            const statusText = isDone
              ? '✓ Concluído'
              : (isCurrent ? (isKids() ? '⚡ Próximo!' : '⚡ Em andamento') : `Módulo ${idx + 1}`);

            return `<div class="path-node-row ${statusCls}" role="listitem">
              <button type="button" class="path-node-card ${statusCls} lesson-btn ${isDone ? 'done' : ''}" data-lesson="${l.id}">
                <div class="path-node-gem ${statusCls}" aria-hidden="true">
                  ${isDone ? `<span class="png-icon check-icon">${I.ui('check')}</span>` : `<span class="png-num">${idx + 1}</span>`}
                  ${isCurrent ? `<span class="png-pulse-ring"></span>` : ''}
                </div>
                <div class="path-node-info">
                  <span class="path-node-pill ${statusCls}">${statusText}</span>
                  <strong class="path-node-title">${t(l.title)}</strong>
                  <span class="path-node-hint">${isDone ? '+20 estrelas ganhas' : (isCurrent ? 'Toque para aprender (+20 pts)' : 'Pendente')}</span>
                </div>
                <span class="path-node-arrow" aria-hidden="true">${I.ui('arrowRight')}</span>
              </button>
            </div>`;
          }).join('')}
        </div>
      </article>`;
    }).join('');
  }

  $$('[data-trail-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.trailFilter = btn.dataset.trailFilter;
      sfx('click');
      renderTrails();
    });
  });

  $$('[data-open-trail]').forEach(card => {
    card.addEventListener('click', () => {
      state.trailFilter = card.dataset.openTrail;
      renderTrails();
    });
  });

  function findLesson(id) {
    for (const tr of D.trilhas) {
      const i = tr.lessons.findIndex(l => l.id === id);
      if (i >= 0) return { trail: tr, lesson: tr.lessons[i], index: i };
    }
    return null;
  }

  function openLesson(id) {
    const f = findLesson(id);
    if (!f) return;
    const { trail, lesson, index } = f;
    const prev = trail.lessons[index - 1];
    const next = trail.lessons[index + 1];
    const q = lesson.q;
    const kids = isKids();
    const isCompleted = !!state.lessons[lesson.id];

    const bodyHTML = kids
      ? `<div class="kids-deck">
          ${lesson.kidsCards.map((c, idx) => `
            <div class="kids-flashcard">
              <span class="kf-step">${idx + 1}</span>
              <div class="kf-art">${I.slide(c.slide)}</div>
              <h3>${c.title}</h3>
              <p>${c.text}</p>
              <button class="btn btn-ghost btn-sm" data-speak data-speak-text="${escapeHTML(c.title + '. ' + c.text)}">${I.ui('speaker')} Ouvir</button>
            </div>`).join('')}
        </div>`
      : `<div class="lesson-body">${lesson.normal}</div>
         <button class="btn btn-ghost btn-sm" data-speak>${I.ui('speaker')} Ouvir explicação</button>`;

    const navHTML = (prev || next) ? `
      <div class="lesson-modal-nav" style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem; padding-top:0.65rem; border-top:1px solid var(--border);">
        ${prev ? `<button type="button" class="btn btn-ghost btn-sm" data-goto-lesson="${prev.id}">${I.ui('arrowLeft')} <span>Anterior</span></button>` : '<span></span>'}
        ${next ? `<button type="button" class="btn btn-ghost btn-sm" data-goto-lesson="${next.id}"><span>Próximo</span> ${I.ui('arrowRight')}</button>` : '<span></span>'}
      </div>` : '';

    const content = `
      <article class="lesson theme-${trail.theme}" data-speak-area>
        <div class="lesson-header-row">
          <span class="lesson-mascot-mini">${I.mascot(trail.mascotKey)}</span>
          <div>
            <p class="eyebrow">${trail.category} • Módulo ${index + 1} de ${trail.lessons.length} ${isCompleted ? ' • ✓ Concluído' : ''}</p>
            <h2 id="modal-title">${t(lesson.title)}</h2>
          </div>
        </div>
        ${bodyHTML}
        ${navHTML}
      </article>
      <section class="lesson-quiz" data-speak-area>
        <h3>${kids ? 'Desafio (+20 estrelas):' : 'Fixação rápida (+20 pontos)'}</h3>
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem;">
          <p class="quiz-prompt">${t(q.text)}</p>
          <button type="button" class="btn btn-ghost btn-sm" data-speak data-speak-text="${escapeHTML(t(q.text))}" aria-label="Ouvir pergunta">${I.ui('speaker')}</button>
        </div>
        <div class="options">
          ${q.options.map((o, i) => `<button class="option" data-opt="${i}">${o}</button>`).join('')}
        </div>
        <p class="feedback" aria-live="polite"></p>
      </section>`;
    openModal(content);

    const box = $('#modal-content');
    $$('.option', box).forEach(btn => btn.addEventListener('click', () => {
      const chosen = Number(btn.dataset.opt);
      const fb = $('.feedback', box);
      if (chosen === q.answer) {
        $$('.option', box).forEach(b => b.disabled = true);
        btn.classList.add('correct');
        fb.className = 'feedback ok';
        fb.innerHTML = `${I.ui('check')} <span><strong>✓ ${kids ? 'Muito bem!' : 'Correto!'}</strong> ${q.explain}</span>`;
        sfx('ok');
        if (!state.lessons[lesson.id]) {
          state.lessons[lesson.id] = true;
          save();
          addPoints(20, kids ? 'Cartão dominado!' : 'Módulo concluído');
          renderTrails(); renderHomeStats();
          if (trailDone(trail.id)) confetti();
        }
        setTimeout(() => {
          if ($('#modal').hidden) return;
          if (next) openLesson(next.id);
          else closeModal();
        }, 1500);
      } else {
        btn.classList.add('wrong');
        btn.disabled = true;
        fb.className = 'feedback bad';
        fb.innerHTML = `${I.ui('cross')} <span>${kids ? 'Quase! Tente outra resposta.' : 'Resposta incorreta. Tente outra alternativa.'}</span>`;
        sfx('bad');
      }
    }));
  }

  /* ---------------- MODAL / BOTTOM SHEET ---------------- */
  let lastFocus = null;
  function openModal(html) {
    lastFocus = document.activeElement;
    $('#modal-content').innerHTML = html;
    hydrateIcons($('#modal-content'));
    const m = $('#modal');
    m.hidden = false;
    document.body.classList.add('no-scroll');
    $('.modal-box', m).scrollTop = 0;
    $('.modal-close', m).focus();
  }
  function closeModal() {
    stopSpeaking();
    $('#modal').hidden = true;
    document.body.classList.remove('no-scroll');
    if (lastFocus) lastFocus.focus();
  }

  /* ---------------- DICIONÁRIO DO GUARDIÃO (MODAL DESCOMPLICADO) ---------------- */
  function openGlossaryModal() {
    sfx('click');
    const items = D.glossario || [];
    const html = `
      <article class="glossary-sheet" data-speak-area>
        <div class="glossary-head">
          <div class="glossary-badge-icon">📖</div>
          <div>
            <span class="eyebrow">DICIONÁRIO DESCOMPLICADO</span>
            <h2 id="modal-title">Entenda as Palavras do Planeta</h2>
          </div>
        </div>
        <p class="glossary-intro">Aqui não tem termo difícil! Toque no botão de áudio 🔊 para ouvir a explicação de cada palavra do dia a dia:</p>
        <div class="glossary-list">
          ${items.map(g => `
            <div class="glossary-card">
              <div class="glossary-card-top">
                <span class="glossary-term-badge">${g.simple}</span>
                <button type="button" class="btn btn-ghost btn-xs" data-speak data-speak-text="${escapeHTML(g.simple + '. ' + g.explanation)}" aria-label="Ouvir explicação de ${escapeHTML(g.term)}">${I.ui('speaker')} <span>Ouvir</span></button>
              </div>
              <h3 class="glossary-orig">${g.term} <small>(${g.short})</small></h3>
              <p class="glossary-exp">${g.explanation}</p>
            </div>
          `).join('')}
        </div>
        <button type="button" class="btn btn-primary btn-block" style="width:100%; margin-top:1rem;" data-close>Entendi! Voltar ao app</button>
      </article>
    `;
    openModal(html);
  }

  $('#modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal' || e.target.closest('.modal-close') || e.target.closest('[data-close]')) closeModal();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('#modal').hidden) closeModal(); });
  document.addEventListener('click', (e) => {
    if (e.target.closest('#btn-open-glossary') || e.target.closest('#btn-glossary-top')) { openGlossaryModal(); return; }
    const b = e.target.closest('[data-lesson]');
    if (b) { sfx('click'); openLesson(b.dataset.lesson); return; }
    const gotoBtn = e.target.closest('[data-goto-lesson]');
    if (gotoBtn) { sfx('click'); openLesson(gotoBtn.dataset.gotoLesson); return; }
  });

  /* ---------------- CALCULADORA COM STEPPERS E BREAKDOWN DE APP ---------------- */
  const CALC = {
    vazaoChuveiro: 9,
    potChuveiro: 5.5,
    escovaEconomia: 11,
    escovacoesDia: 3,
    ledW: 9,
    standbyW: 4,
    standbyHoras: 20,
    calcadaEconomia: 250,
    fatorCO2: 0.0385,
    dias: 30
  };

  function calc() {
    const f = $('#calc-form');
    if (!f) return;
    const v = (n) => Math.max(0, parseFloat(String(f.elements[n]?.value ?? 0).replace(',', '.')) || 0);
    const pessoas = Math.max(1, v('pessoas'));
    const banhoAtual = isKids() ? 15 : v('banhoAtual');
    const banhoMeta = v('banhoMeta');
    const minBanho = Math.max(0, banhoAtual - banhoMeta);

    $('#out-pessoas').textContent = pessoas;
    $('#out-banhoAtual').textContent = `${v('banhoAtual')} min`;
    $('#out-banhoMeta').textContent = `${banhoMeta} min`;
    $('#out-lampadas').textContent = v('lampadas');
    $('#out-horas').textContent = `${v('horas')} h`;
    $('#out-standby').textContent = v('standby');
    $('#out-calcada').textContent = `${v('calcada')}x`;

    const banhoL = pessoas * minBanho * CALC.vazaoChuveiro * CALC.dias;
    const banhoKwh = pessoas * (minBanho / 60) * CALC.potChuveiro * CALC.dias;
    const escovaL = f.elements.escova && f.elements.escova.checked ? pessoas * CALC.escovacoesDia * CALC.escovaEconomia * CALC.dias : 0;
    const lampTipoW = parseFloat(f.elements.lampTipo?.value ?? 60);
    const lampKwh = v('lampadas') * Math.max(0, lampTipoW - CALC.ledW) / 1000 * Math.min(24, v('horas')) * CALC.dias;
    const standbyKwh = v('standby') * CALC.standbyW * CALC.standbyHoras * CALC.dias / 1000;
    const calcadaL = v('calcada') * CALC.calcadaEconomia;

    const litros = banhoL + escovaL + calcadaL;
    const kwh = banhoKwh + lampKwh + standbyKwh;
    const rsAgua = litros / 1000 * v('tarifaAgua');
    const rsLuz = kwh * v('tarifaLuz');
    const totalRs = rsAgua + rsLuz;
    const co2Ano = kwh * 12 * CALC.fatorCO2;
    const baldes = Math.max(1, Math.round(litros / 10));
    const banhosPoupados = Math.max(1, Math.round(litros / 45));
    const horasTv = Math.max(1, Math.round(kwh * 5));
    const arvoresEquiv = Math.max(1, Math.round(co2Ano / 15));

    const tbCalc = $('#tile-badge-calc');
    if (tbCalc) tbCalc.textContent = `${money(totalRs)}/mês`;

    const cards = isKids() ? [
      { ico: 'water',  value: `${fmt(litros)} Litros`,  sub: `≈ ${baldes} baldes cheios! 🪣`, label: `${banhosPoupados} banhos inteiros poupados`, cls: 'water' },
      { ico: 'energy', value: `${fmt(kwh)} kWh de Luz`, sub: `≈ ${horasTv}h de TV ligada! 📺`, label: 'Muita energia guardada na casa', cls: 'energy' },
      { ico: 'coin',   value: money(totalRs),          sub: 'Economia no cofrinho! 🪙', label: 'Dinheiro que sobra para passear', cls: 'money' },
      { ico: 'globe',  value: 'Ar Mais Puro! 🌳',      sub: `≈ ${arvoresEquiv} árvores plantadas!`, label: 'Você ajudou a cuidar da Terra', cls: 'climate' }
    ] : [
      { ico: 'water',  value: `${fmt(litros)} Litros`,  sub: `≈ ${baldes} baldes de 10L (ou ${banhosPoupados} banhos)`, label: `Água poupada que não foi pro ralo`, cls: 'water' },
      { ico: 'energy', value: `${fmt(kwh, 1)} kWh`,     sub: `≈ ${horasTv} horas de TV ligada`, label: 'Eletricidade economizada no mês', cls: 'energy' },
      { ico: 'coin',   value: money(totalRs),          sub: `${money(totalRs * 12)} poupados no ano`, label: 'Economia direta no orçamento familiar', cls: 'money' },
      { ico: 'globe',  value: `${fmt(co2Ano, 1)} kg CO₂`, sub: `≈ ${arvoresEquiv} árvores adultas`, label: 'Poluição que deixou de ir pro ar', cls: 'climate' }
    ];

    $('#calc-cards').innerHTML = cards.map(c =>
      `<div class="result-card ${c.cls}">
        <span class="rc-icon">${I.ui(c.ico)}</span>
        <div>
          <strong>${c.value}</strong>
          <span class="rc-sub">${c.sub}</span>
          <p>${c.label}</p>
        </div>
      </div>`
    ).join('');

    const items = [
      { name: 'Banho de 5 minutos', meta: `${fmt(banhoL)} L poupados (≈ ${Math.round(banhoL/10)} baldes)`, val: banhoL / 1000 * v('tarifaAgua') + banhoKwh * v('tarifaLuz') },
      { name: 'Torneira fechada ao escovar', meta: `${fmt(escovaL)} L poupados (≈ ${Math.round(escovaL/10)} baldes)`, val: escovaL / 1000 * v('tarifaAgua') },
      { name: 'Trocar para lâmpadas LED', meta: `${fmt(lampKwh, 1)} kWh (ilumina mais gastando menos)`, val: lampKwh * v('tarifaLuz') },
      { name: 'Desligar aparelhos da tomada (Stand-by)', meta: `${fmt(standbyKwh, 1)} kWh (apaga a luzinha vermelha)`, val: standbyKwh * v('tarifaLuz') },
      { name: 'Limpar calçada com vassoura', meta: `${fmt(calcadaL)} L (sem mangueira ligada à toa)`, val: calcadaL / 1000 * v('tarifaAgua') }
    ];

    const breakdownEl = $('#calc-breakdown');
    if (breakdownEl) {
      const maxVal = Math.max(1, ...items.map(x => x.val));
      breakdownEl.innerHTML = items.map(it => {
        const pct = Math.min(100, Math.round((it.val / maxVal) * 100));
        return `<div class="cb-row">
          <div class="cb-top">
            <span>${it.name} <small class="cb-meta">(${it.meta})</small></span>
            <strong>${money(it.val)}</strong>
          </div>
          <div class="cb-bar"><span style="width:${pct}%"></span></div>
        </div>`;
      }).join('');
    }

    $('#calc-table').innerHTML = `<caption>Detalhamento mensal por hábito</caption>
      <thead><tr><th scope="col">Hábito</th><th scope="col">Detalhe</th><th scope="col">Economia</th></tr></thead>
      <tbody>${items.map(it => `<tr><th scope="row">${it.name}</th><td>${it.meta}</td><td><strong>${money(it.val)}</strong></td></tr>`).join('')}</tbody>
      <tfoot><tr><th scope="row">Total Mensal Estimado</th><td>${fmt(litros)} L • ${fmt(kwh, 1)} kWh</td><td><strong>${money(totalRs)}</strong></td></tr></tfoot>`;

    $('#calc-note').textContent = isKids()
      ? 'Mostre esse resultado para a sua família!'
      : 'Dica: reduzir o banho elétrico gera economia dupla nas contas de água e luz.';

    const resSpeak = $('#view-calculadora .results-header [data-speak]');
    if (resSpeak) {
      resSpeak.dataset.speakText = isKids()
        ? `Sua casa pode economizar cerca de ${fmt(litros)} litros de água por mês, o que equivale a ${caixasDagua} ${caixasDagua === 1 ? "caixa d'água cheia" : "caixas d'água cheias"}, e poupar ${money(totalRs)} no cofrinho da família!`
        : `Resultado da simulação: economia mensal de ${fmt(litros)} litros de água e ${fmt(kwh, 1)} quilowatts-hora de eletricidade, poupando ${money(totalRs)} por mês ou ${money(totalRs * 12)} ao ano.`;
    }
  }

  $('#calc-form').addEventListener('input', calc);

  // Steppers (− / +) para ajuste fino ergonômico no celular
  $$('[data-step-input]').forEach(btn => {
    btn.addEventListener('click', () => {
      const f = $('#calc-form');
      const input = f.elements[btn.dataset.stepInput];
      if (!input) return;
      const step = parseFloat(btn.dataset.step) || 1;
      const min = parseFloat(input.min) || 0;
      const max = parseFloat(input.max) || 100;
      const nextVal = Math.min(max, Math.max(min, (parseFloat(input.value) || 0) + step));
      input.value = nextVal;
      sfx('click');
      calc();
    });
  });

  /* ---------------- HÁBITOS ---------------- */
  function ensureToday() {
    if (state.habits.date !== today()) {
      state.habits = { date: today(), done: [], awarded: [], allAwarded: false };
      save();
    }
  }
  function renderHabits() {
    ensureToday();
    const done = state.habits.done;
    const dateStr = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
    const greenBadge = state.greenDays > 0
      ? ` • <span style="font-weight:700; color:#15803D;">🌱 ${state.greenDays} ${state.greenDays === 1 ? 'dia 100% verde' : 'dias 100% verdes'}</span>`
      : '';
    $('#habit-date').innerHTML = `${dateStr}${greenBadge}`;
    $('#habit-list').innerHTML = D.habits.map(h => {
      const checked = done.includes(h.id);
      return `<li><label class="habit ${checked ? 'checked' : ''}">
        <input type="checkbox" data-habit="${h.id}" ${checked ? 'checked' : ''}>
        <span class="habit-icon">${I.habit(h.id)}</span>
        <span class="habit-text">${t(h)}</span>
        <span class="habit-pts">+5 pts</span>
        <button type="button" class="btn btn-ghost btn-xs habit-speak-btn" data-speak data-speak-text="${escapeHTML(t(h))}" aria-label="Ouvir hábito" title="Ouvir em voz alta">${I.ui('speaker')}</button>
      </label></li>`;
    }).join('');
    const total = D.habits.length;
    const pct = Math.round(done.length / total * 100);
    $('#habit-bar').style.width = pct + '%';
    $('#habit-count').textContent = done.length === total
      ? `${done.length}/${total} (Completo!)`
      : `${done.length}/${total}`;

    const radial = $('#habit-radial-fill');
    if (radial) {
      const circ = 119.38;
      const off = circ - (circ * done.length / total);
      radial.style.strokeDashoffset = off;
      if (done.length === total) {
        radial.style.stroke = '#16A34A';
      } else {
        radial.style.stroke = '';
      }
    }
    const ringIcon = $('#habit-ring-icon');
    if (ringIcon) {
      ringIcon.textContent = done.length === total ? '⭐' : (done.length > 0 ? '🌱' : '💧');
    }
  }
  $('#habit-list').addEventListener('change', (e) => {
    const id = e.target.dataset.habit;
    if (!id) return;
    ensureToday();
    const h = state.habits;
    if (e.target.checked) {
      if (!h.done.includes(id)) h.done.push(id);
      sfx('ok');
      if (!h.awarded.includes(id)) { h.awarded.push(id); save(); addPoints(5, isKids() ? 'Missão feita!' : 'Hábito concluído'); }
      if (h.done.length === D.habits.length && !h.allAwarded) {
        h.allAwarded = true; state.greenDays++; save();
        updatePoints();
        setTimeout(() => { addPoints(30, isKids() ? 'Dia 100% completo!' : 'Todos os hábitos concluídos!'); confetti(); sfx('win'); }, 400);
      }
    } else {
      h.done = h.done.filter(x => x !== id);
    }
    save();
    renderHabits(); renderHomeStats();
  });

  /* ---------------- ROTEAMENTO (hash) ---------------- */
  const ROUTES = ['inicio', 'trilhas', 'jogos', 'calculadora', 'habitos'];
  function route() {
    const r = (location.hash || '#inicio').slice(1);
    const current = ROUTES.includes(r) ? r : 'inicio';
    stopSpeaking();
    $$('.view').forEach(v => v.hidden = v.id !== 'view-' + current);
    $$('.main-nav a').forEach(a => a.setAttribute('aria-current', a.dataset.route === current ? 'page' : 'false'));
    if (current === 'habitos') { renderHabits(); renderBadges(); renderCert(); }
    if (current === 'inicio') renderHomeStats();
    if (current === 'trilhas') renderTrails();
    if (current === 'jogos' && window.EcoGames) window.EcoGames.refreshHub();
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }
  window.addEventListener('hashchange', route);

  /* ---------------- MODOS, FONTE E SOM ---------------- */
  const modeListeners = [];
  function applyMode() {
    document.body.classList.toggle('mode-kids', isKids());
    document.body.classList.toggle('mode-normal', !isKids());
    document.documentElement.style.setProperty('--font-scale', state.fontScale);
    const mb = $('#mode-toggle');
    mb.innerHTML = isKids()
      ? `${I.ui('modeNormal')} <span>Normal</span>`
      : `${I.ui('modeKids')} <span>Infantil</span>`;
    mb.setAttribute('aria-label', isKids() ? 'Alternar para o Modo Normal' : 'Alternar para o Modo Infantil');
    $('#sound-toggle').innerHTML = state.sound ? I.ui('soundOn') : I.ui('soundOff');
    $('#sound-toggle').setAttribute('aria-pressed', String(state.sound));
    updatePoints();
    renderTip(); renderHomeStats(); renderTrails(); calc();
    renderHabits(); renderBadges(); renderCert();
    modeListeners.forEach(fn => fn());
  }
  $('#mode-toggle').addEventListener('click', () => {
    stopSpeaking();
    state.mode = isKids() ? 'normal' : 'kids';
    save(); applyMode(); sfx('click');
    toast(isKids() ? 'Modo Infantil ativado' : 'Modo Normal ativado');
  });
  $('#font-inc').addEventListener('click', () => { state.fontScale = Math.min(1.5, +(state.fontScale + 0.1).toFixed(2)); save(); applyMode(); });
  $('#font-dec').addEventListener('click', () => { state.fontScale = Math.max(0.9, +(state.fontScale - 0.1).toFixed(2)); save(); applyMode(); });
  $('#sound-toggle').addEventListener('click', () => { state.sound = !state.sound; save(); applyMode(); sfx('click'); });

  /* Boas-vindas na primeira visita */
  function welcome() {
    const w = $('#welcome');
    if (state.mode) { w.hidden = true; return; }
    w.hidden = false;
    $('[data-choose]', w).focus();
    $$('[data-choose]', w).forEach(b => b.addEventListener('click', () => {
      state.mode = b.dataset.choose;
      if (state.mode === 'normal') state.fontScale = Math.max(state.fontScale, 1.05);
      save(); w.hidden = true; applyMode(); sfx('win');
      toast(isKids() ? 'Bem-vindo, Guardião!' : 'Modo Normal configurado');
    }));
  }

  /* Reiniciar progresso */
  $('#reset-progress').addEventListener('click', () => {
    if (!confirm('Deseja realmente apagar o progresso salvo neste dispositivo?')) return;
    const keep = { mode: state.mode, fontScale: state.fontScale, sound: state.sound };
    state = Object.assign(defaults(), keep);
    window.Eco.state = state;
    save(); applyMode(); toast('Progresso reiniciado');
  });

  /* ---------------- API PÚBLICA ---------------- */
  window.Eco = {
    get state() { return state; }, set state(v) { state = v; },
    save, t, isKids, sfx, haptic, toast, confetti, addPoints, shuffle, fmt, escapeHTML,
    checkBadges, renderHomeStats,
    onModeChange: (fn) => modeListeners.push(fn)
  };

  /* ---------------- INICIALIZAÇÃO ---------------- */
  hydrateIcons();
  if (!state.mode) document.body.classList.add('mode-kids');
  applyMode();
  if (!state.mode) document.body.classList.replace('mode-normal', 'mode-kids');
  route();
  welcome();
  checkBadges();

  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
  if (canSpeak) speechSynthesis.getVoices();
})();
