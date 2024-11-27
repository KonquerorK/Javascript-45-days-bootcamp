const circleDivEL = document.getElementById("circle");
const sliderEl = document.getElementById("slider");
const buttonEL = document.getElementById("auto-pilot");

let intervalID = 0;
let degrees = 0;
let isRunning = false;

function onToggleRotate() {
  if (isRunning) {
    buttonEL.textContent = "Start";
    clearInterval(intervalID);
    isRunning = false;
  } else {
    buttonEL.textContent = "Stop";
    intervalID = setInterval(() => {
      degrees++;
      sliderEl.value = degrees;
      circleDivEL.style.transform = `rotate(${degrees}deg)`;
    }, 5);
    isRunning = true;
  }
}

function onSliderMove(e){
    degrees = +e.target.value;
    clearInterval(intervalID);
    circleDivEL.style.transform = `rotate(${degrees}deg)`;
}

buttonEL.addEventListener("click", onToggleRotate);
sliderEl.addEventListener('input', onSliderMove);
