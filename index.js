var gameInSession = false;
var colorsArr = ["green", "red", "yellow", "blue"];
var currRound = 1;
var playerPressCount = 0;
var simonColorArr = [];
var playerColorArr = [];

$(document).ready(function () {
    initGame();
});

function initGame() {

    // Attach keypress event to the document
    $(document).keypress(function (event) {

        // Only when the user presses A or a, should a new game start and 
        // only if the game is not already in session
        if (!gameInSession && (event.key === "a" || event.key === "A")) {
            newGame();
        }
    });

    // Attaching button press even to all buttons
    $(".btn").click(function () {
        $("#" + $(this).attr("id")).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound($(this).attr("id"));

        if (gameInSession) {
            playerPressCount++;
            handlePlayerTurn($(this).attr("id"), playerPressCount);
        }
    });

}

function newGame() {
    gameInSession = true;
    simonColorArr = [];
    playerColorArr = [];
    currRound = 1;

    newRound();
}

function newRound() {

    // Initialize the player pressing the buttons counter
    playerPressCount = 0;

    // Init main header
    $(".main-header").text("Level " + currRound);
    playerColorArr = [];

    // Generate new color for the sequence
    var newColorInd = Math.floor(Math.random() * 4);
    var newColor = colorsArr[newColorInd];
    simonColorArr.push(newColor);

    // Simulate simon's chosen color button press
    simulateButtonPress(newColor);

}

function handlePlayerTurn(colorNamePressed, playerPressingCount) {

    // Insert player move to the memory
    playerColorArr.push(event.target.id);

    if (playerColorArr[playerPressingCount - 1] !== simonColorArr[playerPressingCount - 1]) {

        //Update the game in session bool
        gameInSession = false;

        // Player was wrong
        playErrorSound();

        // Update the main header
        $(".main-header").text("Game Over, press A key to start a new game");

    } else if (playerPressingCount === simonColorArr.length) {

        // Update the round number
        currRound++;

        // initiate new round after 1 sec
        newRound();
    }

}

// Sound functions //
function playSound(buttonId) {

    var audio = new Audio("sounds/" + buttonId + ".mp3");
    audio.play();
}

function playErrorSound() {

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
}

// General functions //
function simulateButtonPress(buttonColor) {
    setTimeout(function () {
        // Play simon round to the player
        $("." + buttonColor).addClass("pressed");
        setTimeout(function () {
            $("." + buttonColor).removeClass("pressed");
        }, 200);
        playSound(buttonColor);
    }, 1000);
}

// General functions //
// function compareArrays(arr1, arr2) {

//     var result = true;
//     var currInd = 0;

//     if (arr1.length == arr2.length) {
//         while (result && (currInd < arr1.length)) {
//             if (arr1[currInd] !== arr2[currInd]) {
//                 result = false;
//             } else {
//                 currInd++;
//             }
//         }
//     } else {
//         result = false;
//     }

//     return result;
// }