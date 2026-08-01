document.addEventListener("DOMContentLoaded", () => {

    const startButton = document.getElementById("startSurprise");
    const birthdaySection = document.getElementById("birthdaySection");

    const bgMusic = document.getElementById("bgMusic");
    const cakeVideo = document.getElementById("cakeVideo");

    // =====================================
    // BACKGROUND MUSIC
    // =====================================

    bgMusic.volume = 0.35;


    // =====================================
    // OPEN SURPRISE
    // =====================================

    startButton.addEventListener("click", () => {

        // Start piano after user interaction
        bgMusic.play().catch(() => {});

        // Hide intro
        startButton.closest(".final-intro").style.display = "none";

        // Show birthday section
        birthdaySection.classList.remove("hidden");

        // Smoothly move to birthday section
        setTimeout(() => {

            birthdaySection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    });


    // =====================================
    // CAKE VIDEO PLAY
    // =====================================

    cakeVideo.addEventListener("play", () => {

        // Stop background music
        bgMusic.pause();

    });


    // =====================================
    // CAKE VIDEO PAUSE
    // =====================================

    cakeVideo.addEventListener("pause", () => {

        // Don't restart if video has completely ended
        if (!cakeVideo.ended) {

            bgMusic.play().catch(() => {});

        }

    });


    // =====================================
    // CAKE VIDEO ENDED
    // =====================================

    cakeVideo.addEventListener("ended", () => {

        // Resume piano after cake video
        bgMusic.play().catch(() => {});

    });


});