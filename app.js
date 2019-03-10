document.addEventListener("DOMContentLoaded", initGame);

function initGame() {

    // init game object
    let game = new Game();

    // paint the shuffled array
    game.drawSquare(game.initArray);

    // load event listeners for object of class Game
    game.loadEventsListeners();

}

class Game {
    constructor(data, initArray, successMessage) {

        // all html data
        this.data = document.getElementById("game-field");

        // array with all numbers
        this.initArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

        // message that user see if he win the game
        this.successMessage = "Congratulations! You win!";
    }

    // function that paint the game square with cells
    drawSquare(arr) {
        let htmlData = `
        <h1>15 puzzle</h1>
        <div class="square-wrapper">`;

        for (let i = 0; i < arr.length; i++) {
            htmlData += `<div class="cell">${arr[i]}</div>`
        }

        htmlData += `<button class="button" id="start-btn" type="button" name="button">Start</button></div>`;

        return this.data.innerHTML = htmlData;
    }

    // function that draw the message 
    showMessage(message) {
        const div = document.createElement("div");
        div.className = 'alert success';
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector(".container");
        const squareWrap = document.querySelector(".square-wrapper");
        container.insertBefore(div, squareWrap);

        setTimeout(function () {
            document.querySelector(".alert").remove();
        }, 9000);
    }

    loadEventsListeners() {
        document.getElementById("start-btn").addEventListener("click", btnStartClick);
    }

    shuffleData(arr) {
        // this function is an examlpe of Fisher–Yates shuffle

        let counter = arr.length;

        // While there are elements in the array
        while (counter > 0) {

            // Pick a random index
            let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            let temp = arr[counter];
            arr[counter] = arr[index];
            arr[index] = temp;
        }

        return arr;
    }
    moveCell() {}
    checkResult() {}

}


function btnStartClick(Game) {
    // shuffle initial array
    let newArr = game.shuffleData(this.initArray);

    // paint the shuffled array
    game.drawSquare(newArr);

}

