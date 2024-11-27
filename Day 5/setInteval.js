const stopBtnEl = document.getElementById('stop');
const startBtnEl = document.getElementById('start');
const secondsH2El = document.getElementById('seconds');

const stopEffectBtnEl = document.getElementById('stop-effect');
const startEffectBtnEl = document.getElementById('effect');
const h2BackForthEl = document.getElementById('back-forth');

let intervalSeconds = 0;
let seconds = 0;

let degrees = 0;
let rotateIntervalId = 0;

function onEffect(){
    onStopEffect();
    rotateIntervalId = setInterval(() => {
        degrees++;
        h2BackForthEl.style.transform = `rotate3D(1,1,1, ${degrees}deg)`;
    }, 5);
}

function onStopEffect(){
    clearInterval(rotateIntervalId);
}

function onStart(){
    onStop();
    intervalSeconds = setInterval(() => {
        seconds++;
        secondsH2El.textContent = `Seconds : ${seconds}`;
    }, 1000);
}

function onStop(){
    clearInterval(intervalSeconds);
}

startBtnEl.addEventListener('click', onStart);
stopBtnEl.addEventListener('click', onStop);
startEffectBtnEl.addEventListener('click',onEffect);
stopEffectBtnEl.addEventListener('click',onStopEffect);