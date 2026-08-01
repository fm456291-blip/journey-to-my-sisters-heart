 // =====================================
    // MUSIC
    // =====================================

    bgMusic.volume = 0.60;

    // Browser may block autoplay.
    // Music will start after first click if blocked.

    bgMusic.play().catch(() => {
        console.log("Music will start after user interaction.");
    });

    document.addEventListener("click", () => {

        if (bgMusic.paused) {
            bgMusic.play().catch(() => {});
        }

    }, { once: true });

const stars = document.getElementById("stars");

for (let i = 0; i < 250; i++) {

    const star = document.createElement("div");

    star.className = "star";

    star.style.left = Math.random() * 100 + "%";

    star.style.top = Math.random() * 100 + "%";

    const size = Math.random() * 3 + 1;

    star.style.width = size + "px";

    star.style.height = size + "px";

    star.style.animationDelay = Math.random() * 5 + "s";

    stars.appendChild(star);

}

document.getElementById("nextBtn").addEventListener("click", () => {
    window.location.href = "chapter2.html";
});