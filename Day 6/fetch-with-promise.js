const h2El = document.querySelector("h2");
const buttonEl = document.querySelector("button");

function getBadJoke() {
  fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((j) => {
      h2El.textContent = j.joke;
    })
    .catch((e) => {
      console.log(e);
      h2El.textContent = "failed to load joke";
    });
}

buttonEl.addEventListener("click", () => {
  getBadJoke();
});

document.addEventListener("DOMContentLoaded", getBadJoke);
