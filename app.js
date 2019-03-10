document.addEventListener("DOMContentLoaded", initGame);


class UI {
    constructor(data) {
        this.data = document.getElementById("game-field");
    }

    // function that paint the game square with cells
    drawSquare(arr) {
        let htmlData = `
        <h1>15 puzzle</h1>
        <div class="square-wrapper">`;

        for (let i = 0; i < arr.length; i++) {
            htmlData += `<div class="cell">${arr[i]}</div>`
        }

        htmlData += `<button class="button" type="button" name="button">Start</button></div>`;

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

}

class Game {
    start() {}
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

function initGame() {
    // array with all numbers
    let initArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    // message that user see if he win the game
    let successMessage = "Congratulations! You win!";

    // init game object
    let game = new Game();

    // shuffle initial array
    let newArr = game.shuffleData(initArray);


    // init ui object
    let ui = new UI();

    // paint the shuffled array
    ui.drawSquare(newArr);

}