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