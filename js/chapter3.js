// ==========================================
// Chapter 3 - Memory Wall
// ==========================================


// ==========================================
// MUSIC
// ==========================================

const bgMusic = document.getElementById("bgMusic");

if (bgMusic) {

    bgMusic.volume = 0.60;

    // Try autoplay
    bgMusic.play().catch(() => {

        console.log("Music will start after user interaction.");

    });

}


// ==========================================
// STARS
// ==========================================

const stars = document.getElementById("stars");

if (stars) {

    for(let i = 0; i < 220; i++){

        const star = document.createElement("div");

        star.className = "star";

        const size = Math.random() * 3 + 1;

        star.style.width = size + "px";
        star.style.height = size + "px";

        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";

        star.style.animationDelay =
            Math.random() * 5 + "s";

        stars.appendChild(star);

    }

}


// ==========================================
// MEMORIES
// ==========================================

const memories = [

    {
        image: "../assets/images/image2.jpeg",
        text: "This was one of those moments that still makes me smile. ❤️"
    },

    {
        image: "../assets/images/image3.jpg",
        text: "Some memories are priceless because they were spent with you."
    },

    {
        image: "../assets/images/image4.jpeg",
        text: "Life became brighter after you became part of it."
    },

    {
        image: "../assets/images/image5.jpeg",
        text: "Every laugh, every smile... still lives in my heart."
    },

    {
        image: "../assets/images/image6.jpeg",
        text: "You are not just my friend... you are my sister forever. 💖"
    }

];


// ==========================================
// ELEMENTS
// ==========================================

const photos =
    document.querySelectorAll(".photo");

const popup =
    document.getElementById("popup");

const popupImage =
    document.getElementById("popupImage");

const popupText =
    document.getElementById("popupText");

const close =
    document.getElementById("close");


// ==========================================
// TYPEWRITER
// ==========================================

function typeWriter(text){

    popupText.innerHTML = "";

    let i = 0;

    function typing(){

        if(i < text.length){

            popupText.innerHTML +=
                text.charAt(i);

            i++;

            setTimeout(typing, 30);

        }

    }

    typing();

}


// ==========================================
// PHOTO CLICK
// ==========================================

photos.forEach(photo => {

    photo.addEventListener("click", () => {

        const index =
            photo.dataset.index;

        popup.style.display = "flex";

        popupImage.src =
            memories[index].image;

        typeWriter(
            memories[index].text
        );

    });

});


// ==========================================
// CLOSE POPUP
// ==========================================

if(close){

    close.onclick = () => {

        popup.style.display = "none";

    };

}


window.addEventListener("click", (e) => {

    if(e.target === popup){

        popup.style.display = "none";

    }

});


// ==========================================
// GHAZAL VIDEO
// ==========================================

const ghazalVideo =
    document.getElementById("ghazalVideo");


if(ghazalVideo && bgMusic){


    // --------------------------------------
    // VIDEO PLAY
    // PIANO OFF
    // --------------------------------------

    ghazalVideo.addEventListener("play", () => {

        console.log("Ghazal playing → Piano OFF");

        bgMusic.pause();

    });


    // --------------------------------------
    // VIDEO PAUSE
    // PIANO ON
    // --------------------------------------

    ghazalVideo.addEventListener("pause", () => {

        // Don't restart Piano if video finished
        if(!ghazalVideo.ended){

            console.log("Ghazal paused → Piano ON");

            bgMusic.play().catch(() => {});

        }

    });


    // --------------------------------------
    // VIDEO ENDED
    // PIANO ON
    // --------------------------------------

    ghazalVideo.addEventListener("ended", () => {

        console.log("Ghazal ended → Piano ON");

        bgMusic.play().catch(() => {});

    });

}