const startBtnEl = document.getElementById('start')
const cardsEl = document.querySelectorAll('.card')
const timeControllerEl = document.getElementById('time-list')
const timeEl = document.getElementById('time')
const boardEl = document.getElementById('board')
const modalEl = document.getElementById('modal')
const scoreEl = document.getElementById('score')

let selectedTime = null
let time = null
let idSetInterval = null


function handlerStartBtn(event) {
    event.preventDefault()
    cardsEl[0].classList.add('up')
}


startBtnEl.addEventListener('click', handlerStartBtn)


function handlerTimeController(event) {

    if (event.target.classList.contains('time-list__item')) {
        cardsEl[1].classList.add('up')
        selectedTime = parseInt(event.target.dataset.time)
        time = selectedTime
        startGame()
    }

}

timeControllerEl.addEventListener('click', handlerTimeController)

function startGame() {
    setTime(time)
    idSetInterval = setInterval(decTime, 1000)
    console.log(idSetInterval);

}

function finishGame() {
    console.log('Game over');
    clearInterval(idSetInterval)

}

function decTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time // time - 1
            // current = current < 10 ? `0${current}` : current
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }

}

function setTime(timeGame) {
    timeEl.innerHTML = `00:${timeGame}`
}