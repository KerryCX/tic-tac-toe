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


const square1 = document.querySelector("#a1")
square1.addEventListener("click", () => {
    if(square1.innerHTML === "") {
        counter = currentPlayer(counter)
        messageBox.innerText=currentPlayer(counter)+"'s turn"
        square1.innerHTML ="<h1>"+counter+"</h1>"
        numberOfPlays ++
        if(checkIfWinner(square1)){
            // sectionArea.classList.toggle("section-toggle");
            // resetButton.classList.toggle("reset-button-toggle");
        }    
    } else {
        messageBox.innerText= "Already taken, choose another place for " + currentPlayer(counter)
    }
    
})

const square2 = document.querySelector("#a2")
square2.addEventListener("click", () => {
    if(square2.innerHTML === "") {
        counter = currentPlayer(counter)
        messageBox.innerText=currentPlayer(counter)+"'s turn"
        square2.innerHTML ="<h1>"+counter+"</h1>"
        numberOfPlays ++
        if(checkIfWinner(counter, square2)){
            sectionArea.classList.toggle("section-toggle");
            resetButton.classList.toggle("reset-button-toggle");
        }    
    } else {
        messageBox.innerText= "Already taken, choose another place for " + currentPlayer(counter)
    }
})

const square3 = document.querySelector("#a3")
square3.addEventListener("click", () => {
    if(square3.innerHTML === "") {
        counter = currentPlayer(counter)
        messageBox.innerText=currentPlayer(counter)+"'s turn"
        square3.innerHTML ="<h1>"+counter+"</h1>"
        numberOfPlays ++
        if(checkIfWinner(square3)){
            sectionArea.classList.toggle("section-toggle");
            resetButton.classList.toggle("reset-button-toggle");
        }    
    } else {
        messageBox.innerText= "Already taken, choose another place for " + currentPlayer(counter)
    }
})

const square4 = document.querySelector("#b1")
square4.addEventListener("click", () => {
    if(square4.innerHTML === "") {
        counter = currentPlayer(counter)
        messageBox.innerText=currentPlayer(counter)+"'s turn"
        square4.innerHTML ="<h1>"+counter+"</h1>"
        numberOfPlays ++
        if(checkIfWinner(square4)){
            // sectionArea.classList.toggle("section-toggle");
            // resetButton.classList.toggle("reset-button-toggle");
        }    
    } else {
        messageBox.innerText= "Already taken, choose another place for " + currentPlayer(counter)
    }
})

const square5 = document.querySelector("#b2")
square5.addEventListener("click", (e) => {
    if(square5.innerHTML === "") {
        counter = currentPlayer(counter)
        messageBox.innerText=currentPlayer(counter)+"'s turn"
        square5.innerHTML ="<h1>"+counter+"</h1>"
        numberOfPlays ++
        if(checkIfWinner(square5)){
            // sectionArea.classList.toggle("section-toggle");
            // resetButton.classList.toggle("reset-button-toggle");
        }    
    } else {
        messageBox.innerText= "Already taken, choose another place for " + currentPlayer(counter)
    }
})

const square6 = document.querySelector("#b3")
square6.addEventListener("click", (e) => {
    if(square6.innerHTML === "") {
        counter = currentPlayer(counter)
        messageBox.innerText=currentPlayer(counter)+"'s turn"
        square6.innerHTML ="<h1>"+counter+"</h1>"
        numberOfPlays ++
        if(checkIfWinner(square6)){
            // sectionArea.classList.toggle("section-toggle");
            // resetButton.classList.toggle("reset-button-toggle");
        }    
    } else {
        messageBox.innerText= "Already taken, choose another place for " + currentPlayer(counter)
    }
})

const square7 = document.querySelector("#c1")
square7.addEventListener("click", () => {
    if(square7.innerHTML === "") {
        counter = currentPlayer(counter)
        messageBox.innerText=currentPlayer(counter)+"'s turn"
        square7.innerHTML ="<h1>"+counter+"</h1>"
        numberOfPlays ++
        if(checkIfWinner(square7)){
            // sectionArea.classList.toggle("section-toggle");
            // resetButton.classList.toggle("reset-button-toggle");
        }    
    } else {
        messageBox.innerText= "Already taken, choose another place for " + currentPlayer(counter)
    }
})

const square8 = document.querySelector("#c2")
square8.addEventListener("click", () => {
    if(square8.innerHTML === "") {
        counter = currentPlayer(counter)
        messageBox.innerText=currentPlayer(counter)+"'s turn"
        square8.innerHTML ="<h1>"+counter+"</h1>"
        numberOfPlays ++
        if(checkIfWinner(square8)){
            // sectionArea.classList.toggle("section-toggle");
            // resetButton.classList.toggle("reset-button-toggle");
        }    
    } else {
        messageBox.innerText= "Already taken, choose another place for " + currentPlayer(counter)
    }
})

const square9 = document.querySelector("#c3")
square9.addEventListener("click", () => {
    if(square9.innerHTML === "") {
        counter = currentPlayer(counter)
        messageBox.innerText=currentPlayer(counter)+"'s turn"
        square9.innerHTML ="<h1>"+counter+"</h1>"
        numberOfPlays ++
        if(checkIfWinner(square9)){
            // sectionArea.classList.toggle("section-toggle");
            // resetButton.classList.toggle("reset-button-toggle");
        }        
    } else {
        messageBox.innerText= "Already taken, choose another place for " + currentPlayer(counter)
    }
})

const checkIfWinner = (currentSquare) => {
    if(currentSquare.id === "a1"){
        if(currentSquare.innerText === square2.innerText && currentSquare.innerText === square3.innerText) {
            winner(currentSquare, square2, square3)
            return true;
        } else if (currentSquare.innerText === square4.innerText && currentSquare.innerText === square7.innerText) {
            winner(currentSquare, square4, square7)
            return true;
        } else if (currentSquare.innerText === square5.innerText && currentSquare.innerText === square9.innerText) {
            winner(currentSquare, square5, square9)
            return true;
        } else {
            if(numberOfPlays>=9) {
                draw();
            }
            return false;
        }
    } else if(currentSquare.id === "a2"){
        if(currentSquare.innerText === square1.innerText && currentSquare.innerText === square3.innerText) {
            winner(currentSquare, square1, square3)
            return true;
        } else if (currentSquare.innerText === square5.innerText && currentSquare.innerText === square8.innerText) {
            winner(currentSquare, square5, square8)
            return true;
        } else {
            if(numberOfPlays>=9) {
               draw();
            }
            return false;
        }
    } else if(currentSquare.id === "a3"){
        if(currentSquare.innerText === square1.innerText && currentSquare.innerText === square2.innerText) {
            winner(currentSquare, square1, square2)
            return true;
        } else if (currentSquare.innerText === square5.innerText && currentSquare.innerText === square7.innerText) {
            winner(currentSquare, square5, square7)
            return true;
        } else if (currentSquare.innerText === square6.innerText && currentSquare.innerText === square9.innerText) {
            winner(currentSquare, square6, square9)
            return true;
        } else {
            if(numberOfPlays>=9) {
                draw();
            }
            return false;
        }
    } else if(currentSquare.id === "b1"){
        if(currentSquare.innerText === square1.innerText && currentSquare.innerText === square7.innerText) {
            winner(currentSquare, square1, square7)
            return true;
        } else if (currentSquare.innerText === square5.innerText && currentSquare.innerText === square6.innerText) {
            winner(currentSquare, square5, square6)
            return true;
        } else {
            if(numberOfPlays>=9) {
                draw();
            }
            return false;
        }
    } else if(currentSquare.id === "b2"){
        if(currentSquare.innerText === square1.innerText && currentSquare.innerText === square9.innerText) {
            winner(currentSquare, square1, square9)
            return true;
        } else if (currentSquare.innerText === square2.innerText && currentSquare.innerText === square8.innerText) {
            winner(currentSquare, square2, square8)
            return true;
        } else if (currentSquare.innerText === square3.innerText && currentSquare.innerText === square7.innerText) {
            winner(currentSquare, square3, square7)
            return true;
        } else {
            if(numberOfPlays>=9) {
                draw();
            }
            return false;
        }
    } else if(currentSquare.id === "b3"){
        if(currentSquare.innerText === square3.innerText && currentSquare.innerText === square9.innerText) {
            winner(currentSquare, square9, square3)
            return true;
        } else if (currentSquare.innerText === square4.innerText && currentSquare.innerText === square5.innerText) {
            winner(currentSquare, square4, square5)
            return true;
        } else {
            if(numberOfPlays>=9) {
                draw();
            }
            return false;
        }
    } else if(currentSquare.id === "c1"){
        if(currentSquare.innerText === square8.innerText && currentSquare.innerText === square9.innerText) {
            winner(currentSquare, square8, square9)
            return true;
        } else if (currentSquare.innerText === square1.innerText && currentSquare.innerText === square4.innerText) {
            winner(currentSquare, square1, square4)
            return true;
        } else if (currentSquare.innerText === square3.innerText && currentSquare.innerText === square5.innerText) {
            winner(currentSquare, square3, square5)
            return true;
        } else {
            if(numberOfPlays>=9) {
                draw();
            }
            return false;
        }
    } else if(currentSquare.id === "c2"){
        if(currentSquare.innerText === square7.innerText && currentSquare.innerText === square9.innerText) {
            winner(currentSquare, square7, square9)
            return true;
        } else if (currentSquare.innerText === square2.innerText && currentSquare.innerText === square5.innerText) {
            winner(currentSquare, square2, square5)
            return true;
        } else {
            if(numberOfPlays>=9) {
                draw();
            }
            return false;
        }
    } else if(currentSquare.id === "c3"){
        if(currentSquare.innerText === square7.innerText && currentSquare.innerText === square8.innerText) {
            winner(currentSquare, square7, square8)
            return true;
        } else if (currentSquare.innerText === square1.innerText && currentSquare.innerText === square5.innerText) {
            winner(currentSquare, square5, square1)
            return true;
        } else if (currentSquare.innerText === square3.innerText && currentSquare.innerText === square6.innerText) {
            winner(currentSquare, square6, square3)
            return true;
        }else {
            if(numberOfPlays>=9) {
                draw();
            }
            return false;
        }
    } 
}
const winner = (sq1, sq2, sq3) => {
    sectionArea.classList.toggle("section-toggle");
    resetButton.classList.toggle("reset-button-toggle");
    messageBox.innerText= counter + " wins"
    sq1.style.backgroundColor = "green"
    sq2.style.backgroundColor = "green"
    sq3.style.backgroundColor = "green"

}

const draw = () => {
    messageBox.innerText= "It is a draw!"
    square1.style.backgroundColor = "brown";
    square2.style.backgroundColor = "brown";
    square3.style.backgroundColor = "brown";
    square4.style.backgroundColor = "brown";
    square5.style.backgroundColor = "brown";
    square6.style.backgroundColor = "brown";
    square7.style.backgroundColor = "brown";
    square8.style.backgroundColor = "brown";
    square9.style.backgroundColor = "brown";
    sectionArea.classList.toggle("section-toggle");
    resetButton.classList.toggle("reset-button-toggle");
}

resetButton.addEventListener("click", () => {
    numberOfPlays = 0
    square1.style.backgroundColor = "white";
    square2.style.backgroundColor = "white";
    square3.style.backgroundColor = "white";
    square4.style.backgroundColor = "white";
    square5.style.backgroundColor = "white";
    square6.style.backgroundColor = "white";
    square7.style.backgroundColor = "white";
    square8.style.backgroundColor = "white";
    square9.style.backgroundColor = "white";
    square1.innerText = ""
    square2.innerText = ""
    square3.innerText = ""
    square4.innerText = ""
    square5.innerHTML = ""
    square6.innerText = ""
    square7.innerText = ""
    square8.innerText = ""
    square9.innerText = ""
    sectionArea.classList.toggle("section-toggle");
    resetButton.classList.toggle("reset-button-toggle");
    messageBox.innerText=currentPlayer(counter)+"'s turn"
})


