async function submit() {
    try {
        const res = fetch('https://codesandbox.io/p/sandbox/1-fetch-post-408hwv',{
            method: 'POST',
            body: JSON.stringify({
                name: 'Bill',
                message: 'Hi how are you'
            })
        });
        json = await res.json();
        console.log(json, 'response');
    } catch (e) {
        console.error(e);
    }
}

submit();

