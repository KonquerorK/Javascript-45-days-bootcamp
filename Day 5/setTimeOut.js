const buttonEl = document.getElementById('btn');
const buttonDelayedEl = document.querySelector('#btn-delayed');
const h2El = document.querySelector('h2');
const changeFontBtnEL = document.getElementById('btn-change-font');

function delayedClick(){
    setTimeout(function (){
        alert('You Rock!');
    }, 2000);
}

buttonEl.addEventListener('click', () => {
    alert('You Rock !!');
});

function onChangeFont(){
    setTimeout(() => {
        h2El.style.fontSize = '100px';
    }, 3000);
}

buttonDelayedEl.addEventListener('click', delayedClick);

changeFontBtnEL.addEventListener('click', onChangeFont);

