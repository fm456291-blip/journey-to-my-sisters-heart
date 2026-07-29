// ==========================================
// A Journey To My Sister's Heart
// Main JavaScript
// ==========================================

// ---------- Opening Screen ----------

document.addEventListener("DOMContentLoaded", () => {

    const opening = document.getElementById("opening-screen");

    setTimeout(() => {

        opening.classList.add("hide");

        const beat = document.getElementById("heartbeat");

        if (beat) {
            beat.volume = 0.35;
            beat.play().catch(() => {});
        }

    }, 3500);

});
// ---------- Typewriter ----------

const messages = [

    "Some people enter our lives as friends...",

    "Some become family...",

    "Kanwal... You became my sister ❤️"

];

const typewriter = document.getElementById("typewriter");

let line = 0;
let letter = 0;

function typing() {

    if (line >= messages.length) return;

    if (letter < messages[line].length) {

        typewriter.innerHTML += messages[line].charAt(letter);

        letter++;

        setTimeout(typing, 60);

    } else {

        typewriter.innerHTML += "<br><br>";

        line++;

        letter = 0;

        setTimeout(typing, 700);

    }

}

typing();


// ---------- Stars ----------

const stars = document.getElementById("stars");

for (let i = 0; i < 220; i++) {

    const star = document.createElement("div");

    star.className = "star";

    const size = Math.random() * 3 + 1;

    star.style.width = size + "px";
    star.style.height = size + "px";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    star.style.animationDelay = Math.random() * 4 + "s";

    stars.appendChild(star);

}


// ---------- Button ----------

document.getElementById("startBtn").addEventListener("click", () => {

    alert("✨ Chapter 1 Coming Next... ❤️");

});
