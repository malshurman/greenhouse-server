const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Specify the port and path for the WebSocket server
const WEBSOCKET_PORT = 4000;
const WEBSOCKET_PATH = '/ws';

const wss = new WebSocket.Server({ server, path: WEBSOCKET_PATH });

app.use(express.static(path.join(__dirname, 'public')));

// Function to broadcast messages to all connected clients
function broadcastMessage(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    // Broadcast the message to all clients
    broadcastMessage(message);
  });

  // Send a welcome message to just the connected client
  ws.send('Welcome to the WebSocket server!');
});

// Update the server to listen on the specified port
server.listen(WEBSOCKET_PORT, '0.0.0.0', function listening() {
  console.log('Listening on %d', server.address().port);
});