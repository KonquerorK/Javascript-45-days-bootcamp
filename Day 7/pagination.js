const limit = 0;
let start = 0;

const url = 'https://jsonplaceholder.typicode.com/photos';
const previousBtnEl = document.getElementById('previous');
const nextBtnEl = document.getElementById('next');
previousBtnEl.setAttribute('disabled', true);

async function fetchImages() {
    const response = fetch(`${url}?_start=${start}&_limit=${limit}`);
    return await response.json();
}

// fetchImagesSrc().then((data) => console.log(data));

function setImageSrc(results) {
    for (let i = 1; i <= 5; i++) {
        // document.getElementById(`image-${i}`).src = results[i - 1].thumbnailUrl;
        const imageEl = document.getElementById(`image-${i}`);
        if (results[i - 1]) {
            imageEl.src = results[i - 1].thumbnailUrl;
            imageEl.style.display = 'inline';
        } else {
            imageEl.style.display = 'none';
        }
    }
}


async function newPage(amount) {
    start += amount;
    const images = await fetchImages();
    setImageSrc(images);
    if (start <= 0) {
        previousBtnEl.setAttribute('disabled', true);
        return;
    }

    previousBtnEl.removeAttribute('disabled');
}



newPage(0).then().catch(console.log);
previousBtnEl.addEventListener('click', ()=> newPage(-5));
nextBtnEl.addEventListener('click', () => newPage(5));


