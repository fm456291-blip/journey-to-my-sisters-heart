// ==========================================
// A Journey To My Sister's Heart
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const opening = document.getElementById("opening-screen");
    const headphoneScreen = document.getElementById("headphone-screen");
    const headphoneBtn = document.getElementById("headphoneBtn");

    const beat = document.getElementById("heartbeat");

    const startBtn = document.getElementById("startBtn");
    const typewriter = document.getElementById("typewriter");


    // ==========================================
    // OPENING SCREEN
    // ==========================================

    setTimeout(() => {

        opening.classList.add("hide");

        // Show headphone screen
        headphoneScreen.style.display = "flex";

    }, 3500);


    // ==========================================
    // HEADPHONE BUTTON
    // ==========================================

    headphoneBtn.addEventListener("click", () => {

        console.log("HEADPHONE BUTTON CLICKED");

        // Start heartbeat
        if (beat) {

            beat.volume = 0.35;

            beat.currentTime = 0;

            beat.play()
                .then(() => {
                    console.log("HEARTBEAT PLAYING");
                })
                .catch(error => {
                    console.log("AUDIO ERROR:", error);
                });

        }

        // Hide headphone screen
        headphoneScreen.style.display = "none";

        // Start typing
        startTypewriter();

    });


    // ==========================================
    // TYPEWRITER
    // ==========================================

    const messages = [

        "Some people enter our lives as friends...",

        "Some become family...",

        "Kanwal... You became my sister ❤️"

    ];

    let line = 0;
    let letter = 0;


    function startTypewriter() {

        typewriter.innerHTML = "";

        line = 0;
        letter = 0;

        typing();

    }


    function typing() {

        if (line >= messages.length) {
            return;
        }

        if (letter < messages[line].length) {

            typewriter.innerHTML +=
                messages[line].charAt(letter);

            letter++;

            setTimeout(typing, 60);

        } else {

            typewriter.innerHTML += "<br><br>";

            line++;

            letter = 0;

            setTimeout(typing, 700);

        }

    }


    // ==========================================
    // STARS
    // ==========================================

    const stars = document.getElementById("stars");

    for (let i = 0; i < 220; i++) {

        const star = document.createElement("div");

        star.className = "star";

        const size = Math.random() * 3 + 1;

        star.style.width = size + "px";
        star.style.height = size + "px";

        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";

        star.style.animationDelay =
            Math.random() * 4 + "s";

        stars.appendChild(star);

    }


    // ==========================================
    // TOUCH THE STAR
    // ==========================================

    startBtn.addEventListener("click", () => {

        if (beat && beat.paused) {

            beat.play().catch(() => {});

        }

        window.location.href =
            "chapters/chapter1.html";

    });

});
// ==========================================
// PWA SERVICE WORKER
// ==========================================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./sw.js")
            .then(() => {

                console.log("PWA ready ❤️");

            })
            .catch(error => {

                console.log("PWA registration failed:", error);

            });

    });

}