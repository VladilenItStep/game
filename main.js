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
let score = 0


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

function handlerCircleClick(e) {
    if (e.target.classList.contains('circle')) {
        score = score + 1
            // score++
        e.target.remove()
        createRandomCircle()
    }
}

boardEl.addEventListener('click', handlerCircleClick)


function createRandomCircle() {
    const circle = document.createElement('div')
    circle.classList.add('circle')
    const size = getRandomIntInclusive(15, 50)
    const { width, height } = boardEl.getBoundingClientRect()
    console.log(boardEl.getBoundingClientRect());
    circle.style.width = circle.style.height = size + 'px'
    circle.style.backgroundColor = getRandomColor()
    const x = getRandomIntInclusive(0, width - size)
    const y = getRandomIntInclusive(0, height - size)
    circle.style.top = y + 'px'
    circle.style.left = x + 'px'
    boardEl.append(circle)

}

function startGame() {
    setTime(time)
    idSetInterval = setInterval(decTime, 1000)
        // создать circle
    createRandomCircle()

}

function finishGame() {
    console.log('Game over');
    scoreEl.innerHTML = score
    modalEl.classList.add('open')
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

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function getRandomColor() {
    return `rgb(${getRandomIntInclusive(0, 255)}, ${getRandomIntInclusive(0, 255)}, ${getRandomIntInclusive(0, 255)})`
}

modalEl.addEventListener('click', handlerModalClick)

function resetGame() {
    this.classList.remove('open')
    time = selectedTime
    score = 0
    boardEl.innerHTML = ''
}

function handlerModalClick(e) {
    if (e.target.getAttribute('id') === 'restart') {
        console.log('restart');
        resetGame.call(this)
        startGame()
    }

    if (e.target.getAttribute('id') === 'cancel') {
        resetGame.call(this)
        cardsEl.forEach((card) => {
            card.classList.remove('up')
        })
    }
}