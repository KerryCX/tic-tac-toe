let counter = "O"
let numberOfPlays = 0

const currentPlayer = (player) => {
    if(player === "X") {
        return "O"
    } else {
        return "X"
    }
}

const messageBox = document.querySelector("#message")
const sectionArea = document.querySelector("section")
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
const square1 = document.querySelector("#a1")
square1.addEventListener("click", () => {
    if(square1.innerHTML === "") {
        counter = currentPlayer(counter)
        updateMessageBox("turn", counter)
        square1.innerHTML ="<h1>"+counter+"</h1>"
        numberOfPlays ++
        checkIfWinner(square1)    
    } else {
        updateMessageBox("taken", counter)
    }
    
})

const square2 = document.querySelector("#a2")
square2.addEventListener("click", () => {
    if(square2.innerHTML === "") {
        counter = currentPlayer(counter)
        updateMessageBox("turn", counter)
        square2.innerHTML ="<h1>"+counter+"</h1>"
        numberOfPlays ++
        checkIfWinner(square2)        
    } else {
        updateMessageBox("taken", counter)
    }
})

const square3 = document.querySelector("#a3")
square3.addEventListener("click", () => {
    if(square3.innerHTML === "") {
        counter = currentPlayer(counter)
        updateMessageBox("turn", counter)
        square3.innerHTML ="<h1>"+counter+"</h1>"
        numberOfPlays ++
        checkIfWinner(square3)   
    } else {
        updateMessageBox("taken", counter)
    }
})

const square4 = document.querySelector("#b1")
square4.addEventListener("click", () => {
    if(square4.innerHTML === "") {
        counter = currentPlayer(counter)
        updateMessageBox("turn", counter)
        square4.innerHTML ="<h1>"+counter+"</h1>"
        numberOfPlays ++
        checkIfWinner(square4)            
    } else {
        updateMessageBox("taken", counter)
    }
})

const square5 = document.querySelector("#b2")
square5.addEventListener("click", (e) => {
    if(square5.innerHTML === "") {
        counter = currentPlayer(counter)
        updateMessageBox("turn", counter)
        square5.innerHTML ="<h1>"+counter+"</h1>"
        numberOfPlays ++
        checkIfWinner(square5)    
    } else {
        updateMessageBox("taken", counter)
    }
})

const square6 = document.querySelector("#b3")
square6.addEventListener("click", (e) => {
    if(square6.innerHTML === "") {
        counter = currentPlayer(counter)
        updateMessageBox("turn", counter)
        square6.innerHTML ="<h1>"+counter+"</h1>"
        numberOfPlays ++
        checkIfWinner(square6)     
    } else {
        updateMessageBox("taken", counter)
    }
})

const square7 = document.querySelector("#c1")
square7.addEventListener("click", () => {
    if(square7.innerHTML === "") {
        counter = currentPlayer(counter)
        updateMessageBox("turn", counter)
        square7.innerHTML ="<h1>"+counter+"</h1>"
        numberOfPlays ++
        checkIfWinner(square7)   
    } else {
        updateMessageBox("taken", counter)
    }
})

const square8 = document.querySelector("#c2")
square8.addEventListener("click", () => {
    if(square8.innerHTML === "") {
        counter = currentPlayer(counter)
        updateMessageBox("turn", counter)
        square8.innerHTML ="<h1>"+counter+"</h1>"
        numberOfPlays ++
        checkIfWinner(square8)       
    } else {
        updateMessageBox("taken", counter)
    }
})

const square9 = document.querySelector("#c3")
square9.addEventListener("click", () => {
    if(square9.innerHTML === "") {
        counter = currentPlayer(counter)
        updateMessageBox("turn", counter)
        square9.innerHTML ="<h1>"+counter+"</h1>"
        numberOfPlays ++
        checkIfWinner(square9)          
    } else {
        updateMessageBox("taken", counter)
    }
})

const checkIfWinner = (currentSquare) => {
    if(currentSquare.id === "a1"){
        if(currentSquare.innerText === square2.innerText && currentSquare.innerText === square3.innerText) {
            return winner(currentSquare, square2, square3)
        } else if (currentSquare.innerText === square4.innerText && currentSquare.innerText === square7.innerText) {
            return winner(currentSquare, square4, square7)
        } else if (currentSquare.innerText === square5.innerText && currentSquare.innerText === square9.innerText) {
            return winner(currentSquare, square5, square9)
        } else {
            if(numberOfPlays>=9) {
                draw();
            }
            return false;
        }
    } else if(currentSquare.id === "a2"){
        if(currentSquare.innerText === square1.innerText && currentSquare.innerText === square3.innerText) {
            return winner(currentSquare, square1, square3)
        } else if (currentSquare.innerText === square5.innerText && currentSquare.innerText === square8.innerText) {
            return winner(currentSquare, square5, square8)
        } else {
            if(numberOfPlays>=9) {
               draw();
            }
            return false;
        }
    } else if(currentSquare.id === "a3"){
        if(currentSquare.innerText === square1.innerText && currentSquare.innerText === square2.innerText) {
            return winner(currentSquare, square1, square2)
        } else if (currentSquare.innerText === square5.innerText && currentSquare.innerText === square7.innerText) {
            return winner(currentSquare, square5, square7)
        } else if (currentSquare.innerText === square6.innerText && currentSquare.innerText === square9.innerText) {
            return winner(currentSquare, square6, square9)
        } else {
            if(numberOfPlays>=9) {
                draw();
            }
            return false;
        }
    } else if(currentSquare.id === "b1"){
        if(currentSquare.innerText === square1.innerText && currentSquare.innerText === square7.innerText) {
            return winner(currentSquare, square1, square7)
        } else if (currentSquare.innerText === square5.innerText && currentSquare.innerText === square6.innerText) {
            return winner(currentSquare, square5, square6)
        } else {
            if(numberOfPlays>=9) {
                draw();
            }
            return false;
        }
    } else if(currentSquare.id === "b2"){
        if(currentSquare.innerText === square1.innerText && currentSquare.innerText === square9.innerText) {
            return winner(currentSquare, square1, square9)
        } else if (currentSquare.innerText === square2.innerText && currentSquare.innerText === square8.innerText) {
            return winner(currentSquare, square2, square8)
        } else if (currentSquare.innerText === square3.innerText && currentSquare.innerText === square7.innerText) {
            return winner(currentSquare, square3, square7)
        } else {
            if(numberOfPlays>=9) {
                draw();
            }
            return false;
        }
    } else if(currentSquare.id === "b3"){
        if(currentSquare.innerText === square3.innerText && currentSquare.innerText === square9.innerText) {
            return winner(currentSquare, square9, square3)
        } else if (currentSquare.innerText === square4.innerText && currentSquare.innerText === square5.innerText) {
            return winner(currentSquare, square4, square5)
        } else {
            if(numberOfPlays>=9) {
                draw();
            }
            return false;
        }
    } else if(currentSquare.id === "c1"){
        if(currentSquare.innerText === square8.innerText && currentSquare.innerText === square9.innerText) {
            return winner(currentSquare, square8, square9)
        } else if (currentSquare.innerText === square1.innerText && currentSquare.innerText === square4.innerText) {
            return winner(currentSquare, square1, square4)
        } else if (currentSquare.innerText === square3.innerText && currentSquare.innerText === square5.innerText) {
            return winner(currentSquare, square3, square5)
        } else {
            if(numberOfPlays>=9) {
                draw();
            }
            return false;
        }
    } else if(currentSquare.id === "c2"){
        if(currentSquare.innerText === square7.innerText && currentSquare.innerText === square9.innerText) {
            return winner(currentSquare, square7, square9)
        } else if (currentSquare.innerText === square2.innerText && currentSquare.innerText === square5.innerText) {
            return winner(currentSquare, square2, square5)
        } else {
            if(numberOfPlays>=9) {
                draw();
            }
            return false;
        }
    } else if(currentSquare.id === "c3"){
        if(currentSquare.innerText === square7.innerText && currentSquare.innerText === square8.innerText) {
            return winner(currentSquare, square7, square8)
        } else if (currentSquare.innerText === square1.innerText && currentSquare.innerText === square5.innerText) {
            return winner(currentSquare, square5, square1)
        } else if (currentSquare.innerText === square3.innerText && currentSquare.innerText === square6.innerText) {
            return winner(currentSquare, square6, square3)
        }else {
            if(numberOfPlays>=9) {
                draw();
            }
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


