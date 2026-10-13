/* Perne — Russian / Kazakh translations.
   Russian text lives in index.html (so the page works without JS and is indexed in Russian).
   Kazakh text lives here, keyed by the element's data-i18n / data-i18n-attr key.
   STRINGS holds text that is only built in JavaScript (toasts, WhatsApp messages, labels). */
(() => {
  "use strict";

  const KK = {
    "meta.title": "Perne — Астанадағы домбыра мектебі",
    "meta.desc": "Perne — балаларға, жасөспірімдерге және ересектерге арналған домбыра мектебі. Астанада екі филиал, 10:00-ден 19:00-ге дейін.",
    "skip": "Негізгі мазмұнға өту",
    "logo.aria": "Perne — басты бет",
    "logo.sub": "Домбыра мектебі",
    "nav.aria": "Негізгі мәзір",
    "nav.footer": "Төменгі мәзір",
    "nav.about": "Мектеп туралы",
    "nav.programs": "Оқу",
    "nav.steps": "Қалай өтеді",
    "nav.gallery": "Галерея",
    "nav.contact": "Байланыс",
    "nav.cta": "Жазылу",
    "lang.aria": "Сайт тілі",

    "hero.eyebrow": "Домбыра мектебі · Астана",
    "hero.title": "Әр ішекте — <em>даланың үні</em>",
    "hero.lead": "Perne — балаларға, жасөспірімдерге және ересектерге арналған домбыра мектебі. Алғашқы қағыстан күйге дейін үйретеміз. Астанада екі филиал.",
    "hero.cta": "Сабаққа жазылу",
    "hero.wa": "WhatsApp-қа жазу",
    "hero.dombyraAria": "Интерактивті домбыра. Ойнау үшін ішектерді саусақпен сырғытыңыз.",
    "hero.hint": "Ішектерді сырғытып шертіңіз немесе пернені басыңыз — домбыра үн қатады",
    "stats.branches": "Астанада филиал",
    "stats.hours": "жұмыс уақыты",
    "stats.strings": "ішек — бүкіл дала",

    "about.eyebrow": "Мектеп туралы",
    "about.title": "Шағын мектеп — <em>ұлы дәстүр</em>",
    "about.p1": "<strong>Перне</strong> — домбыраның мойнына байланған перне. Біз осы сөзді таңдадық, өйткені солай үйретеміз: қадам-қадаммен, әр қадам — таза.",
    "about.p2": "Біз тек домбыра үйретеміз және бар назарымызды соған береміз: қол қою, Құрманғазы мен Дина Нұрпейісованың күйлері, халық әндері және заманауи репертуар.",
    "about.v1t": "Негізі — дәстүр",
    "about.v1": "Күй, терме және халық әндері — әр сабақтың өзегі.",
    "about.v2t": "Әр шәкіртке назар",
    "about.v2": "Ұстаз әр шәкірттің өз қарқынын біледі.",
    "about.v3t": "Кез келген жасқа",
    "about.v3": "Балаларды, жасөспірімдерді және ересектерді үйретеміз — бастауға ешқашан кеш емес.",

    "prog.eyebrow": "Оқу",
    "prog.title": "Домбыра — <em>барлық жасқа</em>",
    "prog.sub": "Аудару үшін карточканы басыңыз немесе сырғытыңыз.",
    "prog.more": "Толығырақ ↻",
    "prog.price": "Бағасы мен кестесі — WhatsApp-та",
    "prog.choose": "Жазылу",
    "prog.kids": "Балаларға",
    "prog.kidsP": "Ойын түріндегі сабақтар: ырғақ, әндер және домбырадағы алғашқы әуендер.",
    "prog.kids1": "Қол қою",
    "prog.kids2": "Ырғақ пен музыкалық есту",
    "prog.kids3": "Халық әндері",
    "prog.teens": "Жасөспірімдерге",
    "prog.teensP": "Күйлер, техника және сенімді орындау — шындап ойнағысы келетіндерге.",
    "prog.teens1": "Қағыс техникасы",
    "prog.teens2": "Құрманғазы мен Тәттімбет күйлері",
    "prog.teens3": "Сахнаға дайындық",
    "prog.adults": "Ересектерге",
    "prog.adultsP": "Бұрын ойнамаған болсаңыз — тамаша, нөлден, өз қарқыныңызбен бастаймыз.",
    "prog.adults1": "Нөлден бастап",
    "prog.adults2": "Сүйікті әндер",
    "prog.adults3": "Алғашқы күйіңіз",

    "steps.eyebrow": "Оқу қалай өтеді",
    "steps.title": "Алғашқы күйге дейін <em>төрт қадам</em>",
    "steps.prev": "Артқа",
    "steps.next": "Алға",
    "steps.s1t": "Өтінім",
    "steps.s1": "WhatsApp-қа жазыңыз немесе форманы толтырыңыз — жауап беріп, ыңғайлы уақытты таңдаймыз.",
    "steps.s2t": "Танысу",
    "steps.s2": "Алғашқы сабақ: танысамыз, есту мен ырғақты тексереміз, домбыраны қолға аламыз.",
    "steps.s3t": "Сабақтар",
    "steps.s3": "Екі филиалдың бірінде тұрақты сабақтар, 10:00-ден 19:00-ге дейін.",
    "steps.s4t": "Алғашқы күй",
    "steps.s4": "Шығарманы басынан аяғына дейін тұтас орындайтын сол күн.",

    "gal.eyebrow": "Галерея",
    "gal.title": "Домбыра <em>жақыннан</em>",
    "gal.sub": "Ашу үшін суретті басыңыз. Сырғытып ауыстырыңыз.",
    "gal.c1": "Ре–соль бұрауындағы домбыра",
    "gal.t1": "Ре–соль бұрауы",
    "gal.c2": "Қос домбыра — дуэт",
    "gal.t2": "Дуэт",
    "gal.c3": "Қошқар мүйіз — домбыра шанағындағы ою-өрнек",
    "gal.c4": "Перне — мектебімізге ат берген байланған пернелер",
    "gal.t4": "Перне",
    "gal.c5": "Домбыраның басы және екі құлағы",
    "gal.t5": "Құлақтар",
    "gal.c6": "Үш буын — бір аспап",
    "gal.t6": "Үш буын",
    "lb.aria": "Галереяны қарау",
    "lb.close": "Жабу",
    "lb.prev": "Алдыңғы",
    "lb.next": "Келесі",

    "ig.title": "Мектепті <em>Instagram-да</em> бақылаңыз",
    "ig.lead": "Сабақтар, шәкірттердің өнері және мектеп өмірі.",

    "enr.eyebrow": "Жазылу",
    "enr.title": "Сабаққа <em>жазылыңыз</em>",
    "enr.lead": "WhatsApp-қа жазыңыз немесе форманы толтырыңыз — ол дайын хабарламамен WhatsApp-ты ашады.",
    "enr.hours": "Жұмыс уақыты:",
    "enr.call": "Қоңырау шалу ыңғайлы ма?",
    "br1.label": "1-филиал · Алматы ауданы",
    "br1.street": "Алексей Петров көшесі, 25",
    "br1.room": "3 қабат, 9 кабинет",
    "br1.area": "Алматы ауданы, Астана",
    "br2.label": "2-филиал · Есіл ауданы",
    "br2.street": "Сығанақ көшесі, 54а",
    "br2.room": "7 қабат, 708/2 кеңсе",
    "br2.area": "Есіл ауданы, Астана",
    "map.2gis": "2GIS-те ашу",
    "foot.city": "Астана",

    "form.name": "Атыңыз",
    "form.namePh": "Аружан",
    "form.phone": "Телефон",
    "form.who": "Кім оқиды",
    "form.child": "Бала",
    "form.teen": "Жасөспірім",
    "form.adult": "Ересек",
    "form.branch": "Филиал",
    "form.anyBranch": "Кез келген филиал",
    "form.submit": "WhatsApp арқылы жіберу",
    "form.note": "WhatsApp толтырылған өтініммен ашылады. Сайт ешнәрсе сақтамайды.",
    "toTop": "Жоғарыға",
  };

  const STRINGS = {
    ru: {
      "menu.open": "Открыть меню",
      "menu.close": "Закрыть меню",
      "slide": "Слайд",
      "wa.greeting": "Здравствуйте! Хочу записаться на урок домбры.",
      "wa.name": "Имя",
      "wa.phone": "Телефон",
      "wa.who": "Кто будет учиться",
      "wa.branch": "Филиал",
      "toast.invalid": "Укажите имя и номер телефона.",
      "toast.sent": "Рахмет, {name}! Нажмите «Отправить» в WhatsApp.",
    },
    kk: {
      "menu.open": "Мәзірді ашу",
      "menu.close": "Мәзірді жабу",
      "slide": "Слайд",
      "wa.greeting": "Сәлеметсіз бе! Домбыра сабағына жазылғым келеді.",
      "wa.name": "Аты",
      "wa.phone": "Телефон",
      "wa.who": "Кім оқиды",
      "wa.branch": "Филиал",
      "toast.invalid": "Атыңыз бен телефон нөміріңізді жазыңыз.",
      "toast.sent": "Рахмет, {name}! WhatsApp-та «Жіберу» батырмасын басыңыз.",
    },
  };

  const DICTS = { kk: KK };
  const STORE_KEY = "perne-lang";
  const textEls = [...document.querySelectorAll("[data-i18n]")];
  const attrEls = [...document.querySelectorAll("[data-i18n-attr]")];

  // Remember the Russian originals from the HTML
  const originalText = new Map(textEls.map((el) => [el, el.innerHTML]));
  const parseAttr = (el) => el.dataset.i18nAttr.split(",").map((p) => p.split(":").map((s) => s.trim()));
  const originalAttr = new Map(attrEls.map((el) => [el, Object.fromEntries(parseAttr(el).map(([a]) => [a, el.getAttribute(a)]))]));

  let lang = document.documentElement.lang === "kk" ? "kk" : "ru";
  const listeners = [];

  function apply(next) {
    lang = next;
    const dict = DICTS[lang];
    textEls.forEach((el) => {
      const v = dict && dict[el.dataset.i18n];
      el.innerHTML = v != null ? v : originalText.get(el);
    });
    attrEls.forEach((el) => {
      parseAttr(el).forEach(([attr, key]) => {
        const v = dict && dict[key];
        el.setAttribute(attr, v != null ? v : originalAttr.get(el)[attr]);
      });
    });
    document.documentElement.lang = lang;
    document.title = (dict && dict["meta.title"]) || originalText.get(document.querySelector("title"));
    document.querySelectorAll("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    document.documentElement.classList.remove("i18n-pending");
    listeners.forEach((fn) => fn(lang));
  }

  window.I18N = {
    get lang() { return lang; },
    t(key, vars) {
      let s = (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.ru[key] || key;
      if (vars) Object.keys(vars).forEach((k) => { s = s.replace("{" + k + "}", vars[k]); });
      return s;
    },
    onChange(fn) { listeners.push(fn); },
    set(next) {
      if (next === lang) return;
      try { localStorage.setItem(STORE_KEY, next); } catch (_) {}
      const main = document.body;
      main.classList.add("lang-fade");
      setTimeout(() => { apply(next); main.classList.remove("lang-fade"); }, 180);
    },
  };

  document.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => window.I18N.set(b.dataset.lang)));
  apply(lang);
})();
