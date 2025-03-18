document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("mouseover", () => {
        speak(link.textContent); // Membaca teks tautan
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