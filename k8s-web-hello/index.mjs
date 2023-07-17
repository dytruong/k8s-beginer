import express from 'express';
import os from 'os';

// Create Express app
const app = express();

// Define a route for the root URL
app.get('/', (req, res) => {
    const helloMsg = `VERSION 2: Hello world from ${os.hostname()}`
    console.log(helloMsg)
    res.send(helloMsg);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
