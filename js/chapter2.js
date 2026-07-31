// ======================================
// Chapter 2
// Our First Meeting
// ======================================


// -------------------------------
// Story Text
// -------------------------------

const storyText = `

I still remember the very first day...

You were wearing black glasses. 😎

I was standing in the classroom, giving my presentation.

And the funniest part...

You actually thought I was the teacher. 😂

That little misunderstanding became the beginning of a beautiful friendship.

From that day...

a stranger slowly became a friend...

and eventually,

my sister. ❤️

`;


// -------------------------------
// Typewriter
// -------------------------------

const story = document.getElementById("story");

let index = 0;

function typeStory() {

    if (index < storyText.length) {

        story.innerHTML += storyText.charAt(index);

        index++;

        setTimeout(typeStory, 35);

    }

}

typeStory();


// -------------------------------
// Piano Music
// -------------------------------

const music = document.getElementById("bgMusic");

document.body.addEventListener("click", () => {

    music.volume = 0.35;

    music.play().catch(() => {});

}, { once: true });



// -------------------------------
// Stars
// -------------------------------

const stars = document.getElementById("stars");

for (let i = 0; i < 180; i++) {

    const star = document.createElement("div");

    star.className = "star";

    const size = Math.random() * 3 + 1;

    star.style.width = size + "px";
    star.style.height = size + "px";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    star.style.animationDelay = Math.random() * 5 + "s";

    stars.appendChild(star);

}



// -------------------------------
// Next Button
// -------------------------------

document.getElementById("nextBtn").addEventListener("click", () => {

    window.location.href = "chapter3.html";

});