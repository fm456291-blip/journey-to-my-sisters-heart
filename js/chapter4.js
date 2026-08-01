document.addEventListener("DOMContentLoaded", () => {

    const puzzle = document.getElementById("puzzle");
    const successBox = document.getElementById("successBox");
    const continueBtn = document.getElementById("continueBtn");
    const quizSection = document.getElementById("quizSection");
    const questionBox = document.getElementById("questionBox");

    // =========================
    // PUZZLE SETTINGS
    // =========================

    const rows = 4;
    const cols = 4;
    const totalPieces = rows * cols;

    // IMPORTANT:
    // Your image is inside:
    // assets/images/image11.jpeg

    const imagePath = "../assets/images/image11.jpeg";

    let pieces = [];
    let firstPiece = null;
    let secondPiece = null;
    let lockBoard = false;

    // =========================
    // PUZZLE CONTAINER
    // =========================

    puzzle.innerHTML = "";

    puzzle.style.display = "grid";
    puzzle.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    puzzle.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    puzzle.style.width = "520px";
    puzzle.style.height = "520px";
    puzzle.style.margin = "30px auto";
    puzzle.style.gap = "3px";
    puzzle.style.padding = "5px";
    puzzle.style.boxSizing = "border-box";
    puzzle.style.background = "#ffffff";
    puzzle.style.borderRadius = "15px";
    puzzle.style.overflow = "hidden";

    // =========================
    // CREATE PUZZLE PIECES
    // =========================

    for (let i = 0; i < totalPieces; i++) {

        const piece = document.createElement("div");

        piece.classList.add("puzzle-piece");

        const row = Math.floor(i / cols);
        const col = i % cols;

        piece.dataset.correct = i;
        piece.dataset.position = i;

        piece.draggable = true;

        // Image piece
        piece.style.backgroundImage = `url("${imagePath}")`;
        piece.style.backgroundSize = `${cols * 100}% ${rows * 100}%`;
        piece.style.backgroundRepeat = "no-repeat";

        // Position of image section
        const x = cols === 1 ? 0 : (col / (cols - 1)) * 100;
        const y = rows === 1 ? 0 : (row / (rows - 1)) * 100;

        piece.style.backgroundPosition = `${x}% ${y}%`;

        piece.style.borderRadius = "6px";
        piece.style.cursor = "grab";
        piece.style.transition = "0.2s";
        piece.style.boxSizing = "border-box";

        // Small border
        piece.style.border = "1px solid rgba(255,255,255,0.35)";

        pieces.push(piece);
    }

    // =========================
    // SHUFFLE
    // =========================

    shufflePieces();

    // =========================
    // ADD PIECES TO PUZZLE
    // =========================

    pieces.forEach(piece => {
        puzzle.appendChild(piece);
    });

    // =========================
    // DRAG EVENTS
    // =========================

    pieces.forEach(piece => {

        piece.addEventListener("dragstart", () => {

            if (lockBoard) return;

            firstPiece = piece;

            piece.style.opacity = "0.5";
        });

        piece.addEventListener("dragend", () => {

            piece.style.opacity = "1";
        });

        piece.addEventListener("dragover", (e) => {

            e.preventDefault();

            if (lockBoard) return;

            piece.style.transform = "scale(1.05)";
        });

        piece.addEventListener("dragleave", () => {

            piece.style.transform = "scale(1)";
        });

        piece.addEventListener("drop", (e) => {

            e.preventDefault();

            if (lockBoard) return;

            secondPiece = piece;

            piece.style.transform = "scale(1)";

            if (firstPiece && secondPiece && firstPiece !== secondPiece) {

                swapPieces(firstPiece, secondPiece);

            }

            firstPiece = null;
            secondPiece = null;

            checkPuzzle();
        });
    });


    // =========================
    // SHUFFLE FUNCTION
    // =========================

    function shufflePieces() {

        for (let i = pieces.length - 1; i > 0; i--) {

            const randomIndex = Math.floor(Math.random() * (i + 1));

            [pieces[i], pieces[randomIndex]] =
            [pieces[randomIndex], pieces[i]];
        }
    }


    // =========================
    // SWAP PIECES
    // =========================

    function swapPieces(piece1, piece2) {

        const tempPosition = piece1.dataset.position;

        piece1.dataset.position = piece2.dataset.position;

        piece2.dataset.position = tempPosition;

        const allPieces = Array.from(puzzle.children);

        const index1 = allPieces.indexOf(piece1);
        const index2 = allPieces.indexOf(piece2);

        if (index1 < index2) {

            puzzle.insertBefore(piece2, piece1);

        } else {

            puzzle.insertBefore(piece1, piece2);
        }
    }


    // =========================
    // CHECK PUZZLE
    // =========================

    function checkPuzzle() {

        const currentPieces = Array.from(puzzle.children);

        let correct = true;

        currentPieces.forEach((piece, index) => {

            if (Number(piece.dataset.correct) !== index) {

                correct = false;
            }
        });

        if (correct) {

            puzzleCompleted();
        }
    }


    // =========================
    // PUZZLE COMPLETED
    // =========================

    function puzzleCompleted() {

        lockBoard = true;

        pieces.forEach(piece => {

            piece.style.cursor = "default";
            piece.style.border = "2px solid #ffd166";
        });

        setTimeout(() => {

            successBox.classList.remove("hidden");

            successBox.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 700);
    }


    // =========================
    // CONTINUE BUTTON
    // =========================

    if (continueBtn) {

        continueBtn.addEventListener("click", () => {

            successBox.classList.add("hidden");

            quizSection.classList.remove("hidden");

            showQuiz();

            quizSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }


    // =========================
    // QUIZ
    // =========================

    function showQuiz() {

        questionBox.innerHTML = `

            <div class="quiz-card">

                <h3>
                    💭 One Little Question...
                </h3>

                <p>
                    Do you remember what you thought about me
                    when we first met? ❤️
                </p>

                <div class="quiz-options">

                    <button class="answer">
                        She seemed nice 😊
                    </button>

                    <button class="answer">
                        She seemed strict 😂
                    </button>

                    <button class="answer">
                        I thought she was the teacher 😭
                    </button>

                    <button class="answer">
                        I don't remember 😅
                    </button>

                </div>

                <div id="quizResult"></div>

            </div>

        `;

        const answers =
            document.querySelectorAll(".answer");

        answers.forEach(answer => {

            answer.addEventListener("click", () => {

                const result =
                    document.getElementById("quizResult");

                if (
                    answer.textContent.includes("teacher")
                ) {

                    result.innerHTML =
                        "😂😂 YES! That was the one! You actually thought I was the teacher! ❤️";

                } else {

                    result.innerHTML =
                        "Hehe 😭 not quite! But you know what really happened... you thought I was the teacher! 😂❤️";
                }

                answers.forEach(btn => {
                    btn.disabled = true;
                });

            });

        });

    }

});