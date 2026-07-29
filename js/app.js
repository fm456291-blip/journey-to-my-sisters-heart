// ===============================
// Cinematic Opening
// ===============================

window.addEventListener("load",()=>{
    const beat = document.getElementById("heartbeat");

if (beat) {
    beat.volume = 0.35;
    beat.play().catch(() => {});
}

    const opening=document.getElementById("opening-screen");

    setTimeout(()=>{

        opening.classList.add("hide");

    },3500);

});
/* ==========================================
   A Journey To My Sister's Heart
   Main JavaScript
========================================== */

// ===============================
// Typewriter Text
// ===============================

const message = [
    "Some people enter our lives as friends...",
    "Some become family...",
    "This is the story of someone I proudly call my sister ❤️"
];

const typewriter = document.getElementById("typewriter");

let line = 0;
let char = 0;

function typeEffect(){

    if(line >= message.length) return;

    if(char < message[line].length){

        typewriter.innerHTML += message[line].charAt(char);

        char++;

        setTimeout(typeEffect,60);

    }else{

        typewriter.innerHTML += "<br><br>";

        line++;

        char = 0;

        setTimeout(typeEffect,700);

    }

}

typeEffect();


// ===============================
// Create Stars
// ===============================

const stars = document.getElementById("stars");

for(let i=0;i<250;i++){

    const star=document.createElement("div");

    star.className="star";

    star.style.left=Math.random()*100+"%";

    star.style.top=Math.random()*100+"%";

    const size=Math.random()*3+1;

    star.style.width=size+"px";

    star.style.height=size+"px";

    star.style.animationDelay=Math.random()*5+"s";

    stars.appendChild(star);

}


// ===============================
// Button Click
// ===============================

document
.getElementById("startBtn")
.addEventListener("click",()=>{

    alert("✨ Welcome to the Journey... (Next chapter coming soon)");

});
