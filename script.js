let soundEnabled = false; // Default: Suara dimatikan

// Tombol untuk mengaktifkan/mematikan suara
const toggleSoundButton = document.getElementById('toggle-sound');
toggleSoundButton.addEventListener('click', () => {
   soundEnabled = !soundEnabled; // Toggle status suara
   toggleSoundButton.textContent = soundEnabled ? 'Turn Sound Off' : 'Turn Sound On';
});

// Event untuk tautan di navbar
document.querySelectorAll("nav ul li a").forEach(link => {
   link.addEventListener("mouseover", () => {
       if (soundEnabled) { // Hanya berbicara jika suara diaktifkan
           speak(link.textContent);
       }
       link.style.color = "red";
   });
   link.addEventListener("mouseout", () => {
       link.style.color = "black";
   });
});

// Fungsi untuk membaca teks
function speak(text) {
   const utterance = new SpeechSynthesisUtterance(text);
   window.speechSynthesis.speak(utterance);
}