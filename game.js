let buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let userRepeatSequence = []

let clicked = 0
let level = 1
let started = false

$(document).keypress(function() {
    if (started === false) {
        $("body").removeClass("game-over")
        $("#heading").text(`Level: ${level}`)
        $('#h3').removeClass('waiting')
        $('#h3').text('Repita a sequência:')

        started = true;
        setTimeout(function() { nextSequence() }, 300)
    }
})

$(".btn").click(function() {
    clicked++
    let userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour)
    animatePress(userChosenColour)

    checkAnwser(userClickedPattern.length - 1)
})

function checkAnwser(currentLevel) {
    if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
        gameOver()
    }
    if (gamePattern.length === userClickedPattern.length) {
        repeatSequence()
    }
}

function repeatSequence() {
    level++
    $("#heading").text(`Level: ${level}`)
    $('#h3').text('Aguarde...')
    $('#h3').addClass('waiting')

    let pos = 0

    let repeat = setInterval(function() {

        $("#" + gamePattern[pos]).fadeIn(100).fadeOut(100).fadeIn(100);

        let audio = new Audio('sounds/' + gamePattern[pos] + ".mp3")
        audio.play();

        pos++

        if (pos >= clicked) {
            clearInterval(repeat)
            let newColor = setInterval(function() {
                nextSequence()

                if (userClickedPattern.length === 0) {
                    clearInterval(newColor)
                }
            }, 800)
        }
    }, 800)
}

function nextSequence() {
    $('#h3').removeClass('waiting')
    $('#h3').text('Repita a sequência:')

    pos = 0
    clicked = 0
    userClickedPattern = []

    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    let audio = new Audio('sounds/' + randomChosenColour + ".mp3")
    audio.play();
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play()
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed")
    }, 100)
}

function gameOver() {
    playSound("wrong")
    $("#heading").text(`Game Over!`)
    $('#h3').text('Clique em uma tecla para reiniciar')
    $('h3').addClass('waiting')
    $("body").addClass("game-over")
    started = false
    gamePattern = []
    level = 1
}