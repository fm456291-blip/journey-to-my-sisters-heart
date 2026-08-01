document.addEventListener("DOMContentLoaded", () => {

    const puzzle = document.getElementById("puzzle");
    const successBox = document.getElementById("successBox");
    const solveBtn = document.getElementById("solveBtn");
    const continueBtn = document.getElementById("continueBtn");
    const quizSection = document.getElementById("quizSection");
    const bgMusic = document.getElementById("bgMusic");

    const imagePath = "../assets/images/image11.jpeg";

    const SIZE = 3;
    const TOTAL = SIZE * SIZE;

    let pieces = [];
    let selectedPiece = null;
    let draggedPiece = null;


    // =====================================
    // MUSIC
    // =====================================

    bgMusic.volume = 0.45;

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


    // =====================================
    // CREATE PUZZLE
    // =====================================

    function createPuzzle() {

        puzzle.innerHTML = "";

        pieces = [];
        selectedPiece = null;

        let numbers = [];

        for (let i = 0; i < TOTAL; i++) {
            numbers.push(i);
        }

        // Shuffle pieces
        do {
            numbers.sort(() => Math.random() - 0.5);
        } while (isSolved(numbers));


        numbers.forEach((correctPosition, currentPosition) => {

            const piece = document.createElement("div");

            piece.classList.add("puzzle-piece");

            piece.dataset.correct = correctPosition;
            piece.dataset.position = currentPosition;

            piece.style.backgroundImage =
                `url("${imagePath}")`;

            const row = Math.floor(correctPosition / SIZE);
            const col = correctPosition % SIZE;

            piece.style.backgroundPosition =
                `${col * 50}% ${row * 50}%`;

            piece.draggable = true;

            puzzle.appendChild(piece);

            pieces.push(piece);


            // =================================
            // CLICK TO SELECT / SWAP
            // =================================

            piece.addEventListener("click", () => {

                if (!selectedPiece) {

                    selectedPiece = piece;

                    piece.classList.add("selected");

                }

                else if (selectedPiece === piece) {

                    piece.classList.remove("selected");

                    selectedPiece = null;

                }

                else {

                    swapPieces(selectedPiece, piece);

                    selectedPiece.classList.remove("selected");

                    selectedPiece = null;

                    checkPuzzle();

                }

            });


            // =================================
            // DRAG START
            // =================================

            piece.addEventListener("dragstart", () => {

                draggedPiece = piece;

                piece.classList.add("dragging");

            });


            // =================================
            // DRAG END
            // =================================

            piece.addEventListener("dragend", () => {

                piece.classList.remove("dragging");

                draggedPiece = null;

            });


            // =================================
            // DRAG OVER
            // =================================

            piece.addEventListener("dragover", (e) => {

                e.preventDefault();

            });


            // =================================
            // DROP
            // =================================

            piece.addEventListener("drop", (e) => {

                e.preventDefault();

                if (
                    draggedPiece &&
                    draggedPiece !== piece
                ) {

                    swapPieces(draggedPiece, piece);

                    checkPuzzle();

                }

            });

        });

    }


    // =====================================
    // SWAP PIECES
    // =====================================

    function swapPieces(piece1, piece2) {

        const children = [...puzzle.children];

        const index1 = children.indexOf(piece1);
        const index2 = children.indexOf(piece2);

        if (index1 < index2) {

            puzzle.insertBefore(piece2, piece1);

            puzzle.insertBefore(
                piece1,
                children[index2].nextSibling
            );

        }

        else {

            puzzle.insertBefore(piece1, piece2);

            puzzle.insertBefore(
                piece2,
                children[index1].nextSibling
            );

        }

        updatePositions();

    }


    // =====================================
    // UPDATE POSITIONS
    // =====================================

    function updatePositions() {

        pieces = [...puzzle.children];

        pieces.forEach((piece, index) => {

            piece.dataset.position = index;

        });

    }


    // =====================================
    // CHECK PUZZLE
    // =====================================

    function checkPuzzle() {

        const currentPieces = [...puzzle.children];

        let correct = true;

        currentPieces.forEach((piece, index) => {

            if (
                Number(piece.dataset.correct) !== index
            ) {

                correct = false;

            }

        });


        if (correct) {

            showSuccess();

        }

    }


    // =====================================
    // SHOW SUCCESS
    // =====================================

    function showSuccess() {

        puzzle.style.pointerEvents = "none";

        solveBtn.style.display = "none";

        setTimeout(() => {

            successBox.classList.remove("hidden");

            successBox.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 600);

    }


    // =====================================
    // HELP / AUTO SOLVE
    // =====================================

    solveBtn.addEventListener("click", () => {

        const currentPieces =
            [...puzzle.querySelectorAll(".puzzle-piece")];

        currentPieces.sort((a, b) => {

            return (
                Number(a.dataset.correct) -
                Number(b.dataset.correct)
            );

        });

        currentPieces.forEach(piece => {

            puzzle.appendChild(piece);

        });

        updatePositions();

        showSuccess();

    });


    // =====================================
    // CHECK SOLVED ARRAY
    // =====================================

    function isSolved(array) {

        return array.every(
            (value, index) => value === index
        );

    }


    // =====================================
    // CONTINUE → QUIZ
    // =====================================

    continueBtn.addEventListener("click", () => {

        successBox.classList.add("hidden");

        quizSection.classList.remove("hidden");

        quizSection.scrollIntoView({
            behavior: "smooth"
        });

    });


    // =====================================
    // START PUZZLE
    // =====================================

    createPuzzle();

});