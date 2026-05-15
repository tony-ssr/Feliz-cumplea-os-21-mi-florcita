/* ═══════════════════════════════════════════════
   ✿ Para Mi Florcita — María Alejandra ✿
   Main Application Logic v2
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initLoading();
  initFloatingHearts();
  initNavbar();
  initRevealAnimations();
  initGallery();
  initLightbox();
  initMusicPlayer();
  initCarta();
  initReasons();
  initQuiz();
});

/* ── Loading Screen ── */
function initLoading() {
  const screen = document.getElementById('loadingScreen');
  const bar = document.getElementById('loadingBar');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) {
      progress = 100;
      bar.style.width = '100%';
      clearInterval(interval);
      setTimeout(() => screen.classList.add('hidden'), 600);
    } else {
      bar.style.width = progress + '%';
    }
  }, 250);
}

/* ── Floating Hearts ── */
function initFloatingHearts() {
  const container = document.getElementById('floatingHearts');
  const emojis = ['💛', '🌸', '🎵', '💕', '✨', '🌷', '💫', '🩷'];
  function spawnHeart() {
    const el = document.createElement('span');
    el.className = 'heart';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + '%';
    el.style.fontSize = (Math.random() * 0.8 + 0.8) + 'rem';
    el.style.animationDuration = (Math.random() * 8 + 10) + 's';
    el.style.animationDelay = (Math.random() * 2) + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), 20000);
  }
  for (let i = 0; i < 8; i++) setTimeout(spawnHeart, i * 600);
  setInterval(spawnHeart, 3000);
}

/* ── Navbar ── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');
  const sections = ['inicio', 'galeria', 'primera-cita', 'ramo', 'razones', 'quiz', 'carta'];

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    const scrollPos = window.scrollY + 200;
    sections.forEach(id => {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[data-section="${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  });

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(link.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* ── Reveal on Scroll ── */
function initRevealAnimations() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

function observeNew(el) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  obs.observe(el);
}

/* ══════════════════════════════════════
   ROMANTIC CAPTIONS — unique per photo
   ══════════════════════════════════════ */
const PHOTO_CAPTIONS = {
  ella: [
    '💛 Me pierdo en esta foto y no quiero que nadie me encuentre.',
    '🌸 Cada vez que te veo, descubro un nuevo motivo para amarte más.',
    '✨ Si la belleza tuviera nombre, el tuyo estaría en la primera página.',
    '💕 Esta sonrisa tuya tiene el poder de arreglarme el día entero.',
    '🌷 No necesito estrellas cuando tengo la luz de tus ojos.',
    '💫 Hasta en una foto simple eres la cosa más extraordinaria del mundo.',
    '🩷 ¿Cómo puedes ser tan perfecta sin siquiera intentarlo?',
    '💛 Esta imagen debería estar en un museo, sin exagerar.',
    '🌸 Me robaste el aliento y todavía no me lo has devuelto.',
    '✨ Cada detalle tuyo es una pequeña obra maestra.',
    '💕 Si pudiera detener el tiempo, lo detendría aquí, mirándote.',
    '🌷 Eres ese tipo de bonita que no se puede explicar, solo sentir.',
    '💫 La cámara te ama, pero no tanto como yo.',
    '🩷 No me canso de admirarte. Nunca me cansaré.',
    '💛 Tus ojos tienen más historias que todas las bibliotecas juntas.',
    '🌸 Aquí estás tú, siendo el atardecer más lindo que he visto.',
    '✨ Cada foto tuya es mi recordatorio de que los ángeles existen.',
    '💕 Esta eres tú: caos bonito, magia pura, amor sin filtro.',
    '🌷 Me pregunto si sabes lo hermosa que eres. Yo creo que no.',
    '💫 21 años del ser humano más increíble que ha pisado esta tierra.',
    '🩷 Mi foto favorita de mi persona favorita en todo el universo.'
  ],
  cita: [
    '💫 Aquí comenzó todo... el primer capítulo de nuestra historia infinita.',
    '💕 El día que dejamos de ser dos extraños y nos convertimos en destino.'
  ],
  ramo: [
    '🌷 El primer ramo de muchos... porque pienso llenarte de flores toda la vida.'
  ]
};

/* ── Gallery ── */
const GALLERY_DATA = {
  ella: { path: 'assets/images/fotos de ella/', count: 21 },
  cita: { path: 'assets/images/fotos de nuestra primera cita/', count: 2 },
  ramo: { path: 'assets/images/fotos del primer ramo que le di/', count: 1 }
};

let allGalleryImages = [];
let currentFilter = 'ella';

function initGallery() {
  Object.keys(GALLERY_DATA).forEach(cat => {
    const data = GALLERY_DATA[cat];
    for (let i = 1; i <= data.count; i++) {
      const num = String(i).padStart(2, '0');
      allGalleryImages.push({
        src: `${data.path}Foto_${num}.jpeg`,
        caption: PHOTO_CAPTIONS[cat][i - 1] || '💛 Te amo.',
        category: cat
      });
    }
  });
  renderGallery('ella');

  document.querySelectorAll('.gallery-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.filter;
      renderGallery(currentFilter);
    });
  });
}

function renderGallery(filter) {
  const grid = document.getElementById('galleryGrid');
  const images = filter === 'todas' ? allGalleryImages : allGalleryImages.filter(img => img.category === filter);
  grid.innerHTML = '';
  images.forEach((img, idx) => {
    const item = document.createElement('div');
    item.className = 'gallery-item reveal';
    item.dataset.index = idx;
    item.dataset.src = img.src;
    item.dataset.caption = img.caption;
    item.innerHTML = `
      <img src="${img.src}" alt="María Alejandra" loading="lazy">
      <div class="overlay"><span>${img.caption.substring(2)}</span></div>
    `;
    grid.appendChild(item);
    setTimeout(() => observeNew(item), 50);
  });

  grid.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => openLightbox(item.dataset.src, item.dataset.caption, filter));
  });
}

/* ── Lightbox ── */
let lightboxImages = [];
let lightboxIndex = 0;

function initLightbox() {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.getElementById('lightboxPrev').addEventListener('click', () => navigateLightbox(-1));
  document.getElementById('lightboxNext').addEventListener('click', () => navigateLightbox(1));
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // Make timeline and bouquet photos clickable
  document.querySelectorAll('[data-lightbox-src]').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
      openLightboxSingle(el.dataset.lightboxSrc, el.dataset.lightboxCaption);
    });
  });
}

function openLightbox(src, caption, filter) {
  const images = filter === 'todas' ? allGalleryImages : allGalleryImages.filter(img => img.category === filter);
  lightboxImages = images.map(i => ({ src: i.src, caption: i.caption }));
  lightboxIndex = lightboxImages.findIndex(i => i.src === src);
  if (lightboxIndex === -1) lightboxIndex = 0;
  showLightboxImage();
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function openLightboxSingle(src, caption) {
  lightboxImages = [{ src, caption }];
  lightboxIndex = 0;
  showLightboxImage();
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
  // Hide nav buttons for single images
  document.getElementById('lightboxPrev').style.display = 'none';
  document.getElementById('lightboxNext').style.display = 'none';
}

function showLightboxImage() {
  const item = lightboxImages[lightboxIndex];
  document.getElementById('lightboxImg').src = item.src;
  document.getElementById('lightboxCaptionText').textContent = item.caption;
  // Show/hide nav
  const showNav = lightboxImages.length > 1;
  document.getElementById('lightboxPrev').style.display = showNav ? '' : 'none';
  document.getElementById('lightboxNext').style.display = showNav ? '' : 'none';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
  showLightboxImage();
}

/* ── Music Player ── */
const MUSIC_DATA = [
  { folder: 'Café Tacvba - Eres (Album Version) (2002)', file: 'Café Tacvba - Eres (Album Version).mp3', song: 'Eres', artist: 'Café Tacvba' },
  { folder: 'Milo J - M.A.I (2023)', file: 'Milo J - M.A.I.mp3', song: 'M.A.I', artist: 'Milo J' },
  { folder: 'LUA - Pensando en Ti (2019)', file: 'LUA - Pensando en Ti.mp3', song: 'Pensando en Ti', artist: 'LUA' },
  { folder: 'Los Tranquilos - Mi Sol (2024)', file: 'Los Tranquilos - Mi Sol.mp3', song: 'Mi Sol', artist: 'Los Tranquilos' },
  { folder: 'Natanael Cano - Mi Bello Angel (2023)', file: 'Natanael Cano - Mi Bello Angel.mp3', song: 'Mi Bello Ángel', artist: 'Natanael Cano' },
  { folder: 'Red Hot Chili Peppers - I Could Die for You (2014 Remaster) (2002)', file: 'Red Hot Chili Peppers - I Could Die for You (2014 Remaster).mp3', song: 'I Could Die for You', artist: 'Red Hot Chili Peppers' },
  { folder: 'Terrateniente - Quiero (2017)', file: 'Terrateniente - Quiero.mp3', song: 'Quiero', artist: 'Terrateniente' },
  { folder: 'Marcos Menchaca - Viernes 13 (2017)', file: 'Marcos Menchaca - Viernes 13.mp3', song: 'Viernes 13', artist: 'Marcos Menchaca' },
  { folder: 'Gunda Merced Y Su Salsa Fever - Feliz Me Siento (1998)', file: 'Gunda Merced Y Su Salsa Fever - Feliz Me Siento.mp3', song: 'Feliz Me Siento', artist: 'Gunda Merced Y Su Salsa Fever' }
];

let audio = null, currentTrack = 0, isPlaying = false;

function initMusicPlayer() {
  audio = new Audio();
  document.getElementById('playerToggle').addEventListener('click', () => document.getElementById('playerPanel').classList.toggle('open'));
  document.getElementById('playBtn').addEventListener('click', togglePlay);
  document.getElementById('prevBtn').addEventListener('click', () => changeTrack(-1));
  document.getElementById('nextBtn').addEventListener('click', () => changeTrack(1));
  document.getElementById('playerProgress').addEventListener('click', e => {
    if (!audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  });
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) document.getElementById('playerProgressFill').style.width = (audio.currentTime / audio.duration * 100) + '%';
  });
  audio.addEventListener('ended', () => changeTrack(1));
  loadTrack(0);
}

function loadTrack(index) {
  currentTrack = index;
  const t = MUSIC_DATA[index];
  const base = 'assets/music/' + encodeURIComponent(t.folder) + '/';
  audio.src = base + encodeURIComponent(t.file);
  document.getElementById('playerCoverImg').src = base + 'cover.jpg';
  document.getElementById('playerSong').textContent = t.song;
  document.getElementById('playerArtist').textContent = t.artist;
  document.getElementById('playerProgressFill').style.width = '0%';
}

function togglePlay() {
  if (isPlaying) {
    audio.pause(); isPlaying = false;
    document.getElementById('playBtn').textContent = '▶';
    document.getElementById('playerToggle').classList.remove('playing');
  } else {
    audio.play().catch(() => { });
    isPlaying = true;
    document.getElementById('playBtn').textContent = '⏸';
    document.getElementById('playerToggle').classList.add('playing');
  }
}

function changeTrack(dir) {
  currentTrack = (currentTrack + dir + MUSIC_DATA.length) % MUSIC_DATA.length;
  loadTrack(currentTrack);
  if (isPlaying) audio.play().catch(() => { });
}

/* ── Birthday Letter ── */
function initCarta() {
  const body = document.getElementById('cartaBody');

  // Intentamos cargar el archivo externo
  fetch('assets/carta/carta de cumpleaños.txt')
    .then(r => {
      if (!r.ok) throw new Error('Archivo no encontrado');
      return r.text();
    })
    .then(text => {
      // Si el archivo existe, lo procesa
      const lines = text.split(/\r?\n/).filter(l => l.trim());
      body.innerHTML = lines.slice(1).map(p => `<p>${p.trim()}</p>`).join('');
    })
    .catch(() => {
      // Si falla el fetch, carga el mensaje de respaldo (Hardcoded)
      body.innerHTML = `
        <p>Mi amor, hoy cumples 21 años y, aunque para el mundo es solo un número, para mí es la celebración de la existencia de la mujer que, literalmente, cambió el rumbo de mi vida de un día para otro.</p>
        
        <p>Aún recuerdo con total claridad cuando te conocí en diciembre del año pasado. No esperaba que en un solo día mi mundo se transformara de esa manera. Conocí a una mujer maravillosa, con una energía que me deslumbró y una personalidad tan increíble que supe, desde ese primer instante, que eras alguien fuera de este mundo. Por eso tú eres mi gatita marcianita y yo soy tu gatito marcianito, porque nuestra conexión tiene una frecuencia que nadie más entiende.</p>
        
        <p>Desde que oficializamos lo nuestro en enero de este año, he descubierto un trasfondo del amor que nunca antes había visto. Con cada día a tu lado, siento la genuinidad de un sentimiento que hace que nazcan en mí cosas bellas que solo te pertenecen a ti. Te mereces a un hombre que te brinde seguridad, confianza y un amor incondicional, y quiero que sepas con total certeza que ese hombre soy yo. Daría mi vida entera para que nunca dejes de sentirte la mujer más amada del universo.</p>
        
        <p>Me siento extremadamente orgulloso de la mujer en la que te has convertido. Sé que no siempre ha sido fácil. Conozco un poco de tu pasado y de las crisis que te ha tocado enfrentar, y eso solo aumenta mi admiración por ti. Eres la mujer más fuerte, perseverante y resiliente que conozco. A pesar de cualquier dolor o dificultad, siempre tienes esa sonrisa dispuesta y esa determinación que te empuja a seguir adelante. Tienes un poder y una firmeza que a veces ni tú misma te crees, pero yo estoy aquí para recordártelo cada mañana.</p>
        
        <p>Admiro tu inteligencia, esa agilidad mental que me sorprende y me atrae cada vez más. Me encanta tu carisma y ese sentido del humor "un poco roto" que compartimos y que nos hace estallar de risa por tonterías que solo nosotros entendemos.</p>
        
        <p>Y qué decir de tu belleza... Me pierdo en tus ojos, que para mí son como dos perlas, dos estrellas que me iluminan y me seguirán enamorando siempre. Tu risa es mi sonido favorito en el mundo; cuando te escucho reír, confirmo que estoy con la mujer que quiero para toda mi vida. Todo en ti es perfecto para mí: tu rostro, tu cabello, tu nariz, tus cachetes... y tu cuerpo, que es sencillamente una obra de arte. No puedo, ni quiero, pensar en nadie más que no seas tú.</p>
        
        <p>Hemos vivido tanto en tan poco tiempo: nuestras charlas nocturnas hasta la madrugada, las vueltas en la moto, visitando lugares a lo largo de Nariño, jugando juntos, comiendo hasta no poder más, nuestras bromas y humor extremadamente rancio y roto, el apoyo en los días de estudio y trabajo... todo ha sido el preludio de la vida que quiero construir a tu lado. Si hay una vida después de esta, te juro que te buscaré para pasarla contigo nuevamente.</p>
        
        <p>Felices 21, mi vida. Me siento el hombre más afortunado por poder celebrar este día contigo y por tener la oportunidad de expresarte, aunque sea en una mínima parte, lo mucho que te amo. Eres mi presente y mi futuro.</p>
        
        <p><strong>Te amo mucho, María Alejandra, con todo mi corazón y con todo mi amor.</strong></p>
      `;
    });
}

// llamar a la función cuando cargue la página
window.onload = initCarta;

/* ── 21 Reasons ── */
function initReasons() {
  const reasons = [
    { emoji: '🌅', text: 'Porque tu risa es mi sonido favorito en el mundo entero, y cuando la escucho, todo lo demás deja de importar.' },
    { emoji: '🔥', text: 'Porque tienes una fuerza interior que mueve montañas, aunque a veces no te des cuenta de tu propio poder.' },
    { emoji: '🌙', text: 'Porque nuestras noches durmiendo juntos son las mejores y nunca las cambiaria por nada del mundo.' },
    { emoji: '🧠', text: 'Porque eres una mujer muy inteligente, y me encanta lo juiciosa que eres.' },
    { emoji: '🛸', text: 'Porque solo tú entiendes mis tonteras y siempre me sacas una sonrisa.' },
    { emoji: '🏍️', text: 'Porque disfruto salir contigo a cada lugar, ya sea lejos o cerca, todo es una aventura inolvidable contigo.' },
    { emoji: '😂', text: 'Porque nuestro humor roto y rancio es sagrado, y me encanta que podemos reírnos de absolutamente todo.' },
    { emoji: '👀', text: 'Porque tus ojos son dos universos donde me pierdo feliz cada vez que me miras.' },
    { emoji: '💪', text: 'Porque eres la mujer más resiliente que conozco, jamas piensas en rendirte asi tengas todo en contra.' },
    { emoji: '🍕', text: 'Porque comer contigo hasta no poder más es uno de los planes más perfectos que existen.' },
    { emoji: '🌻', text: 'Porque tu carisma ilumina cualquier lugar al que llegas, como si trajeras tu propio sol.' },
    { emoji: '🎮', text: 'Porque jugar contigo es muy divertido, al final si eres muy competitiva tambien djsahdkka' },
    { emoji: '🤗', text: 'Porque tus abrazos tienen el poder de curar cualquier día malo que haya tenido.' },
    { emoji: '📚', text: 'Porque me apoyas en mis días pesados, como si mis metas fueran también las tuyas.' },
    { emoji: '🌈', text: 'Porque desde que llegaste a mi vida, cada día se siente como descubrir un nuevo color.' },
    { emoji: '🫂', text: 'Porque me haces sentir seguro siendo vulnerable, y eso es algo que nadie más ha logrado.' },
    { emoji: '✈️', text: 'Porque contigo quiero recorrer cada rincón del mundo (No solo de Nariño djdsahkda).' },
    { emoji: '💎', text: 'Porque eres genuina en un mundo lleno de apariencias, y eso te hace invaluable.' },
    { emoji: '🌊', text: 'Porque incluso en las tormentas, contigo siento que siempre vamos a llegar a buen puerto.' },
    { emoji: '🔐', text: 'Porque me diste la confianza de ser tu persona segura, y esa responsabilidad la honro cada día.' },
    { emoji: '♾️', text: 'Porque si existieran más vidas después de esta, en todas y cada una de ellas te volvería a elegir.' }
  ];

  const grid = document.getElementById('reasonsGrid');
  reasons.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'reason-card reveal';
    card.innerHTML = `
      <span class="reason-emoji">${r.emoji}</span>
      <div class="reason-number">${i + 1}</div>
      <p class="reason-text">${r.text}</p>
    `;
    grid.appendChild(card);
    setTimeout(() => observeNew(card), 80 * i);
  });
}

/* ── Love Quiz ── */
const QUIZ_QUESTIONS = [
  {
    emoji: '📅', question: '¿En qué mes nos conocimos?',
    options: ['Noviembre 2025', 'Diciembre 2025', 'Enero 2026', 'Octubre 2025'],
    correct: 1
  },
  {
    emoji: '💑', question: '¿En qué mes oficializamos nuestra relación?',
    options: ['Diciembre 2025', 'Febrero 2026', 'Enero 2026', 'Marzo 2026'],
    correct: 2
  },
  {
    emoji: '🛸', question: '¿Cuál es nuestro apodo de pareja?',
    options: ['Ositos de miel', 'Gatitos marcianitos', 'Conejitos lunares', 'Perritos cósmicos'],
    correct: 1
  },
  {
    emoji: '🎂', question: '¿Cuántos años cumple María Alejandra hoy?',
    options: ['19', '20', '21', '22'],
    correct: 2
  },
  {
    emoji: '🏍️', question: '¿Cuál es una de nuestras actividades juntos?',
    options: ['Ir al cine', 'Vueltas en moto por Nariño', 'Pintar cuadros', 'Hacer yoga'],
    correct: 1
  },
  {
    emoji: '🌸', question: '¿Cómo le dice Antony a María Alejandra de cariño?',
    options: ['Mi princesa', 'Mi cielo', 'Mi florcita', 'Mi estrella'],
    correct: 2
  },
  {
    emoji: '🎵', question: '¿Cuál de estas canciones está en la playlist que te hice?',
    options: ['Despacito', 'Eres - Café Tacvba', 'Bohemian Rhapsody', 'Shape of You'],
    correct: 1
  }
];

let quizCurrent = 0, quizScore = 0;

function initQuiz() {
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const card = document.getElementById('quizCard');
  if (quizCurrent >= QUIZ_QUESTIONS.length) {
    showQuizResult();
    return;
  }
  const q = QUIZ_QUESTIONS[quizCurrent];
  let dots = '';
  for (let i = 0; i < QUIZ_QUESTIONS.length; i++) {
    const cls = i < quizCurrent ? 'done' : i === quizCurrent ? 'current' : '';
    dots += `<div class="quiz-dot ${cls}"></div>`;
  }
  let opts = '';
  q.options.forEach((o, i) => {
    opts += `<button class="quiz-option" data-idx="${i}">${o}</button>`;
  });
  card.innerHTML = `
    <div class="quiz-progress">${dots}</div>
    <div class="quiz-emoji">${q.emoji}</div>
    <p class="quiz-question">${q.question}</p>
    <div class="quiz-options">${opts}</div>
  `;
  card.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => handleQuizAnswer(btn, q.correct));
  });
}

function handleQuizAnswer(btn, correctIdx) {
  const all = document.querySelectorAll('.quiz-option');
  const chosen = parseInt(btn.dataset.idx);
  all.forEach(b => b.style.pointerEvents = 'none');
  if (chosen === correctIdx) {
    btn.classList.add('correct');
    quizScore++;
  } else {
    btn.classList.add('wrong');
    all[correctIdx].classList.add('correct');
  }
  setTimeout(() => { quizCurrent++; renderQuizQuestion(); }, 1200);
}

function showQuizResult() {
  const card = document.getElementById('quizCard');
  const pct = Math.round((quizScore / QUIZ_QUESTIONS.length) * 100);
  let emoji, title, text;
  if (pct === 100) {
    emoji = '👑💛'; title = '¡Perfecto, mi amor!';
    text = 'Sabía que lo sabías todo. Nadie nos conoce mejor que nosotros mismos. Eres la reina de este quiz y de mi corazón.';
  } else if (pct >= 70) {
    emoji = '🥰✨'; title = '¡Casi perfecto!';
    text = 'Nos conoces muy bien, mi vida. Cada respuesta correcta fue un abrazo para mi corazón.';
  } else {
    emoji = '💕🌸'; title = '¡Igual te amo!';
    text = 'No importa el puntaje, lo que importa es que estés aquí. Tenemos toda la vida para seguir conociéndonos.';
  }
  card.innerHTML = `
    <div class="quiz-result">
      <div class="quiz-result-emoji">${emoji}</div>
      <h3 class="quiz-result-title">${title}</h3>
      <p class="quiz-result-text">${text}</p>
      <p style="font-size:1.4rem;font-weight:700;color:var(--chocolate);margin-bottom:var(--espacio-xl)">${quizScore} / ${QUIZ_QUESTIONS.length}</p>
      <button class="quiz-restart" onclick="quizCurrent=0;quizScore=0;renderQuizQuestion()">Jugar de nuevo 🔄</button>
    </div>
  `;
}
