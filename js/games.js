/* =========================================================
   EcoGuardiões — Jogos Práticos (games.js)
   Fluxo contínuo (sem botões de "Próximo/Continuar" interrompendo a ação):
   1. Ecoponto Express (Sort): esteira contínua + combos + avanço automático
   2. Detetive da Casa (Detective): inspeção direta + transição automática de cômodo
   3. Fluxo Limpo (Pipes): quebra-cabeça de tubulação com avanço automático ao conectar
   4. Decisões Contra o Relógio (Quiz): resposta com avanço automático fluido
   ========================================================= */
(function () {
  'use strict';

  const D = window.ECO_DATA;
  const E = window.Eco;
  const I = window.EcoIcons;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  const hub = $('#games-hub');
  const area = $('#game-area');
  let active = null;
  let currentDiff = 'medium'; // 'easy' | 'medium' | 'hard'
  let activeTimer = null;
  let stepTimeout = null;

  const DIFF_META = {
    easy:   { label: 'Fácil',   mult: 1,   color: '#16A34A' },
    medium: { label: 'Médio',   mult: 1.5, color: '#0284C7' },
    hard:   { label: 'Difícil', mult: 2,   color: '#DC2626' }
  };

  function clearTimer() {
    if (activeTimer) { clearInterval(activeTimer); activeTimer = null; }
    if (stepTimeout) { clearTimeout(stepTimeout); stepTimeout = null; }
  }

  function scheduleStep(fn, ms) {
    if (stepTimeout) clearTimeout(stepTimeout);
    stepTimeout = setTimeout(() => {
      stepTimeout = null;
      fn();
    }, ms);
  }

  function refreshHub() {
    $$('[data-diff]').forEach(b => b.classList.toggle('active', b.dataset.diff === currentDiff));
    $$('[data-best]').forEach(el => {
      const k = el.dataset.best;
      const v = E.state.best[k] || 0;
      el.innerHTML = v ? `${I.ui('trophy')} <strong>${v}%</strong>` : 'Novo';
    });
  }

  $$('[data-diff]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentDiff = btn.dataset.diff;
      E.sfx('click');
      refreshHub();
    });
  });

  function showHub() {
    clearTimer();
    active = null;
    area.hidden = true;
    area.innerHTML = '';
    hub.hidden = false;
    refreshHub();
  }

  function openGame(name) {
    clearTimer();
    active = name;
    hub.hidden = true;
    area.hidden = false;
    if (name === 'sort') Sort.start();
    if (name === 'detective') Detective.start();
    if (name === 'pipes') Pipes.start();
    if (name === 'quiz') Quiz.start();
    area.focus();
  }

  $$('[data-game]').forEach(btn => btn.addEventListener('click', () => { E.sfx('click'); openGame(btn.dataset.game); }));
  $$('[data-open-game]').forEach(card => card.addEventListener('click', (e) => {
    if (e.target.closest('button')) return;
    E.sfx('click');
    openGame(card.dataset.openGame);
  }));

  area.addEventListener('click', (e) => {
    if (e.target.closest('[data-back]')) { E.sfx('click'); showHub(); return; }
    const db = e.target.closest('[data-switch-diff]');
    if (db) {
      currentDiff = db.getAttribute('data-switch-diff');
      E.sfx('click');
      openGame(active);
    }
  });
  window.addEventListener('hashchange', () => { if (location.hash !== '#jogos' && active) showHub(); });

  function livesHTML(lives, maxLives) {
    return `<span class="hud-lives" aria-label="${lives} de ${maxLives} vidas restantes">` +
      Array.from({ length: maxLives }, (_, i) =>
        `<span class="heart ${i < lives ? 'alive' : 'lost'}">♥</span>`
      ).join('') + `</span>`;
  }

  function header(title, hudHTML = '') {
    return `<div class="game-head">
      <button class="btn btn-ghost btn-sm game-back-btn" data-back aria-label="Voltar aos jogos">${I.ui('arrowLeft')} <span>Voltar</span></button>
      <h1>${title}</h1>
      <div class="game-diff-inline" role="group" aria-label="Dificuldade">
        ${['easy', 'medium', 'hard'].map(d =>
          `<button class="diff-chip ${currentDiff === d ? 'active' : ''}" data-switch-diff="${d}">${DIFF_META[d].label}</button>`
        ).join('')}
      </div>
      <div class="game-stats" aria-live="polite">${hudHTML}</div>
    </div>`;
  }

  function recordBest(key, pct) {
    if (pct > (E.state.best[key] || 0)) { E.state.best[key] = pct; E.save(); }
  }

  function endScreen({ title, pct, won = true, lines, basePoints, again }) {
    clearTimer();
    const mult = DIFF_META[currentDiff].mult;
    const pts = won ? Math.round(basePoints * mult) : Math.max(5, Math.round(basePoints * 0.25));
    E.addPoints(pts, `${title} (${DIFF_META[currentDiff].label})`);
    if (pct >= 75 && won) { E.confetti(); E.sfx('win'); } else { E.sfx(won ? 'ok' : 'bad'); }

    const mascotKey = pct >= 80 ? 'leaf' : pct >= 50 ? 'water' : 'energy';
    area.innerHTML = `${header(title, '')}
      <div class="end-screen" data-speak-area>
        <div class="end-mascot">${I.mascot(mascotKey)}</div>
        <span class="end-badge">${DIFF_META[currentDiff].label} • ${pct}% • +${pts} pts</span>
        <h2>${!won ? 'Fim das tentativas!' : pct >= 85 ? 'Excelente resultado!' : 'Partida concluída!'}</h2>
        ${lines.map(l => `<p>${l}</p>`).join('')}
        <div class="end-actions">
          <button class="btn btn-primary" id="play-again">Jogar de novo</button>
          ${currentDiff !== 'hard' && won && pct >= 80 ? `<button class="btn btn-secondary" id="next-diff">Nível ${currentDiff === 'easy' ? 'Médio' : 'Difícil'}</button>` : ''}
          <button class="btn btn-ghost" data-back>Outros jogos</button>
        </div>
      </div>`;
    $('#play-again').addEventListener('click', () => { E.sfx('click'); again(); });
    const nd = $('#next-diff');
    if (nd) {
      nd.addEventListener('click', () => {
        currentDiff = currentDiff === 'easy' ? 'medium' : 'hard';
        E.sfx('click');
        again();
      });
    }
  }

  /* =========================================================
     JOGO 1 — ECOPONTO EXPRESS (FLUXO CONTÍNUO SEM BOTÃO "PRÓXIMO")
     ========================================================= */
  function streetBinSVG(color, textColor, symbol) {
    const iconPath = symbol === 'danger'
      ? '<path d="M50 58 L64 82 H36 Z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><line x1="50" y1="66" x2="50" y2="74" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="78" r="1.8" fill="currentColor"/>'
      : symbol === 'trash'
      ? '<line x1="42" y1="62" x2="58" y2="78" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><line x1="58" y1="62" x2="42" y2="78" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>'
      : '<path d="M50 56 L58 66 H42 Z M60 72 L52 82 V68 Z M40 72 L48 68 V82 Z" fill="currentColor"/>';

    return `<svg viewBox="0 0 100 120" class="sb-svg" aria-hidden="true">
      <ellipse cx="50" cy="113" rx="34" ry="5" fill="#0F172A" opacity=".18"/>
      <circle cx="28" cy="108" r="7" fill="#1E293B"/><circle cx="28" cy="108" r="3" fill="#94A3B8"/>
      <circle cx="72" cy="108" r="7" fill="#1E293B"/><circle cx="72" cy="108" r="3" fill="#94A3B8"/>
      <path d="M20 34 H80 L74 104 Q73 108 68 108 H32 Q27 108 26 104 Z" fill="${color}" stroke="#0F172A" stroke-width="3" stroke-linejoin="round"/>
      <path d="M25 36 H34 L31 104 H27 Z" fill="#FFFFFF" opacity=".18"/>
      <rect x="16" y="31" width="68" height="7" rx="3" fill="${color}" stroke="#0F172A" stroke-width="2.5"/>
      <g style="color:${textColor}">${iconPath}</g>
      <g class="sb-lid">
        <path d="M14 28 Q50 16 86 28 Z" fill="${color}" stroke="#0F172A" stroke-width="3" stroke-linejoin="round"/>
        <rect x="41" y="16" width="18" height="6" rx="3" fill="${color}" stroke="#0F172A" stroke-width="2.5"/>
      </g>
    </svg>`;
  }

  const Sort = {
    cfg() {
      if (currentDiff === 'easy') {
        return { round: 8, lives: 5, timeMs: 13000, bins: ['papel', 'plastico', 'vidro', 'metal'], maxLevel: 1, shuffleBins: false };
      }
      if (currentDiff === 'hard') {
        return { round: 14, lives: 3, timeMs: 6500, bins: Object.keys(D.bins), maxLevel: 3, shuffleBins: true };
      }
      return { round: 10, lives: 3, timeMs: 9500, bins: Object.keys(D.bins), maxLevel: 2, shuffleBins: false };
    },
    start() {
      const c = this.cfg();
      this.c = c;
      const pool = D.sortItems.filter(it => c.bins.includes(it.bin) && (it.level || 1) <= c.maxLevel);
      this.items = E.shuffle(pool).slice(0, c.round);
      while (this.items.length < c.round) {
        this.items.push(pool[this.items.length % pool.length]);
      }
      this.binOrder = c.bins.slice();
      this.i = 0;
      this.score = 0;
      this.combo = 0;
      this.lives = c.lives;
      this.locked = false;
      this.lastMsg = 'Toque ou arraste o resíduo para a lixeira correta antes que caia da esteira!';
      this.lastCls = '';
      this.render();
    },
    render() {
      clearTimer();
      const it = this.items[this.i];
      const c = this.c;
      if (c.shuffleBins) this.binOrder = E.shuffle(c.bins);

      const hud = `${livesHTML(this.lives, c.lives)} <span>${this.i + 1}/${c.round}</span> ${this.combo > 1 ? `<span class="combo-pill">x${this.combo}</span>` : ''}`;

      area.innerHTML = `${header('Ecoponto Express', hud)}
        <div class="ecoponto-scene">
          <div class="conveyor-header">
            <span id="sort-live-msg" class="sort-live-msg ${this.lastCls}">${this.lastMsg}</span>
            <span class="belt-timer-label" id="belt-time-txt">${(c.timeMs / 1000).toFixed(0)}s</span>
          </div>

          <div class="conveyor-track-wrap">
            <div class="conveyor-stage">
              <div class="conveyor-mover" id="sort-mover" style="left: 3%">
                <div class="conveyor-item" id="sort-item" draggable="true" aria-grabbed="false">
                  <div class="conveyor-svg">${I.item(it.svgKey)}</div>
                  <div class="conveyor-tag">
                    <strong>${it.name}</strong>
                    <span>Toque na lixeira certa</span>
                  </div>
                </div>
              </div>
              <div class="chute-danger" title="Fim da esteira">⚠</div>
            </div>
            <div class="conveyor-belt" aria-hidden="true">
              <div class="conveyor-rollers">
                <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
              </div>
            </div>
          </div>

          <div class="ecoponto-floor bins-count-${this.binOrder.length}" role="group" aria-label="Lixeiras da coleta seletiva">
            ${this.binOrder.map((key, idx) => {
              const b = D.bins[key];
              return `<button class="street-bin" data-bin="${key}" aria-label="${idx + 1}: Lixeira ${b.name}">
                <span class="sb-num" aria-hidden="true">${idx + 1}</span>
                <div class="sb-graphic">${streetBinSVG(b.color, b.text, b.symbol)}</div>
                <span class="sb-label">${b.short}</span>
              </button>`;
            }).join('')}
          </div>
        </div>`;

      const card = $('#sort-item');
      card.addEventListener('dragstart', (e) => {
        card.classList.add('dragging');
        if (e.dataTransfer) e.dataTransfer.setData('text/plain', it.bin);
      });
      card.addEventListener('dragend', () => card.classList.remove('dragging'));

      $$('.street-bin', area).forEach(b => {
        b.addEventListener('click', () => this.choose(b.dataset.bin, b));
        b.addEventListener('dragover', (e) => { e.preventDefault(); b.classList.add('over'); });
        b.addEventListener('dragleave', () => b.classList.remove('over'));
        b.addEventListener('drop', (e) => { e.preventDefault(); b.classList.remove('over'); this.choose(b.dataset.bin, b); });
      });

      this.startBeltTimer();
    },
    startBeltTimer() {
      const start = performance.now();
      const total = this.c.timeMs;
      const mover = $('#sort-mover');
      const txt = $('#belt-time-txt');
      activeTimer = setInterval(() => {
        if (this.locked || active !== 'sort') return;
        const elapsed = performance.now() - start;
        const ratio = Math.min(1, elapsed / total);
        if (mover) mover.style.left = `${3 + ratio * 72}%`;
        const remain = Math.max(0, Math.ceil((total - elapsed) / 1000));
        if (txt) {
          txt.textContent = `${remain}s`;
          if (ratio >= 0.72) {
            txt.style.background = '#DC2626';
          } else {
            txt.style.background = '#0F172A';
          }
        }
        if (ratio >= 1) {
          this.timeoutItem();
        }
      }, 50);
    },
    showBanner(msg, cls) {
      this.lastMsg = msg;
      this.lastCls = cls;
      const el = $('#sort-live-msg');
      if (el) {
        el.className = `sort-live-msg ${cls}`;
        el.innerHTML = msg;
      }
    },
    timeoutItem() {
      clearTimer();
      this.locked = true;
      this.combo = 0;
      this.lives--;
      E.sfx('bad');
      const it = this.items[this.i];
      const rightBin = D.bins[it.bin];
      this.showBanner(`Caiu da esteira! <strong>${it.name}</strong> vai em <strong>${rightBin.name}</strong>.`, 'bad');
      $$('.street-bin', area).forEach(b => {
        b.disabled = true;
        if (b.dataset.bin === it.bin) b.classList.add('right', 'open-lid');
      });
      scheduleStep(() => this.advance(), 1100);
    },
    choose(bin, btn) {
      if (this.locked) return;
      clearTimer();
      const it = this.items[this.i];
      const right = bin === it.bin;

      this.locked = true;
      $$('.street-bin', area).forEach(b => b.disabled = true);

      if (right) {
        this.score++;
        this.combo++;
        btn.classList.add('right', 'open-lid');
        $('#sort-item').classList.add('gone');
        E.sfx('ok');
        const comboTxt = this.combo > 1 ? ` • <strong>Combo x${this.combo}!</strong>` : '';
        this.showBanner(`✓ <strong>${D.bins[bin].name}:</strong> ${it.tip}${comboTxt}`, 'ok');
        scheduleStep(() => this.advance(), 650);
      } else {
        this.combo = 0;
        this.lives--;
        btn.classList.add('wrong');
        const rightBtn = $(`.street-bin[data-bin="${it.bin}"]`, area);
        if (rightBtn) rightBtn.classList.add('right', 'open-lid');
        $('#sort-item').classList.add('shake');
        E.sfx('bad');
        this.showBanner(`✕ Errado! <strong>${it.name}</strong> vai em <strong>${D.bins[it.bin].name}</strong>.`, 'bad');
        scheduleStep(() => this.advance(), 1150);
      }
    },
    advance() {
      this.locked = false;
      if (this.lives <= 0) {
        this.finish(false);
        return;
      }
      this.i++;
      if (this.i < this.c.round) this.render();
      else this.finish(true);
    },
    finish(won) {
      this.locked = true;
      clearTimer();
      const pct = Math.round(this.score / this.c.round * 100);
      if (won) recordBest('sort', pct);
      endScreen({
        title: 'Ecoponto Express', pct, won,
        lines: [
          `Você acertou <strong>${this.score} de ${this.c.round}</strong> resíduos no nível <strong>${DIFF_META[currentDiff].label}</strong>.`
        ],
        basePoints: this.score * 6,
        again: () => this.start()
      });
    }
  };

  /* =========================================================
     JOGO 2 — DETETIVE DA CASA (TRANSIÇÃO AUTOMÁTICA DE CÔMODO)
     ========================================================= */
  function renderRoomSVG(roomId, isFixedFn, showHints, isPlayerFixedFn) {
    const f = (idx) => isFixedFn(`${roomId}:${idx}`);
    const pf = (idx) => isPlayerFixedFn ? isPlayerFixedFn(`${roomId}:${idx}`) : f(idx);

    const marker = (cx, cy, isWaste, fixed, playerFixed) => {
      if (!isWaste) return '';
      if (fixed) {
        if (!playerFixed) return '';
        return `<g class="state-marker fixed" transform="translate(${cx},${cy})">
          <circle r="13" fill="#16A34A" stroke="#FFFFFF" stroke-width="2.5"/>
          <path d="M-5 0 L-1 4 L6 -4" fill="none" stroke="#FFFFFF" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
        </g>`;
      }
      if (!showHints) return '';
      return `<g class="state-marker alert" transform="translate(${cx},${cy})">
        <circle class="pulse-ring" r="18" fill="#EF4444" opacity=".35"/>
        <circle r="13" fill="#DC2626" stroke="#FFFFFF" stroke-width="2.5"/>
        <line x1="0" y1="-5" x2="0" y2="2" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
        <circle cx="0" cy="6" r="1.7" fill="#FFFFFF"/>
      </g>`;
    };

    if (roomId === 'banheiro') {
      const fTap = f(0), fShower = f(1), fToilet = f(2);
      return `<svg viewBox="0 0 900 430" class="room-interactive-svg" role="img" aria-label="Ambiente do Banheiro">
        <rect width="900" height="330" fill="#E0F2FE"/>
        <g stroke="#BAE6FD" stroke-width="1.5" opacity=".7">
          <line x1="0" y1="80" x2="900" y2="80"/><line x1="0" y1="160" x2="900" y2="160"/><line x1="0" y1="240" x2="900" y2="240"/>
          <line x1="150" y1="0" x2="150" y2="330"/><line x1="300" y1="0" x2="300" y2="330"/><line x1="450" y1="0" x2="450" y2="330"/><line x1="600" y1="0" x2="600" y2="330"/><line x1="750" y1="0" x2="750" y2="330"/>
        </g>
        <rect y="330" width="900" height="100" fill="#CBD5E1"/>
        <line x1="0" y1="330" x2="900" y2="330" stroke="#64748B" stroke-width="4"/>

        <rect x="82" y="52" width="146" height="118" rx="14" fill="#93C5FD" stroke="#334155" stroke-width="4"/>
        <rect x="90" y="60" width="130" height="102" rx="9" fill="#EFF6FF"/>
        <rect x="64" y="218" width="184" height="112" rx="6" fill="#B45309" stroke="#451A03" stroke-width="3.5"/>
        <rect x="76" y="232" width="74" height="84" rx="4" fill="#D97706" stroke="#451A03" stroke-width="2.5"/>
        <rect x="160" y="232" width="74" height="84" rx="4" fill="#D97706" stroke="#451A03" stroke-width="2.5"/>
        <rect x="54" y="204" width="204" height="18" rx="5" fill="#F8FAFC" stroke="#334155" stroke-width="3"/>
        <path d="M96 204 Q155 238 214 204 Z" fill="#E2E8F0" stroke="#334155" stroke-width="3"/>

        <g class="room-hotspot ${fTap ? 'is-fixed' : 'is-waste'}" data-item="0" tabindex="0" role="button" aria-label="Torneira da pia do banheiro">
          <rect x="92" y="155" width="95" height="65" fill="transparent"/>
          <path d="M136 204 V176 Q136 164 150 164 H166 V176" fill="none" stroke="#475569" stroke-width="8" stroke-linecap="round"/>
          <rect x="126" y="168" width="16" height="7" rx="3" fill="#0284C7"/>
          ${!fTap ? `
            <path class="anim-drop" d="M166 182 C161 192 161 198 166 200 C171 198 171 192 166 182 Z" fill="#0284C7"/>
            <ellipse cx="166" cy="208" rx="18" ry="4" fill="#38BDF8" opacity=".6"/>
          ` : ''}
          ${marker(166, 152, true, fTap, pf(0))}
        </g>

        <g class="room-hotspot" data-item="3" tabindex="0" role="button" aria-label="Copo com escova de dentes na bancada">
          <rect x="196" y="162" width="52" height="50" fill="transparent"/>
          <path d="M210 176 H236 L232 204 H214 Z" fill="#38BDF8" stroke="#0F172A" stroke-width="2.5" stroke-linejoin="round"/>
          <line x1="228" y1="160" x2="220" y2="196" stroke="#16A34A" stroke-width="4" stroke-linecap="round"/>
          <rect x="224" y="156" width="10" height="6" rx="2" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.5"/>
        </g>

        <g class="room-hotspot ${fToilet ? 'is-fixed' : 'is-waste'}" data-item="2" tabindex="0" role="button" aria-label="Vaso sanitário">
          <rect x="360" y="158" width="120" height="175" fill="transparent"/>
          <rect x="380" y="170" width="80" height="62" rx="8" fill="#F8FAFC" stroke="#334155" stroke-width="3.5"/>
          <rect x="374" y="164" width="92" height="12" rx="4" fill="#E2E8F0" stroke="#334155" stroke-width="3"/>
          <rect x="410" y="156" width="20" height="8" rx="3" fill="#94A3B8" stroke="#334155" stroke-width="2"/>
          <ellipse cx="420" cy="242" rx="48" ry="12" fill="#F8FAFC" stroke="#334155" stroke-width="3.5"/>
          <path d="M376 242 Q378 296 402 302 L394 330 H446 L438 302 Q462 296 464 242 Z" fill="#F8FAFC" stroke="#334155" stroke-width="3.5" stroke-linejoin="round"/>
          ${!fToilet ? `
            <path class="anim-stream" d="M406 248 Q420 262 434 248" fill="none" stroke="#0284C7" stroke-width="4" stroke-linecap="round"/>
            <path class="anim-drop" d="M420 185 V222" stroke="#38BDF8" stroke-width="4" stroke-dasharray="6 4"/>
          ` : ''}
          ${marker(462, 180, true, fToilet, pf(2))}
        </g>

        <g class="room-hotspot" data-item="4" tabindex="0" role="button" aria-label="Cesto de roupas acumuladas">
          <rect x="520" y="226" width="100" height="108" fill="transparent"/>
          <path d="M542 238 Q568 220 598 240" fill="#F472B6" stroke="#334155" stroke-width="2.5"/>
          <path d="M532 244 H608 L598 330 H542 Z" fill="#FDE68A" stroke="#78350F" stroke-width="3.5" stroke-linejoin="round"/>
          <line x1="540" y1="268" x2="600" y2="268" stroke="#B45309" stroke-width="2.5"/>
          <line x1="542" y1="296" x2="598" y2="296" stroke="#B45309" stroke-width="2.5"/>
        </g>

        <rect x="650" y="28" width="210" height="302" fill="#F0F9FF" opacity=".55" stroke="#64748B" stroke-width="3.5"/>
        <rect x="650" y="316" width="210" height="14" fill="#E2E8F0" stroke="#475569" stroke-width="3"/>

        <g class="room-hotspot ${fShower ? 'is-fixed' : 'is-waste'}" data-item="1" tabindex="0" role="button" aria-label="Chuveiro elétrico e registro">
          <rect x="670" y="40" width="180" height="270" fill="transparent"/>
          <path d="M860 66 H745" stroke="#475569" stroke-width="8" stroke-linecap="round"/>
          <path d="M718 66 H772 L762 84 H728 Z" fill="#94A3B8" stroke="#1E293B" stroke-width="3" stroke-linejoin="round"/>
          <circle cx="815" cy="195" r="14" fill="${fShower ? '#16A34A' : '#EF4444'}" stroke="#1E293B" stroke-width="3"/>
          <line x1="815" y1="185" x2="815" y2="205" stroke="#FFFFFF" stroke-width="3"/>
          ${!fShower ? `
            <g class="anim-stream" stroke="#0284C7" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="10 8">
              <line x1="730" y1="90" x2="716" y2="306"/>
              <line x1="745" y1="90" x2="745" y2="306"/>
              <line x1="760" y1="90" x2="774" y2="306"/>
            </g>
            <ellipse cx="745" cy="312" rx="45" ry="6" fill="#38BDF8" opacity=".6"/>
          ` : ''}
          ${marker(708, 76, true, fShower, pf(1))}
        </g>
      </svg>`;
    }

    if (roomId === 'cozinha') {
      const fFridge = f(0), fDishes = f(1), fOil = f(2);
      return `<svg viewBox="0 0 900 430" class="room-interactive-svg" role="img" aria-label="Ambiente da Cozinha">
        <rect width="900" height="330" fill="#FEF3C7"/>
        <rect y="140" width="900" height="80" fill="#FFFBEB" stroke="#FDE68A" stroke-width="2"/>
        <rect y="330" width="900" height="100" fill="#E2E8F0"/>
        <line x1="0" y1="330" x2="900" y2="330" stroke="#64748B" stroke-width="4"/>

        <g class="room-hotspot ${fFridge ? 'is-fixed' : 'is-waste'}" data-item="0" tabindex="0" role="button" aria-label="Geladeira">
          <rect x="48" y="54" width="190" height="278" fill="transparent"/>
          <rect x="58" y="62" width="136" height="268" rx="10" fill="#F8FAFC" stroke="#334155" stroke-width="3.5"/>
          <line x1="58" y1="146" x2="194" y2="146" stroke="#334155" stroke-width="3.5"/>
          <rect x="176" y="88" width="7" height="38" rx="3" fill="#64748B"/>
          ${fFridge ? `
            <rect x="176" y="168" width="7" height="56" rx="3" fill="#64748B"/>
          ` : `
            <rect x="70" y="152" width="114" height="168" fill="#BAE6FD"/>
            <line x1="70" y1="205" x2="184" y2="205" stroke="#0284C7" stroke-width="3"/>
            <line x1="70" y1="260" x2="184" y2="260" stroke="#0284C7" stroke-width="3"/>
            <polygon points="194 146 248 168 248 344 194 330" fill="#E2E8F0" stroke="#334155" stroke-width="3.5" stroke-linejoin="round"/>
            <path class="anim-stream" d="M140 190 Q175 180 205 198 M135 240 Q175 230 212 248" fill="none" stroke="#0284C7" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="6 6"/>
          `}
          ${marker(212, 136, true, fFridge, pf(0))}
        </g>

        <g class="room-hotspot" data-item="4" tabindex="0" role="button" aria-label="Lixeiras de coleta separada">
          <rect x="258" y="246" width="110" height="86" fill="transparent"/>
          <rect x="266" y="262" width="44" height="68" rx="6" fill="#2563EB" stroke="#0F172A" stroke-width="2.5"/>
          <rect x="262" y="254" width="52" height="10" rx="4" fill="#1D4ED8" stroke="#0F172A" stroke-width="2"/>
          <rect x="318" y="262" width="44" height="68" rx="6" fill="#78350F" stroke="#0F172A" stroke-width="2.5"/>
          <rect x="314" y="254" width="52" height="10" rx="4" fill="#78350F" stroke="#0F172A" stroke-width="2"/>
        </g>

        <rect x="382" y="214" width="290" height="116" fill="#D97706" stroke="#451A03" stroke-width="3.5"/>
        <rect x="396" y="230" width="82" height="86" rx="4" fill="#F59E0B" stroke="#451A03" stroke-width="2.5"/>
        <rect x="488" y="230" width="82" height="86" rx="4" fill="#F59E0B" stroke="#451A03" stroke-width="2.5"/>
        <rect x="580" y="230" width="78" height="86" rx="4" fill="#F59E0B" stroke="#451A03" stroke-width="2.5"/>
        <rect x="374" y="200" width="306" height="16" rx="4" fill="#CBD5E1" stroke="#334155" stroke-width="3"/>
        <path d="M430 200 L440 232 H548 L558 200 Z" fill="#94A3B8" stroke="#334155" stroke-width="2.5"/>

        <g class="room-hotspot ${fDishes ? 'is-fixed' : 'is-waste'}" data-item="1" tabindex="0" role="button" aria-label="Pia de louça e torneira">
          <rect x="424" y="132" width="140" height="98" fill="transparent"/>
          <ellipse cx="472" cy="196" rx="26" ry="7" fill="#FFFFFF" stroke="#334155" stroke-width="2.5"/>
          <ellipse cx="472" cy="189" rx="26" ry="7" fill="#E0F2FE" stroke="#334155" stroke-width="2.5"/>
          <path d="M496 200 V152 Q496 138 512 138 H528 V152" fill="none" stroke="#475569" stroke-width="8" stroke-linecap="round"/>
          ${!fDishes ? `
            <line class="anim-stream" x1="528" y1="154" x2="528" y2="226" stroke="#0284C7" stroke-width="6" stroke-dasharray="10 6"/>
            <circle cx="512" cy="212" r="10" fill="#FFFFFF" opacity=".9"/><circle cx="536" cy="214" r="12" fill="#FFFFFF" opacity=".9"/>
          ` : ''}
          ${marker(528, 124, true, fDishes, pf(1))}
        </g>

        <g class="room-hotspot ${fOil ? 'is-fixed' : 'is-waste'}" data-item="2" tabindex="0" role="button" aria-label="Descarte de óleo de cozinha">
          <rect x="564" y="136" width="106" height="94" fill="transparent"/>
          ${fOil ? `
            <rect x="598" y="152" width="34" height="48" rx="6" fill="#FDE047" stroke="#0F172A" stroke-width="2.5"/>
            <rect x="607" y="142" width="16" height="10" rx="2" fill="#16A34A" stroke="#0F172A" stroke-width="2"/>
            <rect x="602" y="168" width="26" height="14" rx="2" fill="#FFFFFF"/>
          ` : `
            <g transform="translate(595,152) rotate(-55)">
              <rect x="-14" y="-22" width="28" height="44" rx="6" fill="#F59E0B" stroke="#0F172A" stroke-width="2.5"/>
              <rect x="-7" y="-32" width="14" height="10" fill="#78350F" stroke="#0F172A" stroke-width="2"/>
            </g>
            <path class="anim-stream" d="M572 170 Q554 192 544 222" fill="none" stroke="#D97706" stroke-width="5" stroke-linecap="round" stroke-dasharray="8 6"/>
          `}
          ${marker(626, 138, true, fOil, pf(2))}
        </g>

        <rect x="688" y="214" width="164" height="116" rx="6" fill="#F8FAFC" stroke="#334155" stroke-width="3.5"/>
        <rect x="708" y="242" width="124" height="68" rx="6" fill="#334155" stroke="#0F172A" stroke-width="2.5"/>

        <g class="room-hotspot" data-item="3" tabindex="0" role="button" aria-label="Panela tampada no fogão">
          <rect x="716" y="150" width="110" height="66" fill="transparent"/>
          <path d="M744 212 C748 202 758 202 762 212 C768 202 778 202 782 212" fill="none" stroke="#38BDF8" stroke-width="4" stroke-linecap="round"/>
          <rect x="730" y="172" width="76" height="36" rx="6" fill="#DC2626" stroke="#0F172A" stroke-width="3"/>
          <line x1="718" y1="184" x2="730" y2="184" stroke="#0F172A" stroke-width="5" stroke-linecap="round"/>
          <line x1="806" y1="184" x2="818" y2="184" stroke="#0F172A" stroke-width="5" stroke-linecap="round"/>
          <path d="M726 172 Q768 154 810 172 Z" fill="#94A3B8" stroke="#0F172A" stroke-width="2.5"/>
          <circle cx="768" cy="158" r="5" fill="#1E293B"/>
        </g>
      </svg>`;
    }

    if (roomId === 'sala') {
      const fTv = f(0), fOutlet = f(1), fLamp = f(2);
      return `<svg viewBox="0 0 900 430" class="room-interactive-svg" role="img" aria-label="Ambiente da Sala de Estar">
        <rect width="900" height="330" fill="#F1F5F9"/>
        <rect y="330" width="900" height="100" fill="#D97706"/>
        <line x1="0" y1="330" x2="900" y2="330" stroke="#78350F" stroke-width="4"/>
        <ellipse cx="450" cy="382" rx="280" ry="28" fill="#BAE6FD" stroke="#0284C7" stroke-width="3"/>

        <g class="room-hotspot ${fLamp ? 'is-fixed' : 'is-waste'}" data-item="2" tabindex="0" role="button" aria-label="Luminária de piso">
          <rect x="65" y="110" width="120" height="225" fill="transparent"/>
          ${!fLamp ? `<polygon points="102 170 154 170 205 330 50 330" fill="#FEF08A" opacity=".55"/>` : ''}
          <line x1="128" y1="170" x2="128" y2="330" stroke="#334155" stroke-width="6"/>
          <rect x="98" y="322" width="60" height="10" rx="4" fill="#334155"/>
          <polygon points="100 124 156 124 170 172 86 172" fill="${fLamp ? '#E2E8F0' : '#FDE047'}" stroke="#0F172A" stroke-width="3.5" stroke-linejoin="round"/>
          ${marker(168, 124, true, fLamp, pf(2))}
        </g>

        <g class="room-hotspot" data-item="4" tabindex="0" role="button" aria-label="Estante de livros">
          <rect x="206" y="220" width="110" height="110" fill="transparent"/>
          <rect x="214" y="232" width="94" height="98" rx="5" fill="#92400E" stroke="#451A03" stroke-width="3"/>
          <line x1="214" y1="280" x2="308" y2="280" stroke="#451A03" stroke-width="3"/>
          <rect x="224" y="244" width="12" height="34" fill="#EF4444" stroke="#0F172A" stroke-width="2"/>
          <rect x="238" y="248" width="12" height="30" fill="#3B82F6" stroke="#0F172A" stroke-width="2"/>
          <rect x="252" y="242" width="14" height="36" fill="#22C55E" stroke="#0F172A" stroke-width="2"/>
          <rect x="272" y="246" width="12" height="32" fill="#F59E0B" stroke="#0F172A" stroke-width="2" transform="rotate(10 278 262)"/>
        </g>

        <rect x="338" y="248" width="224" height="82" rx="6" fill="#B45309" stroke="#451A03" stroke-width="3.5"/>
        <rect x="352" y="262" width="92" height="54" rx="4" fill="#78350F"/>
        <rect x="456" y="262" width="92" height="54" rx="4" fill="#78350F"/>

        <g class="room-hotspot ${fTv ? 'is-fixed' : 'is-waste'}" data-item="0" tabindex="0" role="button" aria-label="Televisão na sala">
          <rect x="348" y="102" width="204" height="148" fill="transparent"/>
          <rect x="424" y="232" width="52" height="16" rx="3" fill="#334155"/>
          <rect x="442" y="218" width="16" height="16" fill="#334155"/>
          <rect x="356" y="110" width="188" height="110" rx="8" fill="#0F172A" stroke="#334155" stroke-width="4"/>
          ${fTv ? `
            <rect x="364" y="118" width="172" height="94" rx="4" fill="#1E293B"/>
          ` : `
            <rect x="364" y="118" width="172" height="94" rx="4" fill="#38BDF8"/>
            <circle cx="415" cy="162" r="22" fill="#FDE047"/>
            <path d="M364 195 Q420 170 470 195 T536 190 V212 H364 Z" fill="#22C55E"/>
            <g stroke="#F59E0B" stroke-width="3.5" stroke-linecap="round">
              <line x1="340" y1="102" x2="326" y2="90"/><line x1="560" y1="102" x2="574" y2="90"/>
            </g>
          `}
          ${marker(544, 114, true, fTv, pf(0))}
        </g>

        <g class="room-hotspot" data-item="3" tabindex="0" role="button" aria-label="Janela aberta com luz natural">
          <rect x="620" y="42" width="220" height="160" fill="transparent"/>
          <polygon points="640 190 820 190 870 330 590 330" fill="#FEF9C3" opacity=".38"/>
          <rect x="640" y="50" width="180" height="140" rx="8" fill="#BAE6FD" stroke="#334155" stroke-width="4"/>
          <circle cx="776" cy="92" r="22" fill="#FDE047"/>
          <path d="M640 165 Q690 140 740 165 T820 160 V190 H640 Z" fill="#4ADE80"/>
          <line x1="730" y1="50" x2="730" y2="190" stroke="#334155" stroke-width="3.5"/>
          <line x1="640" y1="120" x2="820" y2="120" stroke="#334155" stroke-width="3.5"/>
          <path d="M624 46 H654 L644 196 H620 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="2.5"/>
          <path d="M806 46 H836 L840 196 H816 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="2.5"/>
        </g>

        <g class="room-hotspot ${fOutlet ? 'is-fixed' : 'is-waste'}" data-item="1" tabindex="0" role="button" aria-label="Tomada e filtro de linha em stand-by">
          <rect x="640" y="254" width="160" height="96" fill="transparent"/>
          <rect x="668" y="268" width="44" height="32" rx="4" fill="#F8FAFC" stroke="#334155" stroke-width="2.5"/>
          <circle cx="682" cy="284" r="3" fill="#1E293B"/><circle cx="698" cy="284" r="3" fill="#1E293B"/>
          <rect x="700" y="330" width="86" height="20" rx="5" fill="#F8FAFC" stroke="#334155" stroke-width="2.5"/>
          ${fOutlet ? `
            <circle cx="716" cy="340" r="4" fill="#64748B"/>
          ` : `
            <path d="M690 284 Q690 336 704 338" fill="none" stroke="#1E293B" stroke-width="4"/>
            <rect x="734" y="314" width="18" height="18" rx="3" fill="#1E293B"/>
            <circle class="anim-drop" cx="716" cy="340" r="5" fill="#EF4444"/>
            <circle class="anim-drop" cx="530" cy="214" r="4" fill="#EF4444"/>
          `}
          ${marker(768, 306, true, fOutlet, pf(1))}
        </g>
      </svg>`;
    }

    const fHose = f(0), fBucket = f(1), fFire = f(2);
    return `<svg viewBox="0 0 900 430" class="room-interactive-svg" role="img" aria-label="Ambiente do Quintal e Calçada">
      <rect width="900" height="250" fill="#BAE6FD"/>
      <circle cx="96" cy="64" r="34" fill="#FDE047"/>
      <g fill="#FDE68A" stroke="#92400E" stroke-width="2.5">
        <rect x="20" y="176" width="500" height="74"/>
        <line x1="20" y1="196" x2="520" y2="196"/><line x1="20" y1="230" x2="520" y2="230"/>
        <line x1="80" y1="176" x2="80" y2="250"/><line x1="140" y1="176" x2="140" y2="250"/>
        <line x1="200" y1="176" x2="200" y2="250"/><line x1="260" y1="176" x2="260" y2="250"/>
        <line x1="320" y1="176" x2="320" y2="250"/><line x1="380" y1="176" x2="380" y2="250"/>
        <line x1="440" y1="176" x2="440" y2="250"/>
      </g>

      <polygon points="500 124 880 124 830 34 550 34" fill="#B45309" stroke="#451A03" stroke-width="3.5" stroke-linejoin="round"/>
      <rect x="524" y="124" width="332" height="136" fill="#F8FAFC" stroke="#334155" stroke-width="3.5"/>
      <rect x="568" y="152" width="68" height="58" rx="4" fill="#BAE6FD" stroke="#334155" stroke-width="3"/>

      <rect y="250" width="900" height="104" fill="#4ADE80"/>
      <line x1="0" y1="250" x2="900" y2="250" stroke="#15803D" stroke-width="3.5"/>
      <rect y="354" width="900" height="76" fill="#CBD5E1"/>
      <line x1="0" y1="354" x2="900" y2="354" stroke="#64748B" stroke-width="4"/>
      <line x1="180" y1="354" x2="150" y2="430" stroke="#94A3B8" stroke-width="2.5"/>
      <line x1="420" y1="354" x2="405" y2="430" stroke="#94A3B8" stroke-width="2.5"/>
      <line x1="660" y1="354" x2="670" y2="430" stroke="#94A3B8" stroke-width="2.5"/>

      <g class="room-hotspot" data-item="3" tabindex="0" role="button" aria-label="Placas de energia solar no telhado">
        <polygon points="590 46 785 46 812 112 565 112" fill="#0284C7" stroke="#0F172A" stroke-width="3" stroke-linejoin="round"/>
        <line x1="648" y1="46" x2="632" y2="112" stroke="#BAE6FD" stroke-width="2"/>
        <line x1="718" y1="46" x2="720" y2="112" stroke="#BAE6FD" stroke-width="2"/>
        <line x1="578" y1="78" x2="798" y2="78" stroke="#BAE6FD" stroke-width="2"/>
      </g>

      <g class="room-hotspot" data-item="4" tabindex="0" role="button" aria-label="Composteira doméstica">
        <rect x="64" y="198" width="92" height="78" rx="8" fill="#78350F" stroke="#451A03" stroke-width="3.5"/>
        <line x1="64" y1="224" x2="156" y2="224" stroke="#451A03" stroke-width="3"/>
        <line x1="64" y1="250" x2="156" y2="250" stroke="#451A03" stroke-width="3"/>
        <rect x="80" y="231" width="60" height="14" rx="3" fill="#FEF3C7"/>
        <path d="M110 198 V176 C110 166 124 166 124 176 C124 182 110 182 110 176 C110 166 96 166 96 176" fill="none" stroke="#15803D" stroke-width="4" stroke-linecap="round"/>
      </g>

      <g class="room-hotspot ${fHose ? 'is-fixed' : 'is-waste'}" data-item="0" tabindex="0" role="button" aria-label="Torneira de jardim e mangueira na calçada">
        <rect x="190" y="220" width="180" height="190" fill="transparent"/>
        <rect x="206" y="234" width="10" height="36" fill="#475569"/>
        <path d="M216 244 H228 V254" fill="none" stroke="#334155" stroke-width="6" stroke-linecap="round"/>
        ${fHose ? `
          <circle cx="222" cy="272" r="22" fill="none" stroke="#16A34A" stroke-width="8"/>
          <circle cx="222" cy="272" r="12" fill="none" stroke="#15803D" stroke-width="6"/>
        ` : `
          <path d="M228 254 C240 310 175 335 250 382" fill="none" stroke="#15803D" stroke-width="9" stroke-linecap="round"/>
          <ellipse cx="302" cy="390" rx="56" ry="14" fill="#38BDF8" opacity=".75"/>
          <g class="anim-stream" stroke="#0284C7" stroke-width="4" stroke-linecap="round" stroke-dasharray="8 6">
            <line x1="254" y1="382" x2="306" y2="372"/>
            <line x1="254" y1="382" x2="314" y2="388"/>
            <line x1="254" y1="382" x2="296" y2="400"/>
          </g>
        `}
        ${marker(268, 344, true, fHose, pf(0))}
      </g>

      <g class="room-hotspot" data-item="5" tabindex="0" role="button" aria-label="Vassoura apoiada no muro">
        <rect x="466" y="160" width="58" height="145" fill="transparent"/>
        <line x1="510" y1="164" x2="484" y2="270" stroke="#78350F" stroke-width="7" stroke-linecap="round"/>
        <polygon points="468 266 502 274 494 298 456 288" fill="#FACC15" stroke="#92400E" stroke-width="2.5" stroke-linejoin="round"/>
      </g>

      <g class="room-hotspot ${fBucket ? 'is-fixed' : 'is-waste'}" data-item="1" tabindex="0" role="button" aria-label="Balde de água de reuso">
        <rect x="392" y="242" width="96" height="106" fill="transparent"/>
        <path d="M408 274 H472 L464 338 H416 Z" fill="#0284C7" stroke="#0F172A" stroke-width="3" stroke-linejoin="round"/>
        ${fBucket ? `
          <rect x="402" y="264" width="76" height="12" rx="4" fill="#16A34A" stroke="#0F172A" stroke-width="3"/>
          <rect x="430" y="256" width="20" height="8" rx="3" fill="#15803D" stroke="#0F172A" stroke-width="2.5"/>
        ` : `
          <ellipse cx="440" cy="274" rx="32" ry="7" fill="#38BDF8" stroke="#0F172A" stroke-width="2.5"/>
          <g class="anim-drop" fill="#0F172A">
            <circle cx="428" cy="252" r="3"/><path d="M422 248 L434 256 M434 248 L422 256" stroke="#0F172A" stroke-width="1.5"/>
            <circle cx="452" cy="246" r="3"/><path d="M446 242 L458 250 M458 242 L446 250" stroke="#0F172A" stroke-width="1.5"/>
          </g>
        `}
        ${marker(476, 260, true, fBucket, pf(1))}
      </g>

      <g class="room-hotspot ${fFire ? 'is-fixed' : 'is-waste'}" data-item="2" tabindex="0" role="button" aria-label="Folhas secas no quintal">
        <rect x="694" y="190" width="136" height="156" fill="transparent"/>
        <ellipse cx="760" cy="322" rx="46" ry="14" fill="#78350F" stroke="#451A03" stroke-width="3"/>
        ${fFire ? `
          <circle cx="748" cy="316" r="10" fill="#16A34A"/><circle cx="768" cy="314" r="11" fill="#22C55E"/><circle cx="758" cy="306" r="9" fill="#4ADE80"/>
        ` : `
          <path class="anim-drop" d="M760 200 C735 235 785 255 760 280" fill="none" stroke="#64748B" stroke-width="14" stroke-linecap="round" opacity=".55"/>
          <path d="M760 248 C732 276 734 316 760 320 C786 316 788 276 760 248 Z" fill="#EA580C" stroke="#9A3412" stroke-width="3"/>
          <path d="M760 272 C746 290 748 314 760 318 C772 314 774 290 760 272 Z" fill="#FDE047"/>
        `}
        ${marker(796, 260, true, fFire, pf(2))}
      </g>
    </svg>`;
  }

  const Detective = {
    cfg() {
      if (currentDiff === 'easy') return { showHints: true, lives: 5, timeSec: 0, activeProblems: 12 };
      if (currentDiff === 'hard') return { showHints: false, lives: 2, timeSec: 55, activeProblems: 8 };
      return { showHints: false, lives: 3, timeSec: 90, activeProblems: 10 };
    },
    start() {
      clearTimer();
      const c = this.cfg();
      this.c = c;
      this.room = 0;
      this.fixed = new Set();
      this.preFixed = new Set();
      this.foundCount = 0;
      this.water = 0;
      this.kwh = 0;
      this.lives = c.lives;
      this.timeLeft = c.timeSec;
      this.locked = false;
      this.lastMsg = c.showHints
        ? 'Toque nos aparelhos com alerta (!) para consertar.'
        : 'Observe a cena! Tocar em itens que já estão corretos custa 1 vida.';
      this.lastCls = '';

      const allWastes = [];
      D.rooms.forEach(r => r.items.forEach((it, idx) => {
        if (it.waste) allWastes.push(`${r.id}:${idx}`);
      }));
      const shuffled = E.shuffle(allWastes);
      const preFixList = shuffled.slice(c.activeProblems);
      preFixList.forEach(k => {
        this.fixed.add(k);
        this.preFixed.add(k);
      });
      this.total = c.activeProblems;

      // Posiciona no primeiro cômodo que tenha problema ativo
      const firstActive = D.rooms.findIndex(r => r.items.some((x, j) => x.waste && !this.fixed.has(`${r.id}:${j}`)));
      if (firstActive >= 0) this.room = firstActive;

      this.render();
      if (c.timeSec > 0) {
        activeTimer = setInterval(() => {
          if (active !== 'detective' || this.locked) return;
          this.timeLeft--;
          const tEl = $('#det-timer');
          if (tEl) {
            tEl.textContent = `${this.timeLeft}s`;
            if (this.timeLeft <= 10) tEl.style.color = '#EF4444';
          }
          if (this.timeLeft <= 0) {
            this.locked = true;
            this.finish(false);
          }
        }, 1000);
      }
    },
    switchRoom(idx) {
      if (this.locked || idx === this.room || idx < 0 || idx >= D.rooms.length) return;
      if (stepTimeout) { clearTimeout(stepTimeout); stepTimeout = null; }
      this.room = idx;
      E.sfx('click');
      this.render();
    },
    render() {
      const room = D.rooms[this.room];
      const pct = Math.round(this.foundCount / this.total * 100);
      const roomLeft = room.items.filter((x, i) => x.waste && !this.fixed.has(`${room.id}:${i}`)).length;

      const tabs = D.rooms.map((r, idx) => {
        const left = r.items.filter((x, i) => x.waste && !this.fixed.has(`${r.id}:${i}`)).length;
        return `<button class="room-tab ${idx === this.room ? 'active' : ''}" role="tab" aria-selected="${idx === this.room}" data-room="${idx}" aria-label="Cômodo ${idx + 1}: ${r.name} (${left === 0 ? 'limpo' : left + ' pendentes'})">
          <span style="font-size:.72em;opacity:.7;margin-right:2px">[${idx + 1}]</span>
          <span>${r.name}</span>
          <span class="pill ${left === 0 ? 'pill-ok' : ''}">${left === 0 ? '✓' : left}</span>
        </button>`;
      }).join('');

      const hud = `${livesHTML(this.lives, this.c.lives)} ${this.c.timeSec > 0 ? `<span class="timer-pill" id="det-timer">${this.timeLeft}s</span>` : ''} <span>${this.foundCount}/${this.total}</span>`;

      area.innerHTML = `${header('Detetive da Casa', hud)}
        <div class="det-top-bar">
          <div class="room-tabs" role="tablist" aria-label="Cômodos da casa">${tabs}</div>
          <div class="det-metrics-inline">
            <span>${I.ui('water')} <strong>${E.fmt(this.water)} L</strong></span>
            <span>${I.ui('energy')} <strong>${E.fmt(this.kwh)} kWh</strong></span>
          </div>
        </div>

        <div class="scene-stage" role="tabpanel" aria-label="${room.name}: ${roomLeft} focos de desperdício restantes">
          ${renderRoomSVG(room.id, (k) => this.fixed.has(k), this.c.showHints, (k) => !this.preFixed.has(k) && this.fixed.has(k))}
        </div>

        <div class="det-status-bar ${this.lastCls}" id="det-feedback" aria-live="polite">
          <span>${this.lastMsg}</span>
        </div>`;

      $$('.room-tab', area).forEach(b => b.addEventListener('click', () => this.switchRoom(+b.dataset.room)));
      $$('.room-hotspot', area).forEach(g => {
        g.addEventListener('click', () => this.inspect(+g.dataset.item));
        g.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.inspect(+g.dataset.item); }
        });
      });
    },
    inspect(i) {
      if (this.locked) return;
      const room = D.rooms[this.room];
      const it = room.items[i];
      const key = `${room.id}:${i}`;

      if (it.waste && !this.fixed.has(key)) {
        this.fixed.add(key);
        this.foundCount++;
        this.water += it.water; this.kwh += it.kwh;
        E.sfx('ok');
        this.lastCls = 'ok';
        this.lastMsg = `✓ <strong>${it.label}:</strong> ${it.tip}`;
      } else if (it.waste && !this.preFixed.has(key) && this.fixed.has(key)) {
        E.sfx('click');
        this.lastCls = 'info';
        this.lastMsg = `✓ <strong>${it.label}:</strong> você já consertou este desperdício!`;
      } else {
        if (!this.c.showHints) {
          this.lives--;
          E.sfx('bad');
          this.lastCls = 'bad';
          this.lastMsg = `✕ <strong>Alarme falso (${it.label}):</strong> já está correto (-1 vida).`;
        } else {
          E.sfx('click');
          this.lastCls = 'info';
          this.lastMsg = `<strong>${it.label}:</strong> ${it.tip}`;
        }
      }

      if (this.lives <= 0) {
        this.locked = true;
        clearTimer();
        this.finish(false);
        return;
      }

      const roomDone = room.items.every((x, j) => !x.waste || this.fixed.has(`${room.id}:${j}`));
      if (this.foundCount === this.total) {
        this.locked = true;
        clearTimer();
        this.render();
        scheduleStep(() => this.finish(true), 650);
        return;
      }

      if (roomDone && it.waste) {
        const nextRoom = D.rooms.findIndex((r) => r.items.some((x, j) => x.waste && !this.fixed.has(`${r.id}:${j}`)));
        if (nextRoom >= 0) {
          this.locked = true;
          this.lastMsg += ` • <strong>${room.name} concluído! Indo para ${D.rooms[nextRoom].name}...</strong>`;
          this.render();
          scheduleStep(() => {
            this.room = nextRoom;
            this.locked = false;
            this.render();
          }, 850);
          return;
        }
      }

      this.render();
    },
    finish(won) {
      this.locked = true;
      clearTimer();
      const pct = Math.round(this.foundCount / this.total * 100);
      if (won) recordBest('detective', pct);
      endScreen({
        title: 'Detetive da Casa', pct, won,
        lines: [
          `Você eliminou <strong>${this.foundCount} de ${this.total} desperdícios</strong> no nível <strong>${DIFF_META[currentDiff].label}</strong>.`,
          `Economia estimada: <strong>${E.fmt(this.water)} L/mês</strong> e <strong>${E.fmt(this.kwh)} kWh/mês</strong>.`
        ],
        basePoints: 60,
        again: () => this.start()
      });
    }
  };

  /* =========================================================
     JOGO 3 — FLUXO LIMPO (AVANÇO AUTOMÁTICO AO CONECTAR A REDE)
     ========================================================= */
  const PIPE_SHAPES = {
    straight: [1, 0, 1, 0],
    corner:   [1, 1, 0, 0],
    tee:      [1, 1, 1, 0],
    cross:    [1, 1, 1, 1],
    block:    [0, 0, 0, 0]
  };

  const PIPE_LEVELS = {
    easy: [
      {
        size: 3, maxMoves: 14, timeSec: 0, title: 'Cisterna → Horta',
        grid: [
          [{ t: 'corner', r: 0 }, { t: 'corner', r: 0 }, { t: 'straight', r: 0 }],
          [{ t: 'straight', r: 1 }, { t: 'straight', r: 1 }, { t: 'corner', r: 2 }],
          [{ t: 'corner', r: 1 }, { t: 'corner', r: 2 }, { t: 'straight', r: 0 }]
        ]
      },
      {
        size: 3, maxMoves: 14, timeSec: 0, title: 'Lavadora → Quintal',
        grid: [
          [{ t: 'straight', r: 1 }, { t: 'corner', r: 1 }, { t: 'corner', r: 2 }],
          [{ t: 'straight', r: 1 }, { t: 'tee', r: 0 }, { t: 'straight', r: 0 }],
          [{ t: 'corner', r: 3 }, { t: 'straight', r: 0 }, { t: 'corner', r: 1 }]
        ]
      }
    ],
    medium: [
      {
        size: 4, maxMoves: 18, timeSec: 60, title: 'Rede Pluvial Residencial',
        grid: [
          [{ t: 'corner', r: 0 }, { t: 'corner', r: 0 }, { t: 'block', r: 0 }, { t: 'corner', r: 1 }],
          [{ t: 'straight', r: 0 }, { t: 'corner', r: 2 }, { t: 'corner', r: 0 }, { t: 'straight', r: 0 }],
          [{ t: 'block', r: 0 }, { t: 'straight', r: 1 }, { t: 'straight', r: 1 }, { t: 'corner', r: 3 }],
          [{ t: 'corner', r: 0 }, { t: 'tee', r: 1 }, { t: 'corner', r: 3 }, { t: 'straight', r: 0 }]
        ]
      },
      {
        size: 4, maxMoves: 18, timeSec: 60, title: 'Irrigação de Jardim',
        grid: [
          [{ t: 'straight', r: 1 }, { t: 'corner', r: 2 }, { t: 'straight', r: 0 }, { t: 'corner', r: 2 }],
          [{ t: 'corner', r: 2 }, { t: 'corner', r: 0 }, { t: 'block', r: 0 }, { t: 'straight', r: 1 }],
          [{ t: 'straight', r: 0 }, { t: 'tee', r: 2 }, { t: 'straight', r: 0 }, { t: 'corner', r: 0 }],
          [{ t: 'corner', r: 1 }, { t: 'block', r: 0 }, { t: 'corner', r: 3 }, { t: 'straight', r: 1 }]
        ]
      }
    ],
    hard: [
      {
        size: 5, maxMoves: 24, timeSec: 50, title: 'Adutora Principal',
        grid: [
          [{ t: 'corner', r: 0 }, { t: 'straight', r: 0 }, { t: 'corner', r: 0 }, { t: 'block', r: 0 }, { t: 'corner', r: 2 }],
          [{ t: 'block', r: 0 }, { t: 'corner', r: 1 }, { t: 'straight', r: 1 }, { t: 'corner', r: 2 }, { t: 'straight', r: 0 }],
          [{ t: 'corner', r: 0 }, { t: 'tee', r: 0 }, { t: 'corner', r: 3 }, { t: 'corner', r: 0 }, { t: 'block', r: 0 }],
          [{ t: 'straight', r: 1 }, { t: 'block', r: 0 }, { t: 'straight', r: 0 }, { t: 'straight', r: 1 }, { t: 'corner', r: 2 }],
          [{ t: 'corner', r: 1 }, { t: 'straight', r: 1 }, { t: 'corner', r: 3 }, { t: 'corner', r: 3 }, { t: 'straight', r: 0 }]
        ]
      },
      {
        size: 5, maxMoves: 24, timeSec: 45, title: 'Estação Pressurizada',
        grid: [
          [{ t: 'straight', r: 1 }, { t: 'block', r: 0 }, { t: 'corner', r: 1 }, { t: 'straight', r: 0 }, { t: 'corner', r: 2 }],
          [{ t: 'straight', r: 1 }, { t: 'corner', r: 2 }, { t: 'tee', r: 1 }, { t: 'block', r: 0 }, { t: 'straight', r: 1 }],
          [{ t: 'corner', r: 2 }, { t: 'straight', r: 0 }, { t: 'corner', r: 0 }, { t: 'corner', r: 1 }, { t: 'straight', r: 0 }],
          [{ t: 'block', r: 0 }, { t: 'corner', r: 3 }, { t: 'corner', r: 3 }, { t: 'straight', r: 0 }, { t: 'corner', r: 0 }],
          [{ t: 'corner', r: 0 }, { t: 'straight', r: 1 }, { t: 'block', r: 0 }, { t: 'corner', r: 2 }, { t: 'straight', r: 1 }]
        ]
      }
    ]
  };

  function getPorts(cell) {
    const base = PIPE_SHAPES[cell.t];
    const r = ((cell.r % 4) + 4) % 4;
    return [
      base[(4 - r) % 4],
      base[(5 - r) % 4],
      base[(6 - r) % 4],
      base[(7 - r) % 4]
    ];
  }

  function renderPipeTileSVG(cell, isWet) {
    if (cell.t === 'block') {
      return `<svg viewBox="0 0 80 80" class="pipe-svg" aria-hidden="true">
        <rect x="8" y="8" width="64" height="64" rx="12" fill="#CBD5E1"/>
        <polygon points="24 54 34 28 48 34 58 24 62 54" fill="#64748B"/>
      </svg>`;
    }
    const pipeColor = isWet ? '#0284C7' : '#94A3B8';
    const coreColor = isWet ? '#7DD3FC' : '#E2E8F0';
    const deg = cell.r * 90;

    let path = '';
    if (cell.t === 'straight') path = 'M40 0 V80';
    if (cell.t === 'corner')   path = 'M40 0 V40 H80';
    if (cell.t === 'tee')      path = 'M40 0 V80 M40 40 H80';
    if (cell.t === 'cross')    path = 'M40 0 V80 M0 40 H80';

    return `<svg viewBox="0 0 80 80" class="pipe-svg" aria-hidden="true">
      <g transform="rotate(${deg} 40 40)">
        <path d="${path}" fill="none" stroke="${pipeColor}" stroke-width="24" stroke-linecap="butt" stroke-linejoin="round"/>
        <path d="${path}" fill="none" stroke="${coreColor}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" ${isWet ? 'stroke-dasharray="10 6" class="anim-stream"' : ''}/>
        <circle cx="40" cy="40" r="11" fill="${pipeColor}"/>
      </g>
    </svg>`;
  }

  const Pipes = {
    start() {
      clearTimer();
      this.levels = PIPE_LEVELS[currentDiff];
      this.lvlIdx = 0;
      this.totalScore = 0;
      this.loadLevel();
    },
    loadLevel() {
      clearTimer();
      const def = this.levels[this.lvlIdx];
      this.def = def;
      this.size = def.size;
      this.moves = 0;
      this.maxMoves = def.maxMoves;
      this.timeLeft = def.timeSec;
      this.board = def.grid.map(row => row.map(c => ({ t: c.t, r: c.r })));
      this.wet = new Set();
      this.solved = false;
      this.locked = false;
      this.computeFlow();
      this.render();

      if (def.timeSec > 0) {
        activeTimer = setInterval(() => {
          if (active !== 'pipes' || this.solved || this.locked) return;
          this.timeLeft--;
          const el = $('#pipes-timer');
          if (el) {
            el.textContent = `${this.timeLeft}s`;
            if (this.timeLeft <= 10) el.style.color = '#EF4444';
          }
          if (this.timeLeft <= 0) {
            this.locked = true;
            this.finish(false);
          }
        }, 1000);
      }
    },
    computeFlow() {
      this.wet.clear();
      const N = this.size;
      const p0 = getPorts(this.board[0][0]);
      if (!p0[0] && !p0[3]) return false;

      const queue = [[0, 0]];
      this.wet.add('0,0');
      const dirs = [
        [-1, 0, 0, 2],
        [0, 1, 1, 3],
        [1, 0, 2, 0],
        [0, -1, 3, 1]
      ];

      while (queue.length > 0) {
        const [r, c] = queue.shift();
        const ports = getPorts(this.board[r][c]);
        for (const [dr, dc, myP, nbP] of dirs) {
          if (!ports[myP]) continue;
          const nr = r + dr, nc = c + dc;
          if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
          const key = `${nr},${nc}`;
          if (this.wet.has(key)) continue;
          const nbPorts = getPorts(this.board[nr][nc]);
          if (nbPorts[nbP]) {
            this.wet.add(key);
            queue.push([nr, nc]);
          }
        }
      }

      const endKey = `${N - 1},${N - 1}`;
      if (!this.wet.has(endKey)) return false;
      const endPorts = getPorts(this.board[N - 1][N - 1]);
      return !!(endPorts[1] || endPorts[2]);
    },
    handleArrowKey(key) {
      const N = this.size;
      let curR = 0, curC = 0;
      const activeEl = document.activeElement;
      if (activeEl && activeEl.dataset.r !== undefined && activeEl.dataset.c !== undefined) {
        curR = +activeEl.dataset.r;
        curC = +activeEl.dataset.c;
        if (key === 'ArrowUp' || key === 'KeyW' || key === 'w' || key === 'W') curR = Math.max(0, curR - 1);
        if (key === 'ArrowDown' || key === 'KeyS' || key === 's' || key === 'S') curR = Math.min(N - 1, curR + 1);
        if (key === 'ArrowLeft' || key === 'KeyA' || key === 'a' || key === 'A') curC = Math.max(0, curC - 1);
        if (key === 'ArrowRight' || key === 'KeyD' || key === 'd' || key === 'D') curC = Math.min(N - 1, curC + 1);
      }
      const nextBtn = $(`.pipe-cell[data-r="${curR}"][data-c="${curC}"]`, area);
      if (nextBtn) nextBtn.focus();
    },
    rotate(r, c) {
      if (this.solved || this.locked) return;
      const cell = this.board[r][c];
      if (cell.t === 'block') {
        E.sfx('bad');
        return;
      }
      cell.r = (cell.r + 1) % 4;
      this.moves++;
      E.sfx('click');
      const connected = this.computeFlow();

      if (connected) {
        this.solved = true;
        this.locked = true;
        clearTimer();
        E.sfx('win');
        this.totalScore++;
        this.render();
        const fb = $('#pipes-feedback');
        if (fb) {
          fb.className = 'det-status-bar ok';
          fb.innerHTML = `✓ <strong>Rede conectada em ${this.moves} giros!</strong> ${this.lvlIdx + 1 < this.levels.length ? 'Carregando próxima rede...' : 'Concluindo...'}`;
        }
        scheduleStep(() => {
          this.lvlIdx++;
          if (this.lvlIdx < this.levels.length) this.loadLevel();
          else this.finish(true);
        }, 950);
      } else if (this.moves >= this.maxMoves) {
        this.locked = true;
        clearTimer();
        this.render();
        this.finish(false);
      } else {
        this.render();
      }
    },
    render() {
      const N = this.size;
      const hud = `<span>Rede ${this.lvlIdx + 1}/${this.levels.length}</span> <span>Giros: <strong>${this.moves}/${this.maxMoves}</strong></span> ${this.def.timeSec > 0 ? `<span class="timer-pill" id="pipes-timer">${this.timeLeft}s</span>` : ''}`;

      area.innerHTML = `${header('Fluxo Limpo', hud)}
        <div class="pipes-card">
          <div class="pipes-bar">
            <span class="pipes-pill source-pill">↘ INÍCIO: Cisterna</span>
            <strong>${this.def.title}</strong>
            <span class="pipes-pill dest-pill ${this.solved ? 'active' : ''}">SAÍDA: Horta ↘</span>
          </div>

          <div class="pipes-grid ${this.solved ? 'solved' : ''}" style="grid-template-columns: repeat(${N}, 1fr)" role="grid" aria-label="Tabuleiro de tubulação ${N} por ${N}">
            ${this.board.map((row, r) => row.map((cell, c) => {
              const isWet = this.wet.has(`${r},${c}`);
              const isStart = r === 0 && c === 0;
              const isEnd = r === N - 1 && c === N - 1;
              return `<button class="pipe-cell ${isWet ? 'wet' : ''} ${cell.t === 'block' ? 'blocked' : ''} ${isStart ? 'start-cell' : ''} ${isEnd ? 'end-cell' : ''}"
                data-r="${r}" data-c="${c}" ${cell.t === 'block' || this.locked ? 'disabled' : ''}
                aria-label="Linha ${r + 1}, Coluna ${c + 1}: ${cell.t === 'block' ? 'Obstáculo fixo' : 'Cano giratório'}">
                ${isStart ? '<span class="cell-tag">INÍCIO</span>' : ''}
                ${isEnd ? '<span class="cell-tag end-tag">SAÍDA</span>' : ''}
                ${renderPipeTileSVG(cell, isWet)}
              </button>`;
            }).join('')).join('')}
          </div>
        </div>
        <div class="det-status-bar" id="pipes-feedback" aria-live="polite">
          <span>${this.solved ? 'Água fluindo com sucesso!' : 'Toque ou tecle Espaço para girar os canos em 90° e levar a água até a SAÍDA.'}</span>
        </div>`;

      $$('.pipe-cell', area).forEach(btn => {
        btn.addEventListener('click', () => this.rotate(+btn.dataset.r, +btn.dataset.c));
      });
    },
    finish(won) {
      this.locked = true;
      clearTimer();
      const pct = won ? 100 : Math.round((this.totalScore / this.levels.length) * 100);
      if (won) recordBest('pipes', 100);
      endScreen({
        title: 'Fluxo Limpo', pct, won,
        lines: [
          won
            ? `Você conectou todas as <strong>${this.levels.length} redes hidráulicas</strong> no nível <strong>${DIFF_META[currentDiff].label}</strong>!`
            : `Limite de giros ou tempo atingido (${this.totalScore}/${this.levels.length} redes concluídas).`
        ],
        basePoints: 55,
        again: () => this.start()
      });
    }
  };

  /* =========================================================
     JOGO 4 — DECISÕES CONTRA O RELÓGIO (AVANÇO AUTOMÁTICO)
     ========================================================= */
  const Quiz = {
    cfg() {
      if (currentDiff === 'easy') return { round: 6, lives: 4, timeSec: 20, maxLevel: 2 };
      if (currentDiff === 'hard') return { round: 10, lives: 2, timeSec: 8, maxLevel: 3 };
      return { round: 8, lives: 3, timeSec: 13, maxLevel: 3 };
    },
    start() {
      clearTimer();
      const c = this.cfg();
      this.c = c;
      const pool = D.quiz.filter(q => (q.level || 1) <= c.maxLevel);
      const sorted = currentDiff === 'hard'
        ? E.shuffle(pool).sort((a, b) => (b.level || 1) - (a.level || 1))
        : E.shuffle(pool);

      this.qs = sorted.slice(0, c.round).map((q) => {
        const order = E.shuffle(q.options.map((_, i) => i));
        return { ...q, order, scene: q.scene || 'earth' };
      });
      this.i = 0;
      this.score = 0;
      this.streak = 0;
      this.lives = c.lives;
      this.locked = false;
      this.render();
    },
    render() {
      clearTimer();
      this.locked = false;
      const q = this.qs[this.i];
      const c = this.c;
      this.timeLeft = c.timeSec;

      const dots = Array.from({ length: c.round }, (_, idx) =>
        `<span class="step-dot ${idx < this.i ? 'done' : idx === this.i ? 'current' : ''}"></span>`
      ).join('');

      const hud = `${livesHTML(this.lives, c.lives)} <span class="timer-pill" id="quiz-timer">${this.timeLeft}s</span> ${this.streak > 1 ? `<span class="combo-pill">x${this.streak}</span>` : ''}`;

      area.innerHTML = `${header('Decisões Rápidas', hud)}
        <div class="step-dots" aria-hidden="true">${dots}</div>
        <div class="quiz-card" data-speak-area>
          <div class="quiz-scene-banner">
            <div class="quiz-scene-art">${I.slide(q.scene)}</div>
            <div class="quiz-top">
              <span class="eyebrow">Situação ${this.i + 1} de ${c.round}</span>
              <p class="quiz-q">${E.t(q.q)}</p>
            </div>
            <button class="btn btn-ghost btn-sm" data-speak aria-label="Ouvir pergunta">${I.ui('speaker')}</button>
          </div>
          <div class="options">
            ${q.order.map((oi, k) => `<button class="option" data-opt="${oi}" data-idx="${k}" aria-label="Opção ${String.fromCharCode(65 + k)} ou tecla ${k + 1}: ${q.options[oi]}"><span class="opt-letter">${String.fromCharCode(65 + k)} <small style="font-size:.65em;opacity:.7">(${k + 1})</small></span> <span>${q.options[oi]}</span></button>`).join('')}
          </div>
          <div class="det-status-bar" id="quiz-feedback" aria-live="assertive">
            <span>Escolha a melhor atitude antes que o relógio zere (toque ou tecle 1-4 / A-D).</span>
          </div>
        </div>`;

      $$('.option', area).forEach(b => b.addEventListener('click', () => this.answer(+b.dataset.opt, b)));

      activeTimer = setInterval(() => {
        if (this.locked || active !== 'quiz') return;
        this.timeLeft--;
        const tEl = $('#quiz-timer');
        if (tEl) {
          tEl.textContent = `${this.timeLeft}s`;
          if (this.timeLeft <= 3) tEl.style.color = '#EF4444';
        }
        if (this.timeLeft <= 0) {
          this.answer(-1, null);
        }
      }, 1000);
    },
    answer(opt, btn) {
      if (this.locked) return;
      clearTimer();
      this.locked = true;
      const q = this.qs[this.i];
      const right = opt === q.answer;
      $$('.option', area).forEach(b => {
        b.disabled = true;
        if (+b.dataset.opt === q.answer) b.classList.add('correct');
      });
      if (!right) {
        if (btn) btn.classList.add('wrong');
        this.lives--;
        this.streak = 0;
      } else {
        this.score++;
        this.streak++;
      }
      E.sfx(right ? 'ok' : 'bad');
      const fb = $('#quiz-feedback');
      if (fb) {
        fb.className = 'det-status-bar ' + (right ? 'ok' : 'bad');
        const prefix = right
          ? (this.streak > 1 ? `✓ Certo! Combo x${this.streak}!` : '✓ Certo!')
          : (opt === -1 ? '✕ Tempo esgotado!' : '✕ Atenção:');
        fb.innerHTML = `<span><strong>${prefix}</strong> ${q.explain}</span>`;
      }

      scheduleStep(() => {
        if (this.lives <= 0) { this.finish(false); return; }
        this.i++;
        if (this.i < this.c.round) this.render();
        else this.finish(true);
      }, right ? 1050 : 1700);
    },
    finish(won) {
      this.locked = true;
      clearTimer();
      const pct = Math.round(this.score / this.c.round * 100);
      if (won) recordBest('quiz', pct);
      endScreen({
        title: 'Decisões Rápidas', pct, won,
        lines: [
          `Você acertou <strong>${this.score} de ${this.c.round}</strong> situações no nível <strong>${DIFF_META[currentDiff].label}</strong>.`
        ],
        basePoints: this.score * 7,
        again: () => this.start()
      });
    }
  };

  /* ---------------- ATALHOS DE TECLADO UNIFICADOS ---------------- */
  document.addEventListener('keydown', (e) => {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;

    if (active === 'sort' && !Sort.locked) {
      let n = parseInt(e.key, 10);
      if (isNaN(n) && e.code && e.code.startsWith('Numpad')) {
        n = parseInt(e.code.replace('Numpad', ''), 10);
      }
      if (n >= 1 && n <= Sort.binOrder.length) {
        const key = Sort.binOrder[n - 1];
        const btn = $(`.street-bin[data-bin="${key}"]`, area);
        if (btn && !btn.disabled) {
          e.preventDefault();
          Sort.choose(key, btn);
        }
      }
    } else if (active === 'quiz' && !Quiz.locked) {
      let k = -1;
      let n = parseInt(e.key, 10);
      if (isNaN(n) && e.code && e.code.startsWith('Numpad')) {
        n = parseInt(e.code.replace('Numpad', ''), 10);
      }
      if (n >= 1 && n <= 4) {
        k = n - 1;
      } else {
        const upper = e.key.toUpperCase();
        if (['A', 'B', 'C', 'D'].includes(upper)) {
          k = upper.charCodeAt(0) - 65;
        }
      }
      if (k >= 0) {
        const opts = $$('.option', area);
        if (opts[k] && !opts[k].disabled) {
          e.preventDefault();
          Quiz.answer(+opts[k].dataset.opt, opts[k]);
        }
      }
    } else if (active === 'detective' && !Detective.locked) {
      let n = parseInt(e.key, 10);
      if (isNaN(n) && e.code && e.code.startsWith('Numpad')) {
        n = parseInt(e.code.replace('Numpad', ''), 10);
      }
      if (n >= 1 && n <= D.rooms.length) {
        e.preventDefault();
        Detective.switchRoom(n - 1);
      }
    } else if (active === 'pipes' && !Pipes.solved && !Pipes.locked) {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'W', 's', 'S', 'a', 'A', 'd', 'D'].includes(e.key)) {
        e.preventDefault();
        Pipes.handleArrowKey(e.key);
      }
    }
  });

  E.onModeChange(() => {
    refreshHub();
    if (active === 'sort' && !Sort.locked) Sort.render();
    if (active === 'detective' && !Detective.locked) Detective.render();
    if (active === 'pipes' && !Pipes.locked) Pipes.render();
    if (active === 'quiz' && !Quiz.locked) Quiz.render();
  });

  window.EcoGames = {
    refreshHub,
    showHub,
    stop: clearTimer,
    getActive: () => active,
    getDiff: () => currentDiff
  };
  refreshHub();
})();
