const squares = document.querySelectorAll('.squareClass');
const winerX = document.getElementById('displayXWiner');
const winerO = document.getElementById('displayOWiner');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const gameMode = document.getElementById('gameMode');
const endGame = document.getElementById('endGameBtn');
const soundX = new Audio('sounds/clickX.mp3');
const soundO = new Audio('sounds/clickO.mp3');
const soundWin = new Audio('sounds/winSound.mp3');
const movesX = [];
const movesO = [];
const maxMoves = 2;
let gameOver = false;
let currentTurn = 'X';
endGame.disabled = true;
restartBtn.disabled = true;
const board = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startBtn.addEventListener('click', () => {
    if (gameMode.value !== '') {
        startBtn.disabled = true;
        gameMode.disabled = true;
        endGame.disabled = false;
        restartBtn.disabled = false;
        removeStartAlertListeners();

    } else {
        alert('please Choose Game Mode');
    };
    if (gameMode.value == "classic") {
        squares.forEach((square, index) => {
            square.addEventListener('click', function () {
                // בדיקה אם הריבוע כבר מלא
                if (!square.classList.contains('x') && !square.classList.contains('o') && !gameOver) {
                  
                    square.classList.add(currentTurn.toLowerCase());
                    board[index] = currentTurn;

                    // בדיקת ניצחון או תיקו לפני החלפת התור
                    if (checkWin()) {
                        console.log(`Player ${currentTurn} wins!`);
                        setTimeout(() => {
                            if (currentTurn.toLowerCase() === 'x') {
                                winerX.innerHTML = 'player X wins!';
                                soundWin.play();
                            } else {
                                winerO.innerHTML = 'player O wins!';
                                soundWin.play();
                            }
                            gameOver = true;

                        }, 200); // עיכוב קצר להצגת המהלך האחרון
                    } else if (board.every(cell => cell)) {
                        setTimeout(() => {
                            alert("It's a tie! please restart the game ");
                            gameOver = true;

                        }, 200);
                    } else {
                        // החלפת תור רק אם אין ניצחון או תיקו
                        currentTurn = currentTurn === 'X' ? 'O' : 'X';
                    }
                }
            });
        });
    } else if (gameMode.value === "revolving") {
        squares.forEach((square, index) => {
            square.addEventListener('click', function () {
                if (!square.classList.contains('x') && !square.classList.contains('o') && !gameOver) {
                  
                    square.classList.add(currentTurn.toLowerCase());
                    board[index] = currentTurn;

                  
                    const currentMoves = currentTurn === 'X' ? movesX : movesO;
                    currentMoves.push(index);

                    console.log(`Current moves for ${currentTurn}:`, currentMoves);

                    
                    if (checkWin()) {
                        setTimeout(() => {
                            console.log(`Player ${currentTurn} wins!`);
                            if (currentTurn.toLowerCase() === 'x') {
                                winerX.innerHTML = 'player X wins!';
                                soundWin.play();
                            } else {
                                winerO.innerHTML = 'player O wins!';
                                soundWin.play();
                            }
                            gameOver = true;
                        }, 200);
                    } else {
                        // מחיקת המהלך הראשון אם השחקן הגיע לצעד השלישי ואין ניצחון
                        if (currentMoves.length > maxMoves) {
                            const firstMove = currentMoves.shift(); 
                            console.log(`Removed move at index: ${firstMove}`);
                            board[firstMove] = null; 
                            squares[firstMove].classList.remove('x', 'o'); 
                        }

                        // החלפת תור
                        currentTurn = currentTurn === 'X' ? 'O' : 'X';
                        console.log(`Next turn: Player ${currentTurn}`);
                    }
                }
            });
        });
    }

});



// פונקציה לבדיקת ניצחון
function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentTurn);
    });
};

// פונקציה לאיפוס הלוח
function resetBoard() {
    board.fill(null);
    squares.forEach(square => {
        square.classList.remove('x', 'o');
    });
    movesX.length = 0;
    movesO.length = 0;
};
restartBtn.addEventListener('click', () => {
    board.fill(null);
    squares.forEach(square => {
        square.classList.remove('x', 'o');
        winerO.innerHTML = '';
        winerX.innerHTML = '';
        startBtn.disabled = true;
        gameMode.disabled = true;

    });
    gameOver = false;
    currentTurn = 'X';
    movesX.length = 0;
    movesO.length = 0;
});
// הוספת המאזינים בתחילת הקובץ
squares.forEach(square => {
    square.addEventListener('click', showAlert);
});

// פונקציה להצגת ההודעה
function showAlert() {
    alert('Please start the game first');
}

// פונקציה להסרת המאזינים של ההתראה
function removeStartAlertListeners() {
    squares.forEach(square => {
        square.removeEventListener('click', showAlert);
    });
}

function resetEventListeners() {
    squares.forEach(square => {
        const newSquare = square.cloneNode(true);
        square.parentNode.replaceChild(newSquare, square); 
    });
}


squares.forEach(square => {
    square.addEventListener('click', function () {
        if (!square.classList.contains('x') && !square.classList.contains('o')) {
            if (currentTurn === 'X') {
                soundX.currentTime = 0;
                soundX.play();
            } else {
                soundO.currentTime = 0;
                soundO.play();
            }
        }
    });
});
endGame.addEventListener('click', () => {
    location.reload(); 
});


