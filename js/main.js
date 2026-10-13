/* Perne Music Academy — interactions
   Everything here is progressive: the page reads fine without JS. */
(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const I18N = window.I18N || { lang: "ru", t: (k) => k, onChange() {} };
  const t = (k, vars) => I18N.t(k, vars);

  /* ---------- Swipe helper ----------
     Calls handlers for horizontal drags; vertical movement is left to the
     browser (elements use `touch-action: pan-y`) so page scrolling still works. */
  function onSwipe(el, { move, end, threshold = 40 } = {}) {
    let start = null, axis = null, id = null;
    el.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      start = { x: e.clientX, y: e.clientY, t: performance.now() };
      axis = null; id = e.pointerId;
    });
    el.addEventListener("pointermove", (e) => {
      if (!start || e.pointerId !== id) return;
      const dx = e.clientX - start.x, dy = e.clientY - start.y;
      if (!axis && Math.hypot(dx, dy) > 8) {
        axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (axis === "x") { try { el.setPointerCapture(id); } catch (_) {} }
      }
      if (axis === "x" && move) move(dx, e);
    });
    const finish = (e) => {
      if (!start || e.pointerId !== id) return;
      const dx = e.clientX - start.x, dy = e.clientY - start.y;
      const fast = performance.now() - start.t < 260 && Math.abs(dx) > 20;
      if (axis === "x") {
        el.dataset.swiped = "1";
        setTimeout(() => delete el.dataset.swiped, 0);
        end && end(Math.abs(dx) > threshold || fast ? Math.sign(-dx) : 0, dx, dy);
      } else if (end && e.type === "pointerup" && axis === "y") {
        end(0, dx, dy);
      }
      start = null; axis = null;
    };
    el.addEventListener("pointerup", finish);
    el.addEventListener("pointercancel", (e) => { if (axis === "x") finish(e); else start = null; });
    // Swallow the click that follows a drag
    el.addEventListener("click", (e) => { if (el.dataset.swiped) { e.preventDefault(); e.stopPropagation(); } }, true);
  }

  /* ---------- Header: scrolled state, hide on scroll down ---------- */
  const header = $(".header");
  const toTop = $("#toTop");
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    header.classList.toggle("is-scrolled", y > 20);
    const menuOpen = document.body.classList.contains("menu-open");
    header.classList.toggle("is-hidden", !menuOpen && y > 400 && y > lastY + 4);
    if (y < lastY - 4) header.classList.remove("is-hidden");
    toTop.classList.toggle("is-shown", y > 900);
    lastY = y;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  /* ---------- Mobile menu ---------- */
  const burger = $("#burger"), nav = $("#nav");
  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", t(open ? "menu.close" : "menu.open"));
    document.body.classList.toggle("menu-open", open);
  };
  burger.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  I18N.onChange(() => burger.setAttribute("aria-label", t(nav.classList.contains("is-open") ? "menu.close" : "menu.open")));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("is-open")) setMenu(false); });
  // Swipe right on the open menu closes it
  onSwipe(nav, { end: (dir) => { if (dir === -1) setMenu(false); } });
  matchMedia("(min-width: 901px)").addEventListener("change", (m) => { if (m.matches) setMenu(false); });

  /* ---------- Current section in nav ---------- */
  const links = $$('.nav a[href^="#"]:not(.btn)');
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  links.forEach((a) => { const s = $(a.getAttribute("href")); if (s) sectionObs.observe(s); });

  /* ---------- Click ripple ---------- */
  document.addEventListener("pointerdown", (e) => {
    const el = e.target.closest(".btn, .round-btn, .lang button");
    if (!el) return;
    const r = el.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 2;
    const dot = document.createElement("span");
    dot.className = "ripple";
    Object.assign(dot.style, { width: size + "px", height: size + "px", left: e.clientX - r.left - size / 2 + "px", top: e.clientY - r.top - size / 2 + "px" });
    if (getComputedStyle(el).position === "static") el.style.position = "relative";
    el.style.overflow = "hidden";
    el.appendChild(dot);
    dot.addEventListener("animationend", () => dot.remove());
  });

  /* ---------- Reveal on scroll + counters ---------- */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("is-visible");
      revealObs.unobserve(en.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 70 + "ms";
    revealObs.observe(el);
  });

  const countObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target, target = +el.dataset.count, t0 = performance.now(), dur = reduceMotion ? 1 : 1600;
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + (p === 1 && target > 100 ? "+" : "");
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObs.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach((el) => countObs.observe(el));

  /* =========================================================
     Playable dombyra — Karplus–Strong plucked string synthesis
     ========================================================= */
  const dombyra = $("#playDombyra");
  if (dombyra) {
    const strings = $$("#liveStrings path");
    const group = $("#liveStrings");
    const NUT = 80, BRIDGE = 704, MID = (NUT + BRIDGE) / 2;
    const STRING_X = [95.5, 104.5];
    const OPEN = [146.83, 196.0];               // D3 and G3 — the common "kara" tuning, a fourth apart
    const FRETS = [115, 148, 179, 209, 237, 263, 288, 311, 333, 354, 374, 392, 410, 427, 442, 457];
    const NOTE_NAMES = ["до", "до♯", "ре", "ре♯", "ми", "фа", "фа♯", "соль", "соль♯", "ля", "ля♯", "си"];
    const OPEN_SEMI = [2, 7];                    // D and G

    let ctx = null, bus = null;
    const cache = new Map();
    const audio = () => {
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
        // Gentle body resonance + top-end softening, like a hollow wooden body
        const body = ctx.createBiquadFilter(); body.type = "peaking"; body.frequency.value = 260; body.Q.value = 1.2; body.gain.value = 5;
        const soft = ctx.createBiquadFilter(); soft.type = "lowpass"; soft.frequency.value = 4200;
        bus = ctx.createGain(); bus.gain.value = 0.55;
        body.connect(soft).connect(bus).connect(ctx.destination);
        bus._in = body;
      }
      if (ctx.state === "suspended") ctx.resume();
      return ctx;
    };
    const buffer = (freq) => {
      const key = freq.toFixed(2);
      if (cache.has(key)) return cache.get(key);
      const sr = ctx.sampleRate, len = Math.floor(sr * 2.4), N = Math.max(2, Math.round(sr / freq));
      const buf = ctx.createBuffer(1, len, sr), out = buf.getChannelData(0), ring = new Float32Array(N);
      let prev = 0;
      for (let i = 0; i < N; i++) { const r = Math.random() * 2 - 1; prev = prev * 0.45 + r * 0.55; ring[i] = prev; } // warmer excitation
      const decay = 0.9965;
      for (let i = 0, k = 0; i < len; i++) {
        const a = ring[k], b = ring[(k + 1) % N];
        out[i] = a;
        ring[k] = decay * 0.5 * (a + b);
        k = (k + 1) % N;
      }
      cache.set(key, buf);
      return buf;
    };
    const play = (freq, vel = 1) => {
      if (!audio()) return;
      const src = ctx.createBufferSource(), g = ctx.createGain();
      src.buffer = buffer(freq);
      g.gain.value = 0.9 * vel;
      src.connect(g).connect(bus._in);
      src.start();
    };

    // Visual vibration
    const ringing = [null, null];
    const animateString = (i, amp) => {
      ringing[i] = { amp, t0: performance.now() };
      strings[i].classList.add("is-ringing");
      if (!animateString.raf) animateString.raf = requestAnimationFrame(frame);
    };
    function frame(t) {
      let alive = false;
      ringing.forEach((r, i) => {
        if (!r) return;
        const age = (t - r.t0) / 1000;
        const a = r.amp * Math.exp(-age * 3.2);
        const x = STRING_X[i];
        if (a < 0.08 || reduceMotion) {
          strings[i].setAttribute("d", `M${x} ${NUT}Q${x} ${MID} ${x} ${BRIDGE}`);
          strings[i].classList.remove("is-ringing");
          ringing[i] = null;
          return;
        }
        alive = true;
        const off = a * Math.sin(age * 2 * Math.PI * 21);
        strings[i].setAttribute("d", `M${x} ${NUT}Q${(x + off).toFixed(2)} ${MID} ${x} ${BRIDGE}`);
      });
      animateString.raf = alive ? requestAnimationFrame(frame) : 0;
    }

    const toLocal = (e) => {
      const m = group.getScreenCTM();
      if (!m) return null;
      const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
      return { x: p.x, y: p.y };
    };
    const fretAt = (y) => (y <= NUT || y >= FRETS[FRETS.length - 1] + 8 ? 0 : 1 + FRETS.filter((f) => f < y).length);

    const popNote = (e, label) => {
      const n = document.createElement("span");
      n.className = "note-pop";
      n.textContent = "♪ " + label;
      n.style.left = e.clientX + "px";
      n.style.top = e.clientY + "px";
      n.style.setProperty("--dx", (Math.random() * 60 - 30).toFixed(0) + "px");
      document.body.appendChild(n);
      n.addEventListener("animationend", () => n.remove());
    };

    const pluck = (i, y, e, vel) => {
      const fret = fretAt(y);
      play(OPEN[i] * Math.pow(2, fret / 12), vel);
      animateString(i, 7 * vel + 2);
      if (e) popNote(e, NOTE_NAMES[(OPEN_SEMI[i] + fret) % 12]);
      if (navigator.vibrate && e && e.pointerType === "touch") navigator.vibrate(8);
    };

    let last = null, active = false, lastPluck = [0, 0];
    const inRange = (p) => p && p.y > NUT - 10 && p.y < BRIDGE + 10;

    dombyra.addEventListener("pointerdown", (e) => {
      active = true;
      last = toLocal(e);
      if (!inRange(last)) return;
      // Tap: pluck the nearest string if the finger is close to it
      const d = STRING_X.map((x) => Math.abs(last.x - x));
      const i = d[0] <= d[1] ? 0 : 1;
      if (d[i] < 26) { pluck(i, last.y, e, 0.9); lastPluck[i] = performance.now(); }
    });
    dombyra.addEventListener("pointermove", (e) => {
      if (!active) return;
      const p = toLocal(e);
      if (!p || !last) { last = p; return; }
      // Strum: pluck every string the pointer crossed since the last event
      STRING_X.forEach((x, i) => {
        if ((last.x - x) * (p.x - x) < 0 && inRange(p) && performance.now() - lastPluck[i] > 60) {
          const speed = Math.min(1, Math.abs(p.x - last.x) / 14);
          pluck(i, (p.y + last.y) / 2, e, 0.55 + 0.45 * speed);
          lastPluck[i] = performance.now();
        }
      });
      last = p;
    });
    const stop = () => { active = false; last = null; };
    dombyra.addEventListener("pointerup", stop);
    dombyra.addEventListener("pointercancel", stop);
    dombyra.addEventListener("pointerleave", stop);
  }

  /* =========================================================
     Programs: flip cards (click, Enter, swipe)
     ========================================================= */
  const cards = $$(".card");
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      const choose = e.target.closest("a[data-who]");
      if (choose) {
        const radio = $(`#enrollForm input[name="who"][value="${choose.dataset.who}"]`);
        if (radio) radio.checked = true;
        return;
      }
      card.classList.toggle("is-flipped");
    });
    card.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && e.target === card) { e.preventDefault(); card.classList.toggle("is-flipped"); }
    });
    card.style.touchAction = "pan-y";
    onSwipe(card, { end: (dir) => { if (dir) card.classList.toggle("is-flipped"); } });
  });

  /* =========================================================
     Slider (teachers + testimonials) — drag, swipe, buttons, dots, keys
     ========================================================= */
  function Slider(root, { track, dotsEl, prevNext, autoplay = 0 }) {
    const slides = [...track.children];
    let index = 0, timer = 0;
    root.tabIndex = 0;

    const metrics = () => {
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const w = slides[0].getBoundingClientRect().width + gap;
      const visible = Math.max(1, Math.floor((root.clientWidth + gap + 1) / w));
      return { w, max: Math.max(0, slides.length - visible), limit: Math.max(0, track.scrollWidth - root.clientWidth) };
    };
    const pos = (i) => { const m = metrics(); return Math.min(i * m.w, m.limit); };

    let dots = [];
    const buildDots = () => {
      if (!dotsEl) return;
      const { max } = metrics();
      dotsEl.innerHTML = "";
      dots = Array.from({ length: max + 1 }, (_, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", t("slide") + " " + (i + 1));
        b.addEventListener("click", () => { go(i); restart(); });
        dotsEl.appendChild(b);
        return b;
      });
    };

    const go = (i) => {
      const { max } = metrics();
      index = Math.max(0, Math.min(max, i));
      track.style.transform = `translate3d(${-pos(index)}px,0,0)`;
      dots.forEach((d, k) => d.classList.toggle("is-active", k === index));
    };
    const step = (dir) => {
      const { max } = metrics();
      go(index + dir > max ? 0 : index + dir < 0 ? max : index + dir);
    };

    const restart = () => {
      clearInterval(timer);
      if (autoplay && !reduceMotion) timer = setInterval(() => { if (!document.hidden) step(1); }, autoplay);
    };

    onSwipe(root, {
      threshold: 50,
      move: (dx) => {
        root.classList.add("is-dragging");
        const { limit } = metrics();
        let x = pos(index) - dx;
        if (x < 0) x *= 0.35; else if (x > limit) x = limit + (x - limit) * 0.35; // rubber band at the ends
        track.style.transform = `translate3d(${-x}px,0,0)`;
      },
      end: (dir) => { root.classList.remove("is-dragging"); go(index + dir); restart(); },
    });
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { step(1); restart(); }
      if (e.key === "ArrowLeft") { step(-1); restart(); }
    });
    if (prevNext) prevNext.forEach((b) => b.addEventListener("click", () => { step(+b.dataset.dir); restart(); }));
    root.addEventListener("mouseenter", () => clearInterval(timer));
    root.addEventListener("mouseleave", restart);

    let rt;
    addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { buildDots(); go(index); }, 120); });
    buildDots(); go(0); restart();
  }

  const sc = $("#stepsCarousel");
  if (sc) Slider(sc, { track: $(".carousel__track", sc), dotsEl: $("#stepsDots"), prevNext: $$(".carousel__ctrls .round-btn") });

  /* =========================================================
     Gallery lightbox — click to open, swipe sideways to browse,
     swipe down (or Esc) to close
     ========================================================= */
  const tiles = $$("#gallery-grid .tile");
  const lb = $("#lightbox"), stage = $("#lightboxStage"), caption = $("#lightboxCaption");
  let current = 0, opener = null;

  const render = (i, dir = 0) => {
    current = (i + tiles.length) % tiles.length;
    const clone = tiles[current].cloneNode(true);
    clone.removeAttribute("data-caption");
    clone.tabIndex = -1;
    clone.setAttribute("aria-hidden", "true");
    stage.replaceChildren(clone);
    caption.textContent = tiles[current].dataset.caption;
    if (dir && !reduceMotion) {
      stage.animate([{ transform: `translateX(${dir * 40}px)`, opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 350, easing: "cubic-bezier(.2,.7,.2,1)" });
    }
  };
  const openLb = (i) => {
    opener = document.activeElement;
    render(i);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    $(".lightbox__close", lb).focus();
  };
  const closeLb = () => {
    lb.hidden = true;
    document.body.style.overflow = "";
    stage.style.transform = "";
    if (opener) opener.focus();
  };
  tiles.forEach((t, i) => t.addEventListener("click", () => openLb(i)));
  $(".lightbox__close", lb).addEventListener("click", closeLb);
  $(".lightbox__nav--prev", lb).addEventListener("click", () => render(current - 1, -1));
  $(".lightbox__nav--next", lb).addEventListener("click", () => render(current + 1, 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowRight") render(current + 1, 1);
    if (e.key === "ArrowLeft") render(current - 1, -1);
    if (e.key === "Tab") { // keep focus inside the dialog
      const f = $$("button", lb).filter((b) => b.offsetParent !== null);
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Touch gestures inside the lightbox (both axes, so we handle them ourselves)
  (() => {
    let s = null;
    lb.style.touchAction = "none";
    lb.addEventListener("pointerdown", (e) => { if (!e.target.closest("button")) s = { x: e.clientX, y: e.clientY }; });
    lb.addEventListener("pointermove", (e) => {
      if (!s) return;
      const dx = e.clientX - s.x, dy = e.clientY - s.y;
      stage.style.transition = "none";
      stage.style.transform = Math.abs(dx) > Math.abs(dy) ? `translateX(${dx}px)` : `translateY(${Math.max(0, dy)}px)`;
      stage.style.opacity = Math.abs(dy) > Math.abs(dx) ? String(1 - Math.min(0.6, Math.max(0, dy) / 400)) : "1";
    });
    const end = (e) => {
      if (!s) return;
      const dx = e.clientX - s.x, dy = e.clientY - s.y;
      s = null;
      stage.style.transition = ""; stage.style.transform = ""; stage.style.opacity = "";
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) render(current + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
      else if (dy > 90) closeLb();
    };
    lb.addEventListener("pointerup", end);
    lb.addEventListener("pointercancel", end);
  })();

  /* ---------- WhatsApp links: greeting in the current language ---------- */
  const WHATSAPP = "https://wa.me/77479033089";
  const waUrl = (text) => WHATSAPP + "?text=" + encodeURIComponent(text);
  const updateWaLinks = () => $$("a[data-wa]").forEach((a) => { a.href = waUrl(t("wa.greeting")); });
  updateWaLinks();
  I18N.onChange(updateWaLinks);

  /* ---------- Enrollment form ---------- */
  const toast = $("#toast");
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("is-shown");
    clearTimeout(showToast.t);
    showToast.t = setTimeout(() => toast.classList.remove("is-shown"), 4200);
  };
  const form = $("#enrollForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameEl = form.elements.namedItem("name"), phoneEl = form.elements.namedItem("phone");
    const name = nameEl.value.trim();
    const phoneDigits = phoneEl.value.replace(/\D/g, "");
    let ok = true;
    [[nameEl, name.length >= 2], [phoneEl, phoneDigits.length >= 10]].forEach(([el, valid]) => {
      el.classList.remove("is-invalid");
      if (!valid) { void el.offsetWidth; el.classList.add("is-invalid"); ok = false; }
    });
    if (!ok) { showToast(t("toast.invalid")); return; }
    // No backend: the request is handed to the academy's WhatsApp, prefilled.
    const f = form.elements;
    const checked = (n) => $(`input[name="${n}"]:checked`, form);
    const label = (input) => input.nextElementSibling.textContent.trim();
    const branch = f.namedItem("branch");
    const text = [
      t("wa.greeting"),
      "",
      t("wa.name") + ": " + name,
      t("wa.phone") + ": " + phoneEl.value.trim(),
      t("wa.who") + ": " + label(checked("who")),
      t("wa.branch") + ": " + branch.options[branch.selectedIndex].text,
    ].join("\n");
    const url = waUrl(text);
    const win = window.open(url, "_blank");
    if (win) win.opener = null; else location.href = url;
    showToast(t("toast.sent", { name }));
    form.reset();
  });
  $$("input", form).forEach((el) => el.addEventListener("input", () => el.classList.remove("is-invalid")));

  const yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
