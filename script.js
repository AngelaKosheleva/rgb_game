/**
 * Created by An on 10.12.2017.
 */
var min = 0;
var max = 255;
var puzzleColor;
var puzzleButton;
var buttonCount = 0;
var pointsCount = 0;
var attemptCount = 0;
var difficultyLevel = 0;
var gameLevel = 0;

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById("start").addEventListener("click", startGame);

function startGame() {
    /*   puzzleColor = generateColor();
     document.getElementById("game").style.backgroundColor = puzzleColor;

     var puzzleButton = getRandomInteger(1, buttonCount); //generiruem nomenr knopki dlja zagadannogo cveta
     document.getElementById("button_" + puzzleButton).innerHTML = puzzleColor; //zapisyvaem kod zagadannogo cveta na knopku
     for (i = 0; i < buttonCount - 1; i++) { //cikl generacii kodov cvetov dlja ostal'nyh knopok
     if (puzzleButton < 4) {
     puzzleButton++;
     }
     else {
     puzzleButton = 1;
     }
     document.getElementById("button_" + puzzleButton).innerHTML = generateColor();

     } */
    document.getElementById("game").style.visibility = "visible";
    gameLevel++;
    if (gameLevel > 1) {
        removeButton();
    }
    difficultyCheck();
    addButton();

    for (i = 1; i <= buttonCount; i++) {
        document.getElementById("button_" + i).innerHTML = generateColor();
    }
    puzzleButton = getRandomInteger(1, buttonCount);
    puzzleColor = document.getElementById("button_" + puzzleButton).innerHTML;
    document.getElementById("game").style.backgroundColor = puzzleColor;
    addListenerToButtons();
}

function addListenerToButtons() {
    for (y = 1; y <= buttonCount; y++) {
        var butName = "button_" + y;
        document.getElementById(butName).addEventListener("click", compareName);
    }
}

function removeListenerFromButtons() {
    for (z = 1; z <= buttonCount; z++) {
        var butName = "button_" + z;
        document.getElementById(butName).removeEventListener("click", compareName);
    }
}

function generateColor() {  //generiruem cvet
    var redPart = getRandomInteger(min, max);
    var greenPart = getRandomInteger(min, max);
    var bluePart = getRandomInteger(min, max);
    return 'rgb(' + redPart + ', ' + greenPart + ', ' + bluePart + ')';
}

function compareName() {
    if (attemptCount > 0) {
        if (this.innerHTML == puzzleColor) {
            pointsCount += 10;
            colorChange();
            this.innerHTML = "yes, you right!";
            this.style.color = "black";
            document.getElementById("count").innerHTML = pointsCount;
            removeListenerFromButtons();
        }
        else {
            attemptCount--;
            pointsCount--;
            this.style.background = this.innerHTML;
            document.getElementById("count").innerHTML = pointsCount;
        }
    }
    else {
        colorChange();
        var btnHere = document.getElementById("button_" + puzzleButton);
        btnHere.innerHTML = "I`m here! " + puzzleColor;
        btnHere.style.color = "black";
        document.getElementById("count").innerHTML = pointsCount;
    }
}

function addButton() {
    for (i1 = 1; i1 <= buttonCount; i1++) {
        var bttn = document.createElement("button");
        var bttnName = "button_" + i1;
        bttn.setAttribute("id", bttnName);
        var elem = document.getElementById("buttonsBlock").appendChild(bttn);
    }
}
function removeButton() {
    for (i2 = 1; i2 <= buttonCount; i2++) {
        var removingButton = document.getElementById("button_" + i2);
        removingButton.parentNode.removeChild(removingButton);
    }
}

function difficultyCheck() {
    var elem = document.getElementsByName("gameDifficulty");
    for (w = 0; w < elem.length; w++) {
        if (elem[w].checked) {
            difficultyLevel = +elem[w].getAttribute("value");
            // + in front of elem[v] = parse string to integer
            attemptCount = difficultyLevel + 2;
            buttonCount = difficultyLevel * 3;
            break;
        }
    }
}

function colorChange() {
    for (v = 1; v <= buttonCount; v++) {
        var temp = document.getElementById("button_" + v);
        temp.style.background = temp.innerHTML;
        temp.innerHTML = v;
        temp.style.color = "transparent";
        temp.style.transitionDuration = "100ms";
    }
}