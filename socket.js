const net = require('net');

const PORT = 8089;
const HOST = '127.0.0.1';

const server = net.createServer();

server.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST}:${PORT}`);
});

server.on('connection', (socket) => {
    console.log('Client connected:', socket.remoteAddress);

    socket.on('data', (data) => {
        console.log('Received data:', data.toString());
        // Echo the data back to the client
        socket.write(`Server received: ${data}`);
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });

    socket.on('error', (err) => {
        console.error('Socket error:', err);
    });
});

server.on('error', (err) => {
    console.error('Server error:', err);
});