document.addEventListener("DOMContentLoaded", initGame);

class Game {
    constructor(data, initArray) { // what are these parameters for?

        // all html data
        this.data = document.getElementById("game-field");

        // array with all numbers
        this.initArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null];
    }

    // function that paint the game square with cells
    drawSquare(arr) {
        let htmlData = `
        <h1>15 puzzle</h1>
        <table class="square-wrapper"><tbody><tr>`;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== null) {
                htmlData += `<td class="cell">${arr[i]}</td>`
            } else {
                htmlData += `<td class="cell no-value">${arr[i]}</td>`
            }
        }

        htmlData += `</tr></tbody></table>`;

        return this.data.innerHTML = htmlData;
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

        return arr; // the original arr is already updated, you don't need to return it
    }

    loadEventsListeners() {
        // Add event listener for button
        document.getElementById("start-btn").addEventListener("click", () => {
            let newArr = this.shuffleData(this.initArray); // use const
            this.drawSquare(newArr);

            this.data.classList = "container";

            // Add event listeners for cells on the square
            let cells = document.getElementsByClassName("cell"); // use const

            for (let i = 0; i < cells.length; i++) {
                cells[i].addEventListener("click", this.moveCell);
            }
        });
    }

    moveCell(event) {
        let currencurrentCell = event.target, // const doesn't make objects immutable, so you can use it for arrays and objects
            currentCellIndex = currencurrentCell.cellIndex,
            emptyCellElem = document.querySelector(".no-value"),
            emptyCellIndex = emptyCellElem.cellIndex;

        if (!event.target.classList.contains('no-value')) {
            switch (currentCellIndex - emptyCellIndex) {
                case -1:
                    swapElements(currencurrentCell, emptyCellElem);
                    checkResult();
                    break;
                case 1:
                case 4:
                case -4:
                    swapElements(emptyCellElem, currencurrentCell);
                    checkResult();
            }
            // you call checkResult in all cases, so you can put it after the switch-case
        }

        function swapElements(a, b) {
            let p1 = a.parentNode, // the same for Nodes, you can use const
                p2 = b.parentNode,
                sib = b.nextSibling;
            // Change elements places
            if (sib === a) sib = sib.nextSibling;
            p1.replaceChild(b, a);
            if (sib) p2.insertBefore(a, sib);
            else p2.appendChild(a);
        }

        function checkResult() {
            // Winner combinations
            const winnerPatterns = ['123456789101112131415 ', ' 123456789101112131415', '159132610143711154812 '];

            // Message that user see if he win the game
            let successMessage = "Congratulations! You win! Take a cookie."; // const

            // Get node list with cells
            let tableData = document.querySelectorAll(".square-wrapper .cell"); // const

            // Array for cells data
            let tableArr = []; // and so on...

            // Add values for array from table cells
            for (let i = 0; i < tableData.length; i++) {

                if (tableData[i].textContent == 'null') {
                    tableArr[i] = '';
                } else {
                    tableArr[i] = +(tableData[i].textContent);
                }

            }

            // Combine array with values into string
            let result = tableArr.join('');

            // Check if the string with values is a winner combination
            for (let i = 0; i < winnerPatterns.length; i++) {
                if (winnerPatterns[i] === result) {
                    showMessage(successMessage);
                    document.getElementById("game-field").classList = "container no-events";
                }
            }


            // function that draw the message 
            function showMessage(message) {
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
    }
}


function initGame() {

    let that = this; // what for?

    // init game object
    let game = new Game();

    // paint the shuffled array
    game.drawSquare(game.initArray);

    // load event listeners for object of class Game
    game.loadEventsListeners();

}
