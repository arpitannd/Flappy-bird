const bird = document.querySelector('#bird')
const pipe11 = document.querySelector('.container11')
const pipe12 = document.querySelector('.container12')
const pipe21 = document.querySelector('.container21')
const pipe22 = document.querySelector('.container22')
const pipe31 = document.querySelector('.container31')
const pipe32 = document.querySelector('.container32')
const pipe41 = document.querySelector('.container41')
const pipe42 = document.querySelector('.container42')
const bg = document.querySelector('#background')
const score = document.querySelector('#score')
const refresh = document.querySelector('#refresh')

function adjustHeight(pipe1, pipe2) {
    let h1 = Math.random() * 1000;
    while (h1 > 800 || h1 < 200) {
        h1 = Math.random() * 1000;
    }
    let h2 = 1000 - h1;
    pipe1.style.height = `${h1}px`
    pipe2.style.height = `${h2}px`
}

function outside() {
    var birdie = bird.getBoundingClientRect();
    if (birdie.y < 0 || birdie.y > window.innerHeight) return true
}

function collisionDetection(x, y, width, height) {
    var birdie = bird.getBoundingClientRect();
    if (birdie.x + birdie.width >= x &&
        birdie.x <= x + width &&
        birdie.y + birdie.height >= y &&
        birdie.y <= y + height) {
        return true
    }
    return false
}

let scoreInitial = -4
let check1 = 1
let check2 = 1
let check3 = 1
let check4 = 1

let freeze = 1

function passPipes() {
    var pipe1 = pipe11.getBoundingClientRect();
    var pipe1B = pipe12.getBoundingClientRect();
    var pipe2 = pipe21.getBoundingClientRect();
    var pipe2B = pipe22.getBoundingClientRect();
    var pipe3 = pipe31.getBoundingClientRect();
    var pipe3B = pipe32.getBoundingClientRect();
    var pipe4 = pipe41.getBoundingClientRect();
    var pipe4B = pipe42.getBoundingClientRect();

    if (freeze && (outside() || collisionDetection(pipe1.x, pipe1.y, pipe1.width, pipe1.height) ||
        collisionDetection(pipe2.x, pipe2.y, pipe2.width, pipe2.height) ||
        collisionDetection(pipe3.x, pipe3.y, pipe3.width, pipe3.height) ||
        collisionDetection(pipe4.x, pipe4.y, pipe4.width, pipe4.height) ||
        collisionDetection(pipe1B.x, pipe1B.y, pipe1B.width, pipe1B.height) ||
        collisionDetection(pipe2B.x, pipe2B.y, pipe2B.width, pipe2B.height) ||
        collisionDetection(pipe3B.x, pipe3B.y, pipe3B.width, pipe3B.height) ||
        collisionDetection(pipe4B.x, pipe4B.y, pipe4B.width, pipe4B.height))) {
            background.style.visibility = 'hidden'
            clearInterval(pipeCheck)
            bird.style.transition = '0s'
            bird.style.visibility = 'hidden'
            let sc = score.innerHTML
            score.innerHTML = `Your Score: ${sc}`
            refresh.innerHTML = 'Press any key to Restart'
            window.addEventListener('keydown', () => {
                window.location.reload();
            })
            window.addEventListener('touchstart', () => {
                window.location.reload();
            })
            freeze = 0
        }

    for (let i = 1; i <= 4; i++) {

        if (pipe1.x < '-100') adjustHeight(pipe11, pipe12)
        if (pipe2.x < '-100') adjustHeight(pipe21, pipe22)
        if (pipe3.x < '-100') adjustHeight(pipe31, pipe32)
        if (pipe4.x < '-100') adjustHeight(pipe41, pipe42)

        if (check1 === 1 && pipe1.x < '250') {
            scoreInitial += 1
            score.innerHTML = scoreInitial
            check1 = 0
        }
        if (pipe1.x > '350') check1 = 1

        if (check2 === 1 && pipe2.x < '300') {
            scoreInitial += 1
            score.innerHTML = scoreInitial
            check2 = 0
        }
        if (pipe2.x > '350') check2 = 1

        if (check3 === 1 && pipe3.x < '300') {
            scoreInitial += 1
            score.innerHTML = scoreInitial
            check3 = 0
        }
        if (pipe3.x > '350') check3 = 1

        if (check4 === 1 && pipe4.x < '300') {
            scoreInitial += 1
            score.innerHTML = scoreInitial
            check4 = 0
        }
        if (pipe4.x > '350') check4 = 1

    }
}

let pipeCheck = setInterval(() => {
    passPipes()
}, 10)

let falling = 1
bird.style.transition = '0.3s'

async function fly() {
    bird.style.transition = '0.2s'
    let pos = bird.getBoundingClientRect();
    let height = pos.y
    bird.style.transform = 'rotate(-30deg)'
    bird.style.top = `${height - 100}px`
    falling = 1
    fall()
    bird.style.transition = '0.3s'
}

window.addEventListener('keydown', () => {
    falling = 0;
})

window.addEventListener('touchstart', () => {
    falling = 0;
})

function fall() {
    let i = 0
    let intervalId = setInterval(async () => {
        let pos = bird.getBoundingClientRect();
        let height = pos.y
        if (10 + i < 120) {
            bird.style.transform = `rotate(${10 + i}deg)`
        }
        bird.style.top = `${height + 40}px`
        if (falling === 0) {
            clearInterval(intervalId)
            fly()
        }
        i += 5
    }, 160)
}

let first = 1
window.addEventListener('keydown', () => {
    if (first === 1) {
        firstFall()
    }
    first = 0
})

window.addEventListener('touchstart', () => {
    if (first === 1) {
        firstFall()
    }
    first = 0
})

function firstFall() {
    fall()
}
