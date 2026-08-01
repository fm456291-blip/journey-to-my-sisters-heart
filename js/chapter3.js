// ==========================================
// Chapter 3 - Beautiful Memories
// ==========================================

// -------- Piano Music --------

const music = document.getElementById("bgMusic");

window.addEventListener("DOMContentLoaded", () => {

    music.volume = 0.4;

    music.play().catch(() => {});

});

// -------- Stars --------

const stars = document.getElementById("stars");

for(let i=0;i<220;i++){

    const star=document.createElement("div");

    star.className="star";

    const size=Math.random()*3+1;

    star.style.width=size+"px";
    star.style.height=size+"px";

    star.style.left=Math.random()*100+"%";
    star.style.top=Math.random()*100+"%";

    star.style.animationDelay=Math.random()*4+"s";

    stars.appendChild(star);

}

// -------- Gallery --------

const images=[

    "../assets/images/image2.jpeg",
    "../assets/images/image3.jpg",
    "../assets/images/image4.jpeg",
    "../assets/images/image5.jpeg",
    "../assets/images/image6.jpeg"

];

const stories=[

    "Every memory with you became a beautiful chapter of my life ❤️",

    "Some moments were simple... but because you were there, they became unforgettable.",

    "Your smile always turned ordinary days into beautiful memories.",

    "Looking back at these moments always brings peace to my heart.",

    "I never imagined that one day someone would become my sister without sharing the same blood."

];

const image=document.getElementById("memoryImage");
const text=document.getElementById("memoryText");

let index=0;

// -------- Typing Effect --------

function typeStory(sentence){

    text.innerHTML="";

    let i=0;

    function type(){

        if(i<sentence.length){

            text.innerHTML+=sentence.charAt(i);

            i++;

            setTimeout(type,35);

        }

    }

    type();

}

typeStory(stories[0]);

// -------- Slideshow --------

setInterval(()=>{

    index++;

    if(index>=images.length){

        index=0;

    }

    image.style.opacity=0;

    setTimeout(()=>{

        image.src=images[index];

        image.style.opacity=1;

        typeStory(stories[index]);

    },500);

},7000);

// -------- Continue Button --------

document.getElementById("nextBtn").addEventListener("click",()=>{

    window.location.href="chapter4.html";

});