// Fungsi untuk set cookie
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Fungsi untuk get cookie
function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}

let soundEnabled = false; // Default: Suara dimatikan

// Tombol untuk mengaktifkan/mematikan suara
const toggleSoundButton = document.getElementById("toggle-sound");

// Membaca cookie saat halaman dimuat untuk status suara
const savedSoundStatus = getCookie("soundEnabled");
if (savedSoundStatus === "true") {
  soundEnabled = true;
  if (toggleSoundButton) toggleSoundButton.textContent = "🔇";
} else {
  soundEnabled = false;
  if (toggleSoundButton) toggleSoundButton.textContent = "🔊";
}

if (toggleSoundButton) {
  toggleSoundButton.addEventListener("click", () => {
    soundEnabled = !soundEnabled; // Toggle status suara
    toggleSoundButton.textContent = soundEnabled ? "🔇" : "🔊"; // Ubah ikon tombol
    setCookie("soundEnabled", soundEnabled, 7); // Simpan status ke cookie selama 7 hari
  });
}

// Event untuk tautan di navbar
document.querySelectorAll("nav ul li a").forEach((link) => {
  link.addEventListener("mouseover", () => {
    if (soundEnabled) {
      speak(link.textContent);
    }
    link.style.color = "red"; // Ubah warna teks saat hover
  });
  link.addEventListener("mouseout", () => {
    link.style.color = ""; // Reset ke warna default CSS
  });
});

// Fungsi untuk membaca teks
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

// Inisialisasi tooltip Bootstrap 5 (jika menggunakan Bootstrap tooltip)
document.addEventListener("DOMContentLoaded", function () {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll("[title]"));
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });
});

// ===================
// Cookie Consent Banner
// ===================

function checkCookieConsent() {
  if (getCookie("cookieConsent") !== "accepted") {
    const banner = document.getElementById("cookie-consent-banner");
    if (banner) banner.style.display = "block";
  }
}

function acceptCookieConsent() {
  setCookie("cookieConsent", "accepted", 365);
  const banner = document.getElementById("cookie-consent-banner");
  if (banner) banner.style.display = "none";
}

function manageCookieConsent() {
  window.location.href = "cookie-settings.html";
}

document.addEventListener("DOMContentLoaded", () => {
  checkCookieConsent();

  const acceptBtn = document.getElementById("accept-cookie");
  if (acceptBtn) {
    acceptBtn.addEventListener("click", acceptCookieConsent);
  }

  const manageBtn = document.getElementById("manage-cookie");
  if (manageBtn) {
    manageBtn.addEventListener("click", manageCookieConsent);
  }
});

// ======= Login & Daftar Sederhana dengan localStorage =======

function toggleForms(event) {
  if (event) event.preventDefault();
  clearMessages();
  clearInputs();
  document.getElementById("register-section").classList.toggle("hidden");
  document.getElementById("login-section").classList.toggle("hidden");
  document.getElementById("welcome-section").classList.add("hidden");
}

function clearMessages() {
  const regMsg = document.getElementById("auth-message");
  const loginMsg = document.getElementById("auth-message-login");
  if (regMsg) regMsg.textContent = "";
  if (loginMsg) loginMsg.textContent = "";
}

function clearInputs() {
  const ids = [
    "reg-username",
    "reg-password",
    "reg-password-confirm",
    "login-username",
    "login-password",
  ];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
}

function register() {
  clearMessages();

  const username = document.getElementById("reg-username").value.trim();
  const password = document.getElementById("reg-password").value;
  const passwordConfirm = document.getElementById("reg-password-confirm").value;
  const msg = document.getElementById("auth-message");

  if (!username || !password || !passwordConfirm) {
    msg.textContent = "Semua kolom harus diisi.";
    return;
  }

  if (password !== passwordConfirm) {
    msg.textContent = "Password dan konfirmasi tidak cocok.";
    return;
  }

  if (localStorage.getItem("user_" + username)) {
    msg.textContent = "Username sudah terdaftar.";
    return;
  }

  localStorage.setItem("user_" + username, password);

  alert("Pendaftaran berhasil! Silakan login.");
  toggleForms();
}

function login() {
  clearMessages();

  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;
  const msg = document.getElementById("auth-message-login");

  if (!username || !password) {
    msg.textContent = "Semua kolom harus diisi.";
    return;
  }

  const storedPassword = localStorage.getItem("user_" + username);

  if (storedPassword === null) {
    msg.textContent = "Username tidak ditemukan.";
    return;
  }

  if (storedPassword !== password) {
    msg.textContent = "Password salah.";
    return;
  }

  document.getElementById("user-name").textContent = username;
  document.getElementById("register-section").classList.add("hidden");
  document.getElementById("login-section").classList.add("hidden");
  document.getElementById("welcome-section").classList.remove("hidden");
  clearInputs();

  saveLoggedInUser(username);
  loadMessages();
  showMainContent();
  hideAuthModal();
}

// Fungsi logout user
function logout() {
  document.getElementById("welcome-section").classList.add("hidden");
  document.getElementById("register-section").classList.remove("hidden");
  clearMessages();
  clearInputs();

  clearLoggedInUser();
  document.getElementById("forum-messages").innerHTML =
    '<p class="text-muted text-center">Silakan login untuk melihat pesan forum.</p>';
  hideMainContent();
  showAuthModal();
}

// ======= Fungsi tampil/sembunyi modal dan konten utama =======
function showAuthModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) modal.style.display = "flex";
}

function hideAuthModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) modal.style.display = "none";
}

function showMainContent() {
  const main = document.getElementById("main-content");
  if (main) main.style.display = "block";
}

function hideMainContent() {
  const main = document.getElementById("main-content");
  if (main) main.style.display = "none";
}

// ======= Forum Diskusi Sederhana dengan localStorage =======

const forumKey = "forumMessages";

function loadMessages() {
  const container = document.getElementById("forum-messages");
  container.innerHTML = "";

  let messages = JSON.parse(localStorage.getItem(forumKey)) || [];

  if (messages.length === 0) {
    container.innerHTML =
      '<p class="text-muted text-center">Belum ada pesan di forum.</p>';
    return;
  }

  messages.forEach((msg) => {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("mb-3", "p-2", "border", "rounded");
    msgDiv.style.backgroundColor = "#fff";
    msgDiv.innerHTML = `<strong>${escapeHtml(
      msg.username
    )}</strong> <small class="text-muted">[${new Date(
      msg.timestamp
    ).toLocaleString()}]</small><br>${escapeHtml(msg.text)}`;
    container.appendChild(msgDiv);
  });

  container.scrollTop = container.scrollHeight;
}

function postMessage() {
  const input = document.getElementById("forum-input");
  const text = input.value.trim();

  const username = getLoggedInUser();

  if (!username) {
    alert("Silakan login terlebih dahulu untuk mengirim pesan.");
    return;
  }

  if (!text) {
    alert("Pesan tidak boleh kosong.");
    return;
  }

  let messages = JSON.parse(localStorage.getItem(forumKey)) || [];

  messages.push({
    username: username,
    text: text,
    timestamp: Date.now(),
  });

  localStorage.setItem(forumKey, JSON.stringify(messages));
  input.value = "";
  loadMessages();
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ======= Simpan dan ambil user yang login dari localStorage =======
function saveLoggedInUser(username) {
  localStorage.setItem("loggedInUser", username);
}

function clearLoggedInUser() {
  localStorage.removeItem("loggedInUser");
}

function getLoggedInUser() {
  return localStorage.getItem("loggedInUser");
}

// ======= Inisialisasi saat halaman dimuat =======
document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = getLoggedInUser();
  if (loggedInUser) {
    document.getElementById("user-name").textContent = loggedInUser;
    document.getElementById("register-section").classList.add("hidden");
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("welcome-section").classList.remove("hidden");
    loadMessages();
    showMainContent();
    hideAuthModal();
  } else {
    // User belum login, tampilkan modal dan sembunyikan konten utama
    showAuthModal();
    hideMainContent();
  }
});