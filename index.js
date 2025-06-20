const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// /folder name is localhost:3000/websocket
app.use('/websocket', express.static(__dirname)); // Serves index.html

wss.on('connection', (ws) => {
    console.log('Client connected');
    const interval = setInterval(() => {
        const now = new Date().toLocaleTimeString();
        ws.send(JSON.stringify({ type: 'time', time: now }));
    }, 1000);

    ws.on('close', () => {
        clearInterval(interval);
        console.log('Client disconnected');
    });

    ws.on('message', (message) => {
        // Broadcast chat messages to all clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                console.log(message.toString())
                client.send(message.toString());
            }
        });
    });
});

server.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});