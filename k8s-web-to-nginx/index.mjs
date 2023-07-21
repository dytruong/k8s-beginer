import express from 'express';
import fetch from 'node-fetch';
import os from 'os';

// Create Express app
const app = express();

// Define a route for the root URL
app.get('/', (req, res) => {
    const helloMsg = `Hello world from ${os.hostname()}`
    console.log(helloMsg)
    res.send(helloMsg);
});

app.get('/auth', (req, res) => {
    const msg = "Authenticate successfully"
    console.log(msg)
    res.send(msg);
});

// app.get('/nginx', async (req, res) => {
//     const url = 'http://nginx'
//     const response = await fetch(url);
//     const body = await response.text();
//     res.send(body);
// });

// Start the server
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
