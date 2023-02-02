/* generate pipes every 1sec and randomly adjust their height (or move them up/down) and make them move/animate from right to left of the screen - done */
/* make the bird automatically fall unless a key is pressed - notDone */
/* and finally, game over if the bird hits any pipe */

const bird = document.querySelector('#bird')
const pipe11 = document.querySelector('.container11')
const pipe12 = document.querySelector('.container12')
const pipe21 = document.querySelector('.container21')
const pipe22 = document.querySelector('.container22')
const pipe31 = document.querySelector('.container31')
const pipe32 = document.querySelector('.container32')
const pipe41 = document.querySelector('.container41')
const pipe42 = document.querySelector('.container42')

function adjustHeight(pipe1, pipe2) {
    let h1 = Math.random() * 1000;
    while (h1 > 800 || h1 < 300) {
        h1 = Math.random() * 1000;
    }
    let h2 = 1000 - h1;
    pipe1.style.height = `${h1}px`
    pipe2.style.height = `${h2}px`
}

function passPipes() {
    var pipe1 = pipe11.getBoundingClientRect();
    var pipe2 = pipe21.getBoundingClientRect();
    var pipe3 = pipe31.getBoundingClientRect();
    var pipe4 = pipe41.getBoundingClientRect();
    for (let i = 1; i <= 4; i++) {
        if (pipe1.x < '-100') adjustHeight(pipe11, pipe12)
        if (pipe2.x < '-100') adjustHeight(pipe21, pipe22)
        if (pipe3.x < '-100') adjustHeight(pipe31, pipe32)
        if (pipe4.x < '-100') adjustHeight(pipe41, pipe42)
    }
}

let falling = 1
if (falling) {
    var pos = bird.getBoundingClientRect();
    let height = pos.y
    // while (height != 850)
}

window.addEventListener('click', () => {
    bird.style.transition = '0.3s'
    var pos = bird.getBoundingClientRect();
    falling = 0
    let height = pos.y
    bird.style.top = `${height - 80}px`
    // temp below
    if (height < 0) {
        bird.style.transition = '0s'
        bird.style.top = '750px'
    }
})

setInterval(() => {
    passPipes()
}, 100)

