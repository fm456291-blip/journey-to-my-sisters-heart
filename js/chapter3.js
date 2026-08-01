// ==========================================
// Chapter 3 - Memory Wall
// ==========================================

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

// ---------- Stars ----------

const stars = document.getElementById("stars");

for(let i=0;i<220;i++){

    const star=document.createElement("div");

    star.className="star";

    const size=Math.random()*3+1;

    star.style.width=size+"px";
    star.style.height=size+"px";

    star.style.left=Math.random()*100+"%";
    star.style.top=Math.random()*100+"%";

    star.style.animationDelay=Math.random()*5+"s";

    stars.appendChild(star);

}

// ---------- Memories ----------

const memories = [

{
image:"../assets/images/image2.jpeg",
text:"This was one of those moments that still makes me smile. ❤️"
},

{
image:"../assets/images/image3.jpg",
text:"Some memories are priceless because they were spent with you."
},

{
image:"../assets/images/image4.jpeg",
text:"Life became brighter after you became part of it."
},

{
image:"../assets/images/image5.jpeg",
text:"Every laugh, every smile... still lives in my heart."
},

{
image:"../assets/images/image6.jpeg",
text:"You are not just my friend... you are my sister forever. 💖"
}

];

// ---------- Elements ----------

const photos=document.querySelectorAll(".photo");

const popup=document.getElementById("popup");

const popupImage=document.getElementById("popupImage");

const popupText=document.getElementById("popupText");

const close=document.getElementById("close");

// ---------- Typewriter ----------

function typeWriter(text){

popupText.innerHTML="";

let i=0;

function typing(){

if(i<text.length){

popupText.innerHTML+=text.charAt(i);

i++;

setTimeout(typing,30);

}

}

typing();

}

// ---------- Photo Click ----------

photos.forEach(photo=>{

photo.addEventListener("click",()=>{

const index=photo.dataset.index;

popup.style.display="flex";

popupImage.src=memories[index].image;

typeWriter(memories[index].text);

});

});

// ---------- Close ----------

close.onclick=()=>{

popup.style.display="none";

}

window.onclick=(e)=>{

if(e.target===popup){

popup.style.display="none";

}

}
// ==========================================
// GHAZAL VIDEO + PIANO CONTROL
// ==========================================

const ghazalVideo = document.getElementById("ghazalVideo");

if (ghazalVideo && music) {

    // Video PLAY → Piano OFF
    ghazalVideo.addEventListener("play", () => {

        music.pause();

    });


    // Video PAUSE → Piano ON
    ghazalVideo.addEventListener("pause", () => {

        if (!ghazalVideo.ended) {

            music.play().catch(() => {});

        }

    });


    // Video END → Piano ON
    ghazalVideo.addEventListener("ended", () => {

        music.currentTime = 0;

        music.play().catch(() => {});

    });

}