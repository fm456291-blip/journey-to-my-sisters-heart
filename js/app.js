// ==========================================
// A Journey To My Sister's Heart
// Main JavaScript
// ==========================================


// ==========================================
// ELEMENTS
// ==========================================

const opening = document.getElementById("opening-screen");

const headphoneScreen =
    document.getElementById("headphone-screen");

const headphoneBtn =
    document.getElementById("headphoneBtn");

const beat =
    document.getElementById("heartbeat");

const startBtn =
    document.getElementById("startBtn");


// ==========================================
// OPENING SCREEN
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    setTimeout(() => {

        // Hide black opening screen
        opening.classList.add("hide");

        // Show headphone screen
        setTimeout(() => {

            headphoneScreen.classList.add("show");

        }, 1200);

    }, 3500);

});


// ==========================================
// HEADPHONE BUTTON
// ==========================================

headphoneBtn.addEventListener("click", () => {

    // Start heartbeat
    if (beat) {

        beat.volume = 0.35;

        beat.play().catch(() => {});

    }

    // Hide headphone screen
    headphoneScreen.classList.remove("show");

    // Start typewriter from beginning
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

const typewriter =
    document.getElementById("typewriter");

let line = 0;

let letter = 0;

function startTypewriter(){

    // Clear anything typed before
    typewriter.innerHTML = "";

    line = 0;

    letter = 0;

    typing();

}


function typing(){

    if(line >= messages.length){

        return;

    }

    if(letter < messages[line].length){

        typewriter.innerHTML +=
            messages[line].charAt(letter);

        letter++;

        setTimeout(typing,60);

    }

    else{

        typewriter.innerHTML += "<br><br>";

        line++;

        letter = 0;

        setTimeout(typing,700);

    }

}


// ==========================================
// STARS
// ==========================================

const stars =
    document.getElementById("stars");

for(let i = 0; i < 220; i++){

    const star =
        document.createElement("div");

    star.className = "star";

    const size =
        Math.random() * 3 + 1;

    star.style.width =
        size + "px";

    star.style.height =
        size + "px";

    star.style.left =
        Math.random() * 100 + "%";

    star.style.top =
        Math.random() * 100 + "%";

    star.style.animationDelay =
        Math.random() * 4 + "s";

    stars.appendChild(star);

}


// ==========================================
// START JOURNEY
// ==========================================

startBtn.addEventListener("click", () => {

    // Make sure heartbeat is playing
    if(beat && beat.paused){

        beat.play().catch(() => {});

    }

    window.location.href =
        "chapters/chapter1.html";

});