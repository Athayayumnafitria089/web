document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("mouseover", () => {
        link.style.color = "red";
    });
    link.addEventListener("mouseout", () => {
        link.style.color = "black";
    });
 });