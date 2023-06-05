const express = require('express');
const app = express();
const socket = require('socket.io');
const path = require('path');

app.use(corse());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', testimonials);
app.use('/api', concerts);
app.use('/api', seats);

app.use(express.static(path.join(__dirname, '/client/public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/public/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

const server = app.listen(8000, () => {
  console.log('Server starts on port: ', 8000);
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket!');
});
