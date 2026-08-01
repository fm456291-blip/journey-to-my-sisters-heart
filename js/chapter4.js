// ==========================================
// CHAPTER 4 - MEMORY PUZZLE + QUIZ
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ------------------------------------------
    // MUSIC
    // ------------------------------------------

    const music = document.getElementById("bgMusic");

    if (music) {
        music.volume = 0.3;

        music.play().catch(() => {
            document.addEventListener("click", () => {
                music.play().catch(() => {});
            }, { once: true });
        });
    }


    // ------------------------------------------
    // STARS
    // ------------------------------------------

    const stars = document.getElementById("stars");

    if (stars) {

        for (let i = 0; i < 180; i++) {

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


    // ------------------------------------------
    // PUZZLE SETTINGS
    // ------------------------------------------

    const puzzle = document.getElementById("puzzle");
    const gameStatus = document.getElementById("gameStatus");
    const successBox = document.getElementById("successBox");
    const continueBtn = document.getElementById("continueBtn");
    const quizSection = document.getElementById("quizSection");
    const questionBox = document.getElementById("questionBox");
    const scoreBox = document.getElementById("score");

    const imagePath = "../assets/images/image11.jpeg";

    const totalPieces = 9;

    let pieces = [];

    let draggedPiece = null;

    let solved = false;


    // ------------------------------------------
    // CREATE PUZZLE
    // ------------------------------------------

    function createPuzzle() {

        puzzle.innerHTML = "";

        pieces = [];

        for (let i = 0; i < totalPieces; i++) {

            const piece = document.createElement("div");

            piece.className = "piece";

            piece.dataset.correct = i;

            piece.dataset.position = i;

            // Image divided into 3 x 3 sections

            const row = Math.floor(i / 3);

            const col = i % 3;

            piece.style.backgroundImage =
                `url("${imagePath}")`;

            piece.style.backgroundSize = "300% 300%";

            piece.style.backgroundPosition =
                `${col * 50}% ${row * 50}%`;

            piece.draggable = true;

            pieces.push(piece);

            puzzle.appendChild(piece);
        }

        shufflePuzzle();

        updateStatus();
    }


    // ------------------------------------------
    // SHUFFLE
    // ------------------------------------------

    function shufflePuzzle() {

        // Fisher-Yates shuffle

        for (let i = pieces.length - 1; i > 0; i--) {

            const random =
                Math.floor(Math.random() * (i + 1));

            [pieces[i], pieces[random]] =
                [pieces[random], pieces[i]];
        }

        pieces.forEach((piece, index) => {

            piece.dataset.position = index;

            puzzle.appendChild(piece);

        });

        // Avoid accidentally starting solved

        if (isSolved()) {
            shufflePuzzle();
        }
    }


    // ------------------------------------------
    // DRAG START
    // ------------------------------------------

    puzzle.addEventListener("dragstart", (event) => {

        const piece =
            event.target.closest(".piece");

        if (!piece || solved) return;

        draggedPiece = piece;

        piece.classList.add("dragging");

        event.dataTransfer.effectAllowed = "move";

        event.dataTransfer.setData(
            "text/plain",
            piece.dataset.position
        );
    });


    // ------------------------------------------
    // DRAG END
    // ------------------------------------------

    puzzle.addEventListener("dragend", (event) => {

        const piece =
            event.target.closest(".piece");

        if (piece) {
            piece.classList.remove("dragging");
        }

        draggedPiece = null;
    });


    // ------------------------------------------
    // DRAG OVER
    // ------------------------------------------

    puzzle.addEventListener("dragover", (event) => {

        event.preventDefault();

        const target =
            event.target.closest(".piece");

        if (!target || !draggedPiece) return;

        target.classList.add("drop-target");
    });


    // ------------------------------------------
    // DRAG LEAVE
    // ------------------------------------------

    puzzle.addEventListener("dragleave", (event) => {

        const target =
            event.target.closest(".piece");

        if (target) {
            target.classList.remove("drop-target");
        }
    });


    // ------------------------------------------
    // DROP
    // ------------------------------------------

    puzzle.addEventListener("drop", (event) => {

        event.preventDefault();

        const target =
            event.target.closest(".piece");

        if (!target || !draggedPiece) return;

        target.classList.remove("drop-target");

        if (target === draggedPiece) return;

        swapPieces(draggedPiece, target);

        updateStatus();

        if (isSolved()) {

            solvePuzzle();

        }
    });


    // ------------------------------------------
    // SWAP PIECES
    // ------------------------------------------

    function swapPieces(piece1, piece2) {

        const position1 =
            piece1.dataset.position;

        const position2 =
            piece2.dataset.position;

        piece1.dataset.position = position2;

        piece2.dataset.position = position1;

        const allPieces =
            [...puzzle.children];

        const index1 =
            allPieces.indexOf(piece1);

        const index2 =
            allPieces.indexOf(piece2);

        if (index1 < index2) {

            puzzle.insertBefore(
                piece2,
                piece1
            );

            puzzle.insertBefore(
                piece1,
                allPieces[index2]
            );

        } else {

            puzzle.insertBefore(
                piece1,
                piece2
            );

            puzzle.insertBefore(
                piece2,
                allPieces[index1]
            );
        }
    }


    // ------------------------------------------
    // CHECK SOLUTION
    // ------------------------------------------

    function isSolved() {

        const currentPieces =
            [...puzzle.children];

        for (let i = 0; i < currentPieces.length; i++) {

            if (
                Number(currentPieces[i].dataset.correct)
                !==
                i
            ) {

                return false;
            }
        }

        return true;
    }


    // ------------------------------------------
    // STATUS
    // ------------------------------------------

    function updateStatus() {

        if (!gameStatus) return;

        let correct = 0;

        [...puzzle.children].forEach(
            (piece, index) => {

                if (
                    Number(piece.dataset.correct)
                    === index
                ) {
                    correct++;
                }
            }
        );

        gameStatus.innerHTML =
            `${correct} / 9 pieces in the right place ❤️`;
    }


    // ------------------------------------------
    // PUZZLE SOLVED
    // ------------------------------------------

    function solvePuzzle() {

        solved = true;

        [...puzzle.children].forEach(piece => {

            piece.draggable = false;

            piece.classList.add("correct");

        });

        if (gameStatus) {

            gameStatus.innerHTML =
                "🎉 You completed the memory! ❤️";
        }

        createConfetti();

        setTimeout(() => {

            if (successBox) {

                successBox.classList.remove("hidden");

                successBox.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }

        }, 900);
    }


    // ------------------------------------------
    // CONFETTI
    // ------------------------------------------

    function createConfetti() {

        for (let i = 0; i < 70; i++) {

            const confetti =
                document.createElement("div");

            confetti.className = "confetti";

            confetti.innerHTML =
                Math.random() > 0.5 ? "❤️" : "✨";

            confetti.style.left =
                Math.random() * 100 + "vw";

            confetti.style.animationDelay =
                Math.random() * 1.5 + "s";

            confetti.style.fontSize =
                (Math.random() * 15 + 12) + "px";

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }
    }


    // ------------------------------------------
    // CONTINUE TO QUIZ
    // ------------------------------------------

    if (continueBtn) {

        continueBtn.addEventListener("click", () => {

            if (successBox) {
                successBox.classList.add("hidden");
            }

            if (quizSection) {

                quizSection.classList.remove("hidden");

                quizSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

            startQuiz();
        });
    }


    // ==========================================
    // QUIZ
    // ==========================================

    const questions = [

        {
            question:
                "When we first met, what did I think you were? 😂",

            options: [
                "My classmate",
                "A teacher",
                "A senior",
                "A professor"
            ],

            answer: 1,

            correct:
                "😂 Exactly! You thought I was a madam!"
        },

        {
            question:
                "What was I wearing when you first saw me?",

            options: [
                "Black glasses",
                "White glasses",
                "Blue glasses",
                "No glasses"
            ],

            answer: 0,

            correct:
                "Yes! Those black glasses! 🖤😂"
        },

        {
            question:
                "What kind of person are you?",

            options: [
                "Caring, Emotional & Naughty",
                "Quiet, Serious & Strict",
                "Lazy, Angry & Serious",
                "None of these"
            ],

            answer: 0,

            correct:
                "Obviously! Caring + Emotional + Naughty ❤️"
        }

    ];


    let currentQuestion = 0;

    let score = 0;


    function startQuiz() {

        currentQuestion = 0;

        score = 0;

        showQuestion();
    }


    function showQuestion() {

        if (!questionBox) return;

        const current =
            questions[currentQuestion];

        questionBox.innerHTML = `

            <div class="question-card">

                <p class="question-number">
                    Question ${currentQuestion + 1}
                    of ${questions.length}
                </p>

                <h3>
                    ${current.question}
                </h3>

                <div class="answers">

                    ${current.options.map(
                        (option, index) => `

                        <button
                            class="answer-btn"
                            data-answer="${index}"
                        >
                            ${option}
                        </button>

                    `).join("")}

                </div>

                <p
                    id="answerMessage"
                    class="answer-message"
                ></p>

            </div>
        `;

        const answerButtons =
            document.querySelectorAll(".answer-btn");

        answerButtons.forEach(button => {

            button.addEventListener(
                "click",
                handleAnswer
            );

        });
    }


    // ------------------------------------------
    // HANDLE ANSWER
    // ------------------------------------------

    function handleAnswer(event) {

        const selected =
            Number(
                event.currentTarget.dataset.answer
            );

        const current =
            questions[currentQuestion];

        const buttons =
            document.querySelectorAll(".answer-btn");

        buttons.forEach(button => {

            button.disabled = true;

        });

        const message =
            document.getElementById("answerMessage");

        if (selected === current.answer) {

            score++;

            event.currentTarget.classList.add(
                "correct-answer"
            );

            message.innerHTML =
                "❤️ " + current.correct;

        } else {

            event.currentTarget.classList.add(
                "wrong-answer"
            );

            buttons[current.answer]
                .classList.add("correct-answer");

            message.innerHTML =
                "😂 Not quite! But you still know me pretty well ❤️";
        }

        setTimeout(() => {

            currentQuestion++;

            if (
                currentQuestion <
                questions.length
            ) {

                showQuestion();

            } else {

                showFinalScore();

            }

        }, 1800);
    }


    // ------------------------------------------
    // FINAL SCORE
    // ------------------------------------------

    function showFinalScore() {

        if (!questionBox) return;

        let message = "";

        if (score === 3) {

            message =
                "Okayyy! You actually remember everything! 🥹❤️";

        } else if (score === 2) {

            message =
                "Pretty good! You know your sister well. 😂❤️";

        } else {

            message =
                "😂 We definitely need to make more memories!";
        }

        questionBox.innerHTML = `

            <div class="final-score">

                <div class="trophy">
                    🏆
                </div>

                <h2>
                    ${score} / ${questions.length}
                </h2>

                <p>
                    ${message}
                </p>

                <p>
                    No matter the score...<br>
                    you're still stuck with me as your sister. ❤️
                </p>

                <button
                    id="finalContinue"
                    class="final-button"
                >
                    Continue to Chapter Five 🎂
                </button>

            </div>
        `;

        const finalButton =
            document.getElementById("finalContinue");

        finalButton.addEventListener(
            "click",
            () => {

                window.location.href =
                    "chapter5.html";

            }
        );
    }


    // ------------------------------------------
    // START
    // ------------------------------------------

    createPuzzle();

});