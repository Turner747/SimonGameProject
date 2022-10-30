


let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

$(document).on("keydown", function() {
    if(level === 0)
        nextSequence();
});

function nextSequence() {
    userClickedPattern = [];

    let randomNumber =  Math.floor(Math.random() * 4);

    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour)
			.fadeOut(100)
			.fadeIn(100)
			.fadeOut(100)
			.fadeIn(100);
    playSound(randomChosenColour);

    ++level;
    $("h1").text("Level " + level);
}

$(".btn").click(function (ev){
    
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function playSound(sound) {
		let audio = new Audio("sounds/" + sound + ".mp3");
		audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => $("#"+currentColour).removeClass("pressed"), 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if (gamePattern.length === (currentLevel + 1))
            setTimeout(nextSequence, 1000);
    }
    else {
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => $("body").removeClass("game-over"), 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        level = 0;
        gamePattern = [];
    }
}

