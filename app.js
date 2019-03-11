document.addEventListener("DOMContentLoaded", initGame);

class Game {
    constructor(data, initArray, successMessage) {

        // all html data
        this.data = document.getElementById("game-field");

        // array with all numbers
        this.initArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null];

        // message that user see if he win the game
        this.successMessage = "Congratulations! You win!";
    }

    // function that paint the game square with cells
    drawSquare(arr) {
        let htmlData = `
        <h1>15 puzzle</h1>
        <div class="square-wrapper">`;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== null) {
                htmlData += `<div class="cell">${arr[i]}</div>`
            } else {
                htmlData += `<div class="cell no-value"></div>`
            }
        }

        htmlData += `</div>`;

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

    loadEventsListeners() {
        document.getElementById("start-btn").addEventListener("click", () => {
            let newArr = this.shuffleData(this.initArray);
            this.drawSquare(newArr);
        });

        console.log("load event lisrt");
    }
    
    moveCell() {}
    checkResult() {}

}


function initGame() {

    let that = this;

    // init game object
    let game = new Game();

    // paint the shuffled array
    game.drawSquare(game.initArray);

    // load event listeners for object of class Game
    game.loadEventsListeners();

}

