// Fungsi untuk set cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    const expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Fungsi untuk get cookie
function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

let soundEnabled = false; // Default: Suara dimatikan

// Tombol untuk mengaktifkan/mematikan suara
const toggleSoundButton = document.getElementById('toggle-sound');

// Membaca cookie saat halaman dimuat untuk status suara
const savedSoundStatus = getCookie("soundEnabled");
if (savedSoundStatus === "true") {
    soundEnabled = true;
    if (toggleSoundButton) toggleSoundButton.textContent = '🔇';
} else {
    soundEnabled = false;
    if (toggleSoundButton) toggleSoundButton.textContent = '🔊';
}

if (toggleSoundButton) {
   toggleSoundButton.addEventListener('click', () => {
      soundEnabled = !soundEnabled; // Toggle status suara
      toggleSoundButton.textContent = soundEnabled ? '🔇' : '🔊'; // Ubah ikon tombol
      setCookie("soundEnabled", soundEnabled, 7); // Simpan status ke cookie selama 7 hari
   });
}

// Event untuk tautan di navbar
document.querySelectorAll("nav ul li a").forEach(link => {
   link.addEventListener("mouseover", () => {
       if (soundEnabled) { // Hanya berbicara jika suara diaktifkan
           speak(link.textContent);
       }
       link.style.color = "red"; // Ubah warna teks saat hover
   });
   link.addEventListener("mouseout", () => {
       link.style.color = ""; // Reset ke warna default CSS (biasanya putih)
   });
});

// Fungsi untuk membaca teks
function speak(text) {
   const utterance = new SpeechSynthesisUtterance(text);
   window.speechSynthesis.speak(utterance);
}

// Inisialisasi tooltip Bootstrap 5 (jika menggunakan Bootstrap tooltip)
document.addEventListener('DOMContentLoaded', function () {
   var tooltipTriggerList = [].slice.call(document.querySelectorAll('[title]'));
   tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      new bootstrap.Tooltip(tooltipTriggerEl);
   });
});

// ===================
// Cookie Consent Banner
// ===================

// Fungsi menampilkan banner jika belum setuju cookie
function checkCookieConsent() {
    if (getCookie("cookieConsent") !== "accepted") {
        const banner = document.getElementById("cookie-consent-banner");
        if (banner) banner.style.display = "block";
    }
}

// Fungsi menyimpan persetujuan cookie
function acceptCookieConsent() {
    setCookie("cookieConsent", "accepted", 365);
    const banner = document.getElementById("cookie-consent-banner");
    if (banner) banner.style.display = "none";
}

// Fungsi tombol Kelola cookie
function manageCookieConsent() {
    // Contoh: arahkan ke halaman pengaturan cookie
    window.location.href = "cookie-settings.html";
}

// Event listener saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
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

// ===== Forum Diskusi =====

const forumForm = document.getElementById('forum-form');
const forumMessagesContainer = document.getElementById('forum-messages');

// Fungsi untuk format waktu sederhana
function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
}

// Fungsi render pesan forum
function renderForumMessages() {
  const messages = JSON.parse(localStorage.getItem('forumMessages')) || [];
  forumMessagesContainer.innerHTML = '';

  if (messages.length === 0) {
    forumMessagesContainer.innerHTML = '<p>Belum ada pesan. Jadilah yang pertama mengirim pesan!</p>';
    return;
  }

  messages.forEach(msg => {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('forum-message');

    msgDiv.innerHTML = `
      <div class="author">${escapeHTML(msg.name)}</div>
      <div class="time">${formatDate(msg.timestamp)}</div>
      <div class="text">${escapeHTML(msg.message).replace(/\n/g, '<br>')}</div>
    `;

    forumMessagesContainer.appendChild(msgDiv);
  });
}

// Fungsi escape HTML untuk keamanan XSS
function escapeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Event submit form forum
if (forumForm) {
  forumForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const nameInput = document.getElementById('forum-name');
    const messageInput = document.getElementById('forum-message');

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (name === '' || message === '') {
      alert('Nama dan pesan tidak boleh kosong!');
      return;
    }

    // Ambil pesan lama dari localStorage
    const messages = JSON.parse(localStorage.getItem('forumMessages')) || [];

    // Tambah pesan baru
    messages.push({
      name: name,
      message: message,
      timestamp: new Date().toISOString()
    });

    // Simpan kembali ke localStorage
    localStorage.setItem('forumMessages', JSON.stringify(messages));

    // Reset form
    forumForm.reset();

    // Render ulang pesan
    renderForumMessages();

    // Scroll ke bawah otomatis
    forumMessagesContainer.scrollTop = forumMessagesContainer.scrollHeight;
  });
}

// Render pesan saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  renderForumMessages();
});