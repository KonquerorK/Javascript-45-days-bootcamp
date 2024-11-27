// alert('Hello');
const buttonEl = document.querySelector('button');
const h1El = document.querySelector('random-dog');
const imgEl = document.querySelector('img');

function getDogCeo(){
    fetch('https://dog.ceo/api/breeds/image/random', {
        headers: {
            Accept : 'application/json',
        },
    }).then((response) => response.json())
    .then((i) => {
        imgEl.src = i.message;
    })
    .catch((e) => {
        console.log(e);
        h1El.textContent = 'failed to load Dog CEO';
    });
}


buttonEl.addEventListener("click", () => {
    getDogCeo();
  });
  
document.addEventListener("DOMContentLoaded", getDogCeo);
