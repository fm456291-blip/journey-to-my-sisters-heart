// ==========================================
// Chapter 3 - Memory Wall
// ==========================================

// ---------- Piano Music ----------

const music = document.getElementById("bgMusic");

window.addEventListener("DOMContentLoaded", () => {

    music.volume = 0.35;

    music.play().catch(() => {});

});

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
// GHAZAL VIDEO + PIANO MUSIC SWITCH
// ==========================================

const ghazalVideo = document.getElementById("ghazalVideo");

if (ghazalVideo) {

    // When Ghazal starts
    ghazalVideo.addEventListener("play", () => {

        music.pause();

    });


    // When Ghazal is paused
    ghazalVideo.addEventListener("pause", () => {

        if (!ghazalVideo.ended) {

            music.play().catch(() => {});

        }

    });


    // When Ghazal finishes
    ghazalVideo.addEventListener("ended", () => {

        music.play().catch(() => {});

    });

}