const buttonEl = document.querySelector('button');
const imgEl = document.querySelector('img');

async function getDogImage() {
   try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const json = await response.json();
      imgEl.src = json.message;

   } catch (e) {
      alert('Dog API Failed');
   }
}



buttonEl.addEventListener("click", () => {
   getDogImage();
});
document.addEventListener("DOMContentLoaded", getDogImage);

