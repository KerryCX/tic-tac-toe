let counter = "O"
let numberOfPlays = 0

const currentPlayer = (player) => {
    return player === "X" ? "O" : "X"
}

const messageBox = document.querySelector("#message")
const sectionArea = document.querySelector(".section-container")
const resetButton = document.querySelector(".reset-button")
const squares = document.querySelectorAll(".square")

const updateMessageBox = (type, counter) => {
    switch(type) {
        case "turn":
            messageBox.innerText=currentPlayer(counter)+"'s turn"
            break;
        case "taken":
            messageBox.innerText= "Already taken, choose another place for " + currentPlayer(counter)
            break;
        case "win":
            messageBox.innerText= counter + " wins"
            break;
        case "draw":
            messageBox.innerText= "It is a draw!"
            break;
        default: 
            break;
    }
}

for (i =0; i<squares.length; i++){
    squares[i].id = "s"+i
    squares[i].addEventListener("click", (e) => {
        if(e.target.innerHTML === "") {
            counter = currentPlayer(counter)
            updateMessageBox("turn", counter)
            e.target.innerHTML ="<h2>"+counter+"</h2>"
            numberOfPlays ++
            if(!checkIfWinner(e.target)){
                if(numberOfPlays===9){
                    draw()
                }
            }    
        }
    })
}

const checkIfWinner = (currentSquare, i) => {
    if(currentSquare.id === "s0"){
        if(currentSquare.innerText === squares[1].innerText && currentSquare.innerText === squares[2].innerText) {
            return winner(currentSquare, squares[1], squares[2])
        } else if (currentSquare.innerText === squares[3].innerText && currentSquare.innerText === squares[6].innerText) {
            return winner(currentSquare, squares[3], squares[6])
        } else if (currentSquare.innerText === squares[4].innerText && currentSquare.innerText === squares[8].innerText) {
            return winner(currentSquare, squares[4], squares[8])
        } else {
            return false;
        }
    } else if(currentSquare.id === "s1"){
        if(currentSquare.innerText === squares[0].innerText && currentSquare.innerText === squares[2].innerText) {
            return winner(currentSquare, squares[0], squares[2])
        } else if (currentSquare.innerText === squares[4].innerText && currentSquare.innerText === squares[7].innerText) {
            return winner(currentSquare, squares[4], squares[7])
        } else {
            return false;
        }
    } else if(currentSquare.id === "s2"){
        if(currentSquare.innerText === squares[0].innerText && currentSquare.innerText === squares[1].innerText) {
            return winner(currentSquare, squares[0], squares[1])
        } else if (currentSquare.innerText === squares[4].innerText && currentSquare.innerText === squares[6].innerText) {
            return winner(currentSquare, squares[4], squares[6])
        } else if (currentSquare.innerText === squares[5].innerText && currentSquare.innerText === squares[8].innerText) {
            return winner(currentSquare, squares[5], squares[8])
        } else {
            return false;
        }
    } else if(currentSquare.id === "s3"){
        if(currentSquare.innerText === squares[0].innerText && currentSquare.innerText === squares[6].innerText) {
            return winner(currentSquare, squares[0], squares[6])
        } else if (currentSquare.innerText === squares[4].innerText && currentSquare.innerText === squares[5].innerText) {
            return winner(currentSquare, squares[4], squares[5])
        } else {
            return false;
        }
    } else if(currentSquare.id === "s4"){
        if(currentSquare.innerText === squares[0].innerText && currentSquare.innerText === squares[8].innerText) {
            return winner(currentSquare, squares[0], squares[8])
        } else if (currentSquare.innerText === squares[1].innerText && currentSquare.innerText === squares[7].innerText) {
            return winner(currentSquare, squares[1], squares[7])
        } else if (currentSquare.innerText === squares[2].innerText && currentSquare.innerText === squares[6].innerText) {
            return winner(currentSquare, squares[2], squares[6])
        } else {
            return false;
        }
    } else if(currentSquare.id === "s5"){
        if(currentSquare.innerText === squares[2].innerText && currentSquare.innerText === squares[8].innerText) {
            return winner(currentSquare, squares[8], squares[2])
        } else if (currentSquare.innerText === squares[3].innerText && currentSquare.innerText === squares[4].innerText) {
            return winner(currentSquare, squares[3], squares[4])
        } else {
            return false;
        }
    } else if(currentSquare.id === "s6"){
        if(currentSquare.innerText === squares[7].innerText && currentSquare.innerText === squares[8].innerText) {
            return winner(currentSquare, squares[7], squares[8])
        } else if (currentSquare.innerText === squares[0].innerText && currentSquare.innerText === squares[3].innerText) {
            return winner(currentSquare, squares[0], squares[3])
        } else if (currentSquare.innerText === squares[2].innerText && currentSquare.innerText === squares[4].innerText) {
            return winner(currentSquare, squares[2], squares[4])
        } else {
            return false;
        }
    } else if(currentSquare.id === "s7"){
        if(currentSquare.innerText === squares[6].innerText && currentSquare.innerText === squares[8].innerText) {
            return winner(currentSquare, squares[6], squares[8])
        } else if (currentSquare.innerText === squares[1].innerText && currentSquare.innerText === squares[4].innerText) {
            return winner(currentSquare, squares[1], squares[4])
        } else {
            return false;
        }
    } else if(currentSquare.id === "s8"){
        if(currentSquare.innerText === squares[6].innerText && currentSquare.innerText === squares[7].innerText) {
            return winner(currentSquare, squares[6], squares[7])
        } else if (currentSquare.innerText === squares[0].innerText && currentSquare.innerText === squares[4].innerText) {
            return winner(currentSquare, squares[4], squares[0])
        } else if (currentSquare.innerText === squares[2].innerText && currentSquare.innerText === squares[5].innerText) {
            return winner(currentSquare, squares[5], squares[2])
        }else {
            return false;
        }
    } 
}
const winner = (sq1, sq2, sq3) => {
    updateMessageBox("win", counter)
    sectionArea.classList.toggle("section-toggle");
    resetButton.classList.toggle("reset-button-toggle");
    sq1.style.backgroundColor = "#008000"
    sq2.style.backgroundColor = "#008000"
    sq3.style.backgroundColor = "#008000"
    return true;
}

const draw = () => {
    updateMessageBox("draw", false)
    for (i =0; i<9; i++){
        squares[i].style.backgroundColor = "#a52a2a";
    }
    sectionArea.classList.toggle("section-toggle");
    resetButton.classList.toggle("reset-button-toggle");
}

resetButton.addEventListener("click", () => { 
    updateMessageBox("turn", counter)
    numberOfPlays = 0
    for (i =0; i<9; i++){
        squares[i].style.backgroundColor = "#ffffff";
        squares[i].innerText = ""
    }
    sectionArea.classList.toggle("section-toggle");
    resetButton.classList.toggle("reset-button-toggle");
   
})


