const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mySecret = process.env['DB_PASS'];
const helmet = require('helmet');

const testimonials = require('./routes/testimonials.routes');
const concerts = require('./routes/concerts.routes');
const seats = require('./routes/seats.routes');

const socket = require('socket.io');

const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if (NODE_ENV === 'production')
  dbUri = `mongodb+srv://szypki:${mySecret}@mytestingdb.unpaqol.mongodb.net/NewWaveDB?retryWrites=true&w=majority`;
else if (NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/NewWaveTestDB';
else dbUri = 'mongodb://localhost:27017/NewWaveDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  if (NODE_ENV !== 'test') {
    console.log('Connected to the database');
  }
});
db.on('error', (err) => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  if (NODE_ENV !== 'test') {
    console.log('Server is running on port: 8000');
  }
});

const io = socket(server, {
  cors: {
    // origin: 'http://localhost:3000',
    origin: 'https://restapi-server-socket.maciejml.repl.co',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('New socket!');
  socket.emit('seatsUpdated', seats);
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonials);
app.use('/api', concerts);
app.use('/api', seats);

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

module.exports = server;
