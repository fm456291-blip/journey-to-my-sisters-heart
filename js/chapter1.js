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