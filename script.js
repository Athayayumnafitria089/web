let soundEnabled = false; // Default: Suara dimatikan

// Tombol untuk mengaktifkan/mematikan suara
const toggleSoundButton = document.getElementById('toggle-sound');
if (toggleSoundButton) {
   toggleSoundButton.addEventListener('click', () => {
      soundEnabled = !soundEnabled; // Toggle status suara
      toggleSoundButton.textContent = soundEnabled ? '🔇' : '🔊'; // Ubah ikon tombol
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
       link.style.color = "black"; // Kembalikan warna teks saat mouse keluar
   });
});

// Fungsi untuk membaca teks
function speak(text) {
   const utterance = new SpeechSynthesisUtterance(text);
   window.speechSynthesis.speak(utterance);
}