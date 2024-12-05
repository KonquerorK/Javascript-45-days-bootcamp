const express = require('express');

hostname = '127.0.0.1';
port = '3000';

const app = express();
app.use(express.json());
let users = [];



app.get('/', (request, response) => {
    response.status(200).json(users);
});


app.get('/:id', (request, response) => {
    const id = request.params.id;
    let user = users.find(u => u.id === id);

    if (!user) {
        response.status(404).send("User Not Found!");
        return;
    }
});

app.post('/', (request, response) => {
    let user = request.body;
    user.id = Date.now();
    users.push(user);
    response.status(201).json(request.body);
});

// app.put('/:id', (request, response) => {
//     const id = request.params.id;
//     let user = users.filter(u => u.id === id);
//     console.log('user', user);
//     console.log('id', request.params.id)
//     response.send(request.body);

//     if (user) {
//         user.id = Date.now();
//     } else {
//         response.status(404).send("User Not Found!");
//         return;
//     }
// });


app.put('/:id', (response, request) => {
    const id = +request.params.id;
    let user = users.find((u) => u.id === id);

    if (!user) {
        response.status(404).send('User not found!');
        return;
    }

    users = users.filter((u) => u.id !== id);
    user = request.body;
    user.id = id;
    users.push(user);

    response.send(user);
});

app.delete('/:id', (request, response) => {
    const id = +request.params.id;
    users = users.filter((u) => u.id !== id);
    response.status(204).send('');
});



app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
