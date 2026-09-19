/* ============================================================
   Photogram clone — только два рабочих раздела: Лента и Профиль.
   Остальные кнопки в сайдбаре/шапке — просто дизайн, без функций.
   ============================================================ */

const MY_AVATAR = "assets/avatar.jpg";

const avatarSources = {
  alex: "https://images.pexels.com/photos/39421036/pexels-photo-39421036.jpeg?auto=compress&w=160&h=160&fit=crop",
  alexvibes: "https://images.pexels.com/photos/39421036/pexels-photo-39421036.jpeg?auto=compress&w=160&h=160&fit=crop",
  mira: "https://images.pexels.com/photos/38980165/pexels-photo-38980165.jpeg?auto=compress&w=160&h=160&fit=crop",
  mira_k: "https://images.pexels.com/photos/38980165/pexels-photo-38980165.jpeg?auto=compress&w=160&h=160&fit=crop",
  nova: "https://images.pexels.com/photos/6337789/pexels-photo-6337789.jpeg?auto=compress&w=160&h=160&fit=crop",
  nova_codes: "https://images.pexels.com/photos/6337789/pexels-photo-6337789.jpeg?auto=compress&w=160&h=160&fit=crop",
  dan: "https://images.pexels.com/photos/18923480/pexels-photo-18923480.jpeg?auto=compress&w=160&h=160&fit=crop",
  dan_travels: "https://images.pexels.com/photos/18923480/pexels-photo-18923480.jpeg?auto=compress&w=160&h=160&fit=crop",
  sofia: "https://images.pexels.com/photos/31066335/pexels-photo-31066335.jpeg?auto=compress&w=160&h=160&fit=crop",
  "sofia.d": "https://images.pexels.com/photos/31066335/pexels-photo-31066335.jpeg?auto=compress&w=160&h=160&fit=crop",
};

function avatarFor(seed) {
  return avatarSources[seed] || genAvatar(seed);
}

/* Генератор аватарки-заглушки (градиент + инициалы) для случайных
   аккаунтов в рекомендациях, историях и в ленте — так не нужно
   тянуть чужие настоящие фотографии людей. */
function genAvatar(seed) {
  const palettes = [
    ["#7ec8f2", "#3a6fb0"], ["#ffb26b", "#d6552b"], ["#8ee6a8", "#2f9e5c"],
    ["#c9a6f5", "#7a4bc4"], ["#f29ea6", "#c23c4a"], ["#f5d76e", "#c9930f"],
  ];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  const [from, to] = palettes[hash % palettes.length];
  const initials = seed.slice(0, 2).toUpperCase();
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>
    </linearGradient></defs>
    <circle cx="50" cy="50" r="50" fill="url(#g)"/>
    <text x="50" y="63" font-family="Arial,Helvetica,sans-serif" font-size="34"
      font-weight="700" fill="#fff" text-anchor="middle">${initials}</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

/* Случайные рекомендации — имена условные, фото сгенерированы. */
const people = [
  { id: "alexvibes", name: "alex.vibes", sub: "Рекомендовано для вас" },
  { id: "nova_codes", name: "nova.codes", sub: "Подписан на похожих" },
  { id: "mira_k", name: "mira_k", sub: "Новый аккаунт" },
  { id: "dan_travels", name: "dan.travels", sub: "Рекомендовано для вас" },
  { id: "sofia.d", name: "sofia.d", sub: "Подписан на похожих" },
].map(p => ({ ...p, img: avatarFor(p.id) }));

/* Домашняя лента — 2-3 видео от разных (условных) аккаунтов.
   Ссылки на видео — публичные демо-ролики, просто для примера. */
const feedPosts = [
  { id: "f1", user: "alex.vibes", avatar: avatarFor("alexvibes"), type: "video",
    src: "https://videos.pexels.com/video-files/39355913/16751924_1080_1920_30fps.mp4",
    caption: "Тихий океан и большая встреча", likes: 142, date: "2 ЧАСА НАЗАД",
    comments: [{ u: "mira_k", t: "🔥🔥" }] },
  { id: "f2", user: "nova.codes", avatar: avatarFor("nova_codes"), type: "video",
    src: "https://videos.pexels.com/video-files/10744326/10744326-hd_1080_1920_30fps.mp4",
    caption: "Вечерний дым над крышами", likes: 88, date: "5 ЧАСОВ НАЗАД",
    comments: [] },
  { id: "f3", user: "dan.travels", avatar: avatarFor("dan_travels"), type: "video",
    src: "https://videos.pexels.com/video-files/37505646/15890203_1080_1920_30fps.mp4",
    caption: "Солнечное поле в движении", likes: 57, date: "ВЧЕРА",
    comments: [{ u: "sofia.d", t: "класс!" }] },
  { id: "f4", user: "ozimandiius", avatar: MY_AVATAR, type: "photo",
    src: "https://images.pexels.com/photos/39443092/pexels-photo-39443092.jpeg?auto=compress&w=1260&h=750&dpr=1",
    caption: "Мягкий зелёный свет", likes: 74, date: "2 ДНЯ НАЗАД", comments: [] },
  { id: "f5", user: "ozimandiius", avatar: MY_AVATAR, type: "photo",
    src: "https://images.pexels.com/photos/39300564/pexels-photo-39300564.jpeg?auto=compress&w=1260&h=750&dpr=1",
    caption: "Спокойный день на пастбище", likes: 51, date: "3 ДНЯ НАЗАД", comments: [] },
];

/* Твой профиль — пара фото и одно видео для примера.
   Замени src на свои файлы/ссылки, когда будут готовы фото. */
const profilePosts = [
  { id: "p1", user: "ozimandiius", avatar: MY_AVATAR, type: "video",
    src: "https://videos.pexels.com/video-files/7198816/7198816-uhd_3840_2160_25fps.mp4",
    caption: "Ананасы в движении 🍍", likes: 12, date: "2 дня назад", comments: [] },
  { id: "p2", user: "ozimandiius", avatar: MY_AVATAR, type: "photo",
    src: "https://images.pexels.com/photos/39443092/pexels-photo-39443092.jpeg?auto=compress&w=1260&h=750&dpr=1",
    caption: "Мягкий зелёный свет", likes: 34, date: "5 дней назад",
    comments: [{ u: "nova.codes", t: "Красиво!" }] },
  { id: "p3", user: "ozimandiius", avatar: MY_AVATAR, type: "photo",
    src: "https://images.pexels.com/photos/39300564/pexels-photo-39300564.jpeg?auto=compress&w=1260&h=750&dpr=1",
    caption: "Спокойный день на пастбище", likes: 9, date: "1 неделю назад", comments: [] },
];

const savedLikes = localStorage.getItem("igLiked");
let liked = new Set(savedLikes === null ? ["f1", "f3"] : JSON.parse(savedLikes));
let following = new Set(JSON.parse(localStorage.getItem("igFollowing") || "[]"));

// currentList/currentIndex указывают, где сейчас открыт просмотрщик —
// в ленте или в сетке профиля — чтобы стрелки листали правильный список.
let currentList = profilePosts;
let currentIndex = 0;

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const icon = (name, className = "svg-icon") => `<svg class="${className}"><use href="#icon-${name}"></use></svg>`;
function save() {
  localStorage.setItem("igLiked", JSON.stringify([...liked]));
  localStorage.setItem("igFollowing", JSON.stringify([...following]));
}
function updateLikeUI(id) {
  const post = [...feedPosts, ...profilePosts].find(item => item.id === id);
  if (!post) return;
  const isLiked = liked.has(id);
  $$(`[data-like="${id}"]`).forEach(button => {
    button.innerHTML = icon("heart");
    button.classList.toggle("liked", isLiked);
  });
  $$(`[data-post="${id}"]`).forEach(item => {
    const likes = item.closest(".post")?.querySelector(".likes");
    if (likes) likes.textContent = `${(post.likes + (isLiked ? 1 : 0)).toLocaleString("ru-RU")} отметок «Нравится»`;
  });
}
function toast(t) {
  const x = $("#toast");
  x.textContent = t;
  x.classList.add("show");
  clearTimeout(window.__toast);
  window.__toast = setTimeout(() => x.classList.remove("show"), 1800);
}

/* ---------- Лента ---------- */
function renderFeedPost(p) {
  const l = p.likes + (liked.has(p.id) ? 1 : 0);
  const media = p.type === "youtube"
    ? `<video src="${p.src}" muted loop autoplay playsinline preload="auto"></video><span class="video-mark">▶</span>`
    : p.type === "video"
    ? `<video src="${p.src}" muted loop autoplay playsinline preload="auto"></video><span class="video-mark">▶</span>`
    : `<img src="${p.src}" alt="">`;
  return `<article class="post">
    <div class="post-head">
      <button class="post-user"><img class="post-avatar" src="${p.avatar}" alt=""><span><strong>${p.user}</strong></span></button>
      <button class="more">•••</button>
    </div>
    <div class="media-wrap" data-list="feed" data-post="${p.id}">${media}</div>
    <div class="post-actions">
      <button class="${liked.has(p.id) ? "liked" : ""}" data-like="${p.id}">${icon("heart")}</button>
      <button>${icon("comment")}</button><button>${icon("send", "svg-icon accent-icon")}</button><button class="save">${icon("bookmark")}</button>
    </div>
    <div class="likes">${l.toLocaleString("ru-RU")} отметок «Нравится»</div>
    <div class="caption"><b>${p.user}</b>${p.caption}</div>
    <button class="comments-link" data-list="feed" data-post="${p.id}">Посмотреть все комментарии (${p.comments.length})</button>
    <div class="post-time">${p.date}</div>
  </article>`;
}
function renderFeed() {
  $("#feed").innerHTML = feedPosts.map(renderFeedPost).join("");
  bindDynamic();
}

function renderSuggestions() {
  $("#suggestions").innerHTML = people.map(x => `
    <div class="suggestion">
      <img src="${x.img}">
      <div class="sugg-info"><b>${x.name}</b><span>${x.sub}</span></div>
      <button class="follow ${following.has(x.id) ? "following" : ""}" data-follow="${x.id}">${following.has(x.id) ? "Подписки" : "Подписаться"}</button>
    </div>`).join("");
  $$("[data-follow]").forEach(b => b.onclick = () => {
    const id = b.dataset.follow;
    following.has(id) ? following.delete(id) : following.add(id);
    save();
    renderSuggestions();
  });
}

function fillGeneratedAvatars() {
  $$('[data-gen]').forEach(img => { img.src = avatarFor(img.dataset.gen); });
}

/* ---------- Профиль ---------- */
function renderGrid() {
  $("#profileGrid").innerHTML = profilePosts.map(p => `
    <button class="grid-item" data-list="profile" data-post="${p.id}">
      ${p.type === "video"
        ? `<video src="${p.src}" muted playsinline preload="metadata"></video><span class="grid-video">▶</span>`
        : `<img src="${p.src}" alt="">`}
      <span class="grid-hover"><span>♥ ${p.likes + (liked.has(p.id) ? 1 : 0)}</span><span>💬 ${p.comments.length}</span></span>
    </button>`).join("");
  $$(".grid-item").forEach(x => x.onclick = () => openViewer("profile", x.dataset.post));
  $("#postCount").textContent = profilePosts.length;
  $$('[data-tab]').forEach(tab => tab.onclick = () => showProfileTab(tab.dataset.tab));
}

function showProfileTab(tabName) {
  $$('.profile-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.tab === tabName));
  $('#profileGrid').classList.toggle('hidden', tabName !== 'posts');
}

/* ---------- Общие обработчики (лайк, открытие поста, переход по разделам) ---------- */
function bindDynamic() {
  $$("[data-like]").forEach(b => b.onclick = e => {
    e.stopPropagation();
    const id = b.dataset.like;
    liked.has(id) ? liked.delete(id) : liked.add(id);
    save();
    updateLikeUI(id);
  });
  $$("[data-post]").forEach(x => x.onclick = () => openViewer(x.dataset.list, x.dataset.post));
  $$("[data-route]").forEach(x => x.onclick = () => showRoute(x.dataset.route));
}

function showRoute(route) {
  $("#homePage").classList.toggle("hidden", route !== "home");
  $("#profilePage").classList.toggle("hidden", route !== "profile");
  $$(".nav-item[data-route]").forEach(x => x.classList.toggle("active", x.dataset.route === route));
  $$(".mobile-nav-btn[data-route]").forEach(x => x.classList.toggle("active", x.dataset.route === route));
  if (route === "profile") {
    renderGrid();
    showProfileTab("posts");
  }
}

/* ---------- Просмотрщик (открытие фото/видео) ---------- */
function listFor(name) { return name === "feed" ? feedPosts : profilePosts; }

function openViewer(listName, id) {
  currentList = listFor(listName);
  currentIndex = currentList.findIndex(x => x.id === id);
  if (currentIndex < 0) return;
  const p = currentList[currentIndex];

  $("#viewerMedia").innerHTML = p.type === "video"
    ? `<video src="${p.src}" controls autoplay playsinline></video>`
    : `<img src="${p.src}" alt="">`;
  $("#viewerAvatar").src = p.avatar || MY_AVATAR;
  $("#viewerUser").textContent = p.user || "ozimandiius";
  $("#viewerCaption").innerHTML = `<b>${p.user || "ozimandiius"}</b> ${p.caption}`;
  $("#viewerComments").innerHTML = p.comments.length
    ? p.comments.map(c => `<p><b>${c.u}</b> ${c.t}</p>`).join("")
    : `<p style="color:#777">Комментариев пока нет.</p>`;
  $("#viewerLike").innerHTML = icon("heart");
  $("#viewerLike").classList.toggle("liked", liked.has(p.id));
  $("#viewerLikes").textContent = (p.likes + (liked.has(p.id) ? 1 : 0)).toLocaleString("ru-RU") + " отметок «Нравится»";
  open("viewer");
}
function step(n) {
  currentIndex = (currentIndex + n + currentList.length) % currentList.length;
  const listName = currentList === feedPosts ? "feed" : "profile";
  openViewer(listName, currentList[currentIndex].id);
}
function open(id) { $("#" + id).classList.remove("hidden"); }
function close(id) { $("#" + id).classList.add("hidden"); }

$("#viewerClose").onclick = () => close("viewer");
$("#viewerPrev").onclick = () => step(-1);
$("#viewerNext").onclick = () => step(1);
$("#viewer").onclick = e => { if (e.target.id === "viewer") close("viewer"); };
$("#viewerLike").onclick = () => {
  const p = currentList[currentIndex];
  liked.has(p.id) ? liked.delete(p.id) : liked.add(p.id);
  save();
  updateLikeUI(p.id);
  $("#viewerLike").classList.toggle("liked", liked.has(p.id));
  $("#viewerLikes").textContent = (p.likes + (liked.has(p.id) ? 1 : 0)).toLocaleString("ru-RU") + " отметок «Нравится»";
};
$("#commentForm").onsubmit = e => {
  e.preventDefault();
  const t = $("#commentInput").value.trim();
  if (!t) return;
  currentList[currentIndex].comments.push({ u: "ozimandiius", t });
  $("#commentInput").value = "";
  const listName = currentList === feedPosts ? "feed" : "profile";
  openViewer(listName, currentList[currentIndex].id);
  renderFeed();
  renderGrid();
};

document.addEventListener("keydown", e => {
  if ($("#viewer").classList.contains("hidden")) return;
  if (e.key === "Escape") close("viewer");
  if (e.key === "ArrowRight") step(1);
  if (e.key === "ArrowLeft") step(-1);
});

/* ---------- Профиль: пара мелких удобств (необязательные) ---------- */
$("#editProfile").onclick = () => {
  const n = prompt("Введите имя профиля:", "Отар Асланбек");
  if (n) toast("Имя профиля обновлено");
};
$("#shareProfile").onclick = () => {
  navigator.clipboard?.writeText(location.href).then(() => toast("Ссылка на профиль скопирована")).catch(() => toast("Профиль готов к публикации"));
};

/* Остальные кнопки (Поиск, Интересное, Reels, Сообщения, Уведомления,
   Создать, Ещё, ОТМЕТКИ/REELS-вкладки в профиле) сознательно оставлены
   без обработчиков — это просто макет интерфейса, как и просили. */

/* ---------- Старт ---------- */
fillGeneratedAvatars();
renderFeed();
renderSuggestions();
renderGrid();
showRoute("home");
