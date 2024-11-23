const gameBoard = document.getElementById("gameBoard");

// יצירת לוח המשחק
function createBoard(rows, cols) {
    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        gameBoard.appendChild(cell);
    }
}

// יצירת לוח 15x15
createBoard(15, 15);

function addPacman() {
    const cells = document.querySelectorAll(".cell");
    cells[pacmanPosition].classList.add("pacman");
}

let pacmanPosition = 112; 
const numCols = 15;
let currentDirection = "right"; 
let previousDirection = "right";
let movementInterval = null;

// רשימת הרוחות
const ghosts = [];

// הוספת פקמן
addPacman();

// תנועת הפקמן
function movePacman() {
    const cells = document.querySelectorAll(".cell");
    let newPosition = pacmanPosition;

    switch (currentDirection) {
        case "up":
            if (newPosition >= numCols) newPosition -= numCols;
            break;
        case "down":
            if (newPosition < numCols * (numCols - 1)) newPosition += numCols;
            break;
        case "left":
            if (newPosition % numCols !== 0) newPosition -= 1;
            break;
        case "right":
            if (newPosition % numCols !== numCols - 1) newPosition += 1;
            break;
        default:
            return;
    }

    if (!cells[newPosition].classList.contains("wall")) {
        cells[pacmanPosition].classList.remove("pacman");
        pacmanPosition = newPosition;

        const food = cells[pacmanPosition].querySelector(".food");
        if (food) {
            food.remove();
            checkWin();
        }

        cells[pacmanPosition].classList.add("pacman");

        // שינוי כיוון הפנים
        const pacman = document.querySelector(".pacman");
        switch (currentDirection) {
            case "up":
                pacman.style.transform = "rotate(-90deg)";
                break;
            case "down":
                pacman.style.transform = "rotate(90deg)";
                break;
            case "left":
                pacman.style.transform = "rotate(180deg)";
                break;
            case "right":
                pacman.style.transform = "rotate(0deg)";
                break;
        }

        // בדיקת התנגשות עם רוחות
        ghosts.forEach(ghost => {
            if (ghost.position === pacmanPosition) {
                if (ghost.element.classList.contains("scared")) {
                    eatGhost(ghost); // אכילת הרוח
                } else {
                    endGame("Game Over! Pac-Man was caught by a ghost!");
                }
            }
        });

        // אם הפקמן אוכל אוכל מיוחד
        if (food && food.classList.contains("super-food")) {
            food.remove();
            ghosts.forEach(ghost => ghost.element.classList.add("scared"));
            setTimeout(() => {
                ghosts.forEach(ghost => ghost.element.classList.remove("scared"));
            }, 10000); // 10 שניות של פחד
        }
    }
}


// שינוי כיוון הפקמן בעת לחיצה
document.addEventListener("keydown", (event) => {
    let newDirection = null;

    switch (event.key) {
        case "ArrowUp":
            newDirection = "up";
            break;
        case "ArrowDown":
            newDirection = "down";
            break;
        case "ArrowLeft":
            newDirection = "left";
            break;
        case "ArrowRight":
            newDirection = "right";
            break;
        default:
            return;
    }

    // מניעת תנועה לכיוון ההפוך
    if (
        (currentDirection === "up" && newDirection === "down") ||
        (currentDirection === "down" && newDirection === "up") ||
        (currentDirection === "left" && newDirection === "right") ||
        (currentDirection === "right" && newDirection === "left")
    ) {
        return;
    }

    currentDirection = newDirection;

    if (movementInterval === null) {
        movementInterval = setInterval(movePacman, 300);
    }
});

// יצירת קירות
function createLineWalls() {
    const wallPositions = [16, 17, 19, 20, 21, 22, 23, 24, 25, 27, 28, 32, 31, 34, 40, 42, 43, 79, 80, 84, 85, 94, 100, 115, 129, 130, 109, 124, 125, 181, 182, 184, 190, 192, 193, 199, 196, 197, 200, 201, 202, 203, 204, 205, 207, 208, 76, 77, 91, 92, 106, 107, 121, 122, 87, 88, 102, 103, 117, 118, 132, 133];
    const cells = document.querySelectorAll(".cell");

    wallPositions.forEach(position => {
        cells[position].classList.add("wall");
    });
}

createLineWalls();

function addSuperFood() {
    const cells = document.querySelectorAll(".cell");
    const superFoodPositions = [0, 14,210, 224]; // מיקומים לדוגמה
    superFoodPositions.forEach(position => {
        const superFood = document.createElement("div");
        superFood.classList.add("food", "super-food");
        cells[position].appendChild(superFood);
    });
}

addSuperFood();

// הוספת אוכל
function addFood() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        // לא מוסיפים אוכל רגיל אם כבר יש אוכל מיוחד בתא
        if (!cell.classList.contains("wall") && 
            !cell.classList.contains("pacman") && 
            !cell.querySelector(".super-food")) {
            const food = document.createElement("div");
            food.classList.add("food");
            cell.appendChild(food);
        }
    });
}


addFood();

// הוספת רוח כחולה
function addBlueGhost() {
    const cells = document.querySelectorAll(".cell");
    const blueGhostPosition = 37;
    const blueGhost = document.createElement("div");
    blueGhost.classList.add("ghost","ghost-blue");
    cells[blueGhostPosition].appendChild(blueGhost);
    ghosts.push({ position: blueGhostPosition, element: blueGhost, direction: "right" });
}

addBlueGhost();

// הוספת רוח אדומה
function addRedGhost() {
    const cells = document.querySelectorAll(".cell");
    const redGhostPosition = 39;
    const redGhost = document.createElement("div");
    redGhost.classList.add("ghost","ghost-red");
    cells[redGhostPosition].appendChild(redGhost);
    ghosts.push({ position: redGhostPosition, element: redGhost, direction: "right" });
};

addRedGhost();


function addYellowGhost(){
    const cells =document.querySelectorAll(".cell");
    const yellowGhostPosition = 50;
    const yellowGhost = document.createElement("div");
    yellowGhost.classList.add("ghost","ghost-yellow");
    cells[yellowGhostPosition].appendChild(yellowGhost);
    ghosts.push({position: yellowGhostPosition , element :yellowGhost,direction: "right"});
};
addYellowGhost();


// תנועת הרוחות
function moveGhosts() {
    const cells = document.querySelectorAll(".cell");

    ghosts.forEach(ghost => {
        let newPosition = ghost.position;
        const directions = ["up", "down", "left", "right"];
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];

        switch (randomDirection) {
            case "up":
                if (newPosition >= numCols) newPosition -= numCols;
                break;
            case "down":
                if (newPosition < numCols * (numCols - 1)) newPosition += numCols;
                break;
            case "left":
                if (newPosition % numCols !== 0) newPosition -= 1;
                break;
            case "right":
                if (newPosition % numCols !== numCols - 1) newPosition += 1;
                break;
        }

        if (!cells[newPosition].classList.contains("wall")) {
            cells[ghost.position].querySelector(".ghost")?.remove();
            ghost.position = newPosition;
            cells[ghost.position].appendChild(ghost.element);
        }

        // בדיקת התנגשות עם הפקמן
        if (ghost.position === pacmanPosition) {
            if (ghost.element.classList.contains("scared")) {
                eatGhost(ghost); // הפקמן אוכל את הרוח
            } else {
                endGame("Game Over! Pac-Man was caught by a ghost!");
            }
        }
    });
}

function checkCollisionWithGhosts() {
    return ghosts.some(ghost => ghost.position === pacmanPosition);
}


// הפעלת תנועת הרוחות
const ghostInterval = setInterval(moveGhosts, 500);

function endGame(message) {
    clearInterval(movementInterval);
    clearInterval(ghostInterval);
    alert(message);
};



function eatGhost(ghost) {
    const ghostIndex = ghosts.indexOf(ghost);
    if (ghostIndex !== -1) {
        ghost.element.remove(); // הסרת הרוח מהלוח
        ghosts.splice(ghostIndex, 1); // הסרת הרוח מהרשימה
    }
}

function eatGhost(ghost) {
    const ghostIndex = ghosts.indexOf(ghost);
    if (ghostIndex !== -1) {
        ghost.element.remove(); // הסרת הרוח מהלוח
        ghosts.splice(ghostIndex, 1); // מחיקה מהרשימה
        // אופציונלי: הוספת ניקוד או אפקט חזותי
        console.log("Ghost eaten!");
    }
}
function checkWin() {
    const remainingFood = document.querySelectorAll(".food");
    if (remainingFood.length === 0) {
        
        endGame("Congratulations! You win!");
    }
}
checkWin();



