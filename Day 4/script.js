// selecting by id
// const containerEl = document.getElementById('container');

// select by querySelector
// const textInputEl = document.querySelector('input');

// select by querySelector
// const buttonEl = document.querySelector('#btn');

// const funDivEl = document.querySelector('#fun');
// const funDivEl2 = document.getElementById('fun');


// console.log(containerEl, textInputEl, buttonEl);
// console.log();
// console.log(funDivEl, funDivEl2);

// function logText(e){
//     console.log(e.target, e);
// }

// textInputEl.addEventListener('input', logText)

// textInputEl.style.color = 'red';
// textInputEl.style.transform = 'rotate(-30deg)'

// containerEl.style.backgroundColor = 'salmon';



//for color range
//for color range
//for color range


const redSliderEl = document.getElementById('red');
const greenSliderEl = document.getElementById('green');
const blueSliderEl = document.getElementById('blue');

const colorDivEl = document.querySelector('#color');

const redValueEl = document.getElementById('redValue');
const greenValueEl = document.getElementById('greenValue');
const blueValueEl = document.getElementById('blueValue');

function componentToHex(color) {
    const hex = parseInt(color).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function onColorChange() {
    const red = redSliderEl.value;
    const green = greenSliderEl.value;
    const blue = blueSliderEl.value;

    // Met à jour la couleur de la div avec les valeurs RGB
    colorDivEl.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

    // Met à jour les valeurs hexadécimales affichées
    redValueEl.textContent = `#${componentToHex(red)}`;
    greenValueEl.textContent = `#${componentToHex(green)}`;
    blueValueEl.textContent = `#${componentToHex(blue)}`;
}

onColorChange();  // Initialisation pour appliquer la couleur par défaut

// Écoute les changements sur chaque slider
redSliderEl.addEventListener('input', onColorChange);
greenSliderEl.addEventListener('input', onColorChange);
blueSliderEl.addEventListener('input', onColorChange);
