

const gameContainer = document.getElementById("game-container");
gameContainer.style.display = "none";
const input1 = document.querySelector("#player1");
const input2 = document.querySelector("#player2");
const startBtn = document.getElementById("startBtn");
const saveBtn = document.getElementById("saveBtn");
const startModal = document.getElementById("startModal");
const cells = document.querySelectorAll("#cell");


// 1. The Gameboard array
let Gameboard = ["","","","","","","","",""]; 
let person1;
let person2;
let activePlayer;
let gameOver = false;
// 2. Player Objects
    // 1. Create a function
function Player(name, mark) {
    const getName = () => name;

    // 2. Assign a marker to a player
    const getMark = () => mark;

    return {getName, getMark}

}

startBtn.addEventListener("click", () => {
    const name1 = input1.value;
    const name2 = input2.value;

    person1 = Player(name1, "X");
    person2 = Player(name2, "O");

    console.log(`Hello, ${person1.getName()}`);
    console.log(`Hello, ${person2.getName()}`);

    activePlayer = person1;

    startModal.style.display = "none";
    gameContainer.style.display = "grid";

});

function switchTurn() {
    activePlayer = activePlayer === person1 ? person2 : person1;
}

function ThreeInARow() {
    const checkWin = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for(let i = 0; i < checkWin.length; i++) {
        const [a,b,c] = checkWin[i];
        if (Gameboard[a] && Gameboard[a] === Gameboard[b] && Gameboard[a] === Gameboard[c]) {
            console.log("HOORAY BRUDDAH");
            return Gameboard[a]; // Return "X" or "O"
        }
    }
    return null;
}

function updateGameboard() {
    cells.forEach(cell => {
        cell.addEventListener("click", (e) => {
            if (gameOver) return;
            const indexClicked = e.target.dataset.index;
            if(Gameboard[indexClicked] !== "") {
                console.log("Bruddah");
                return;
            }
            e.target.textContent = activePlayer.getMark();
            Gameboard[indexClicked] = activePlayer.getMark();
            console.log(Gameboard[indexClicked]);
            
            const winner = ThreeInARow();
            if(winner) {
                console.log(`OMG BRUV ${activePlayer.getName()}`);
                gameOver = true;
            }
            else if(!Gameboard.includes("")) {
                console.log("Tie");
            }
            else {
                switchTurn();
            }
            
        });
    });
}

updateGameboard();

const againBtn = document.getElementById("againBtn");

againBtn.addEventListener("click", () => {
    cells.forEach(cell => {
        cell.textContent = "";
    });

    for(let i = 0; i < Gameboard.length; i++) {
        Gameboard[i] = "";
    }

    gameOver = false;
    console.log("RESET BRUV");
})
