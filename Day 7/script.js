
const emailEL = document.getElementById('email');
const messageEl = document.getElementById('message');
const buttonEl = document.querySelector('button');

async function onSubmit() {
    try {
        const response = fetch('https://eo1gw3xko2blkxn.m.pipedream.net',{
            method: 'POST',
            body: JSON.stringify({
                email: emailEL.value,
                message: messageEl.value
            })
        });
        const json = (await response).json();
        console.log(json, 'json');
    } catch (e) {
        alert('There was an error');
    }
}

buttonEl.addEventListener('click', onSubmit);
