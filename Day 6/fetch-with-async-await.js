const h2El = document.querySelector("h2");
const buttonEl = document.querySelector("button");
let isLoading = false;

async function getBadJoke() {
  if (isLoading) {
    return;
  }
  isLoading = true;
  try {
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers:{
        Accept: 'application/json'
      }
    });
    const json = await response.json();
    h2El.textContent = json.joke;
    isLoading = false;
  } catch (error) {
    console.log(e);
    h2El.textContent = 'Failed to load joke';
    isLoading = false;
  }

}

buttonEl.addEventListener('click', async () => {
  getBadJoke();
});
document.addEventListener('DOMContentLoaded', getBadJoke);



  
// fetch('https://icanhazdadjoke.com/', {
//   headers:{
//     Accept: 'application/json'
//   }
// }).then((response) => response.json())
// .then((j) => {
//   h2El.textContent = j.joke;
//   isLoading = false;
// })
// .catch((e) => {
//   console.log(e);
//   h2El.textContent = 'Failed to load joke';
//   isLoading = false;
// });