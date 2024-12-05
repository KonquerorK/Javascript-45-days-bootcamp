const express = require('express');

hostname = '127.0.0.1';
port = '3000';

const app = express();
app.use(express.json());
let users = [];



app.get('/', (request, response) => {
    response.status(200).json(users);
});

app.post('/', (request, response) => {
    let user = request.body;
    user.id = Date.now();
    users.push(user);
    response.status(201).json(request.body);
});




app.put('/:id', (request, response) => {
    response.send(request.body);
});

app.delete('/:id', (request, response) => {
    const id = +request.params.id;
    users = users.filter((u) => u.id !== id);
    response.status(204).send('');
});


// Status code 
// 200 (200 OK : Request successful. The server has responded as required.)
// 201 (201 Created : A new resource was created successfully.)
// 204 (204 No Content : There is no content to send for this request except for headers.)
// 400 Bad Request The server could not understand the request. Maybe a bad syntax?
// 400 Bad Request The server could not understand the request. Maybe a bad syntax?
// 500 Internal Server Error The server has encountered a situation it does not know how to handle.
// 501 Not Implemented The request method is not supported by the server and thus could not be handled.
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
