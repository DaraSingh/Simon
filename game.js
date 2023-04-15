var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

function nextSequence() {
    level++;
    userClickedPattern = [];
    $("h1").text("level " + level);
    var randomNumber = Math.floor((Math.random()) * 4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#" + randomChoosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);

}

$(".btn").on("click", function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour)
    checkAnswer((userClickedPattern.length) - 1);
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () { $("#" + currentColour).removeClass("pressed") }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length)
            setTimeout(function () {
                nextSequence();
            }, 1000);
    }
    else {
        playSound("wrong");
        $("*").addClass("game-over");
        setTimeout(function () {
            $("*").removeClass("game-over")
        }, 500);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

var started = false;
var level = 0;
$("*").keydown(function () {
    if (started == false) {
        started = true;
        level = 0;
        $("h1").text("level " + level);
        nextSequence();
    }
});