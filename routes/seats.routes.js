const express = require('express');
const db = require('../db/db');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats').post((req, res) => {
  let { day, seat, client, email } = req.body;
  day = Number(day);
  seat = Number(seat);

  const isSeatTaken = db.seats.find(
    (existingSeat) => existingSeat.day === day && existingSeat.seat === seat
  );

  if (isSeatTaken) {
    res.status(409).json({ message: 'The slot is already taken...' });
  } else {
    db.seats.push({ id: uuid, day, seat, client, email });
    res.json({ message: 'OK' });
  }
});

router.route('/seats/:id').put((req, res) => {
  let { day, seat, client, email } = req.body;
  const id = req.params.id;
  day = Number(day);
  seat = Number(seat);

  let item = db.seats.find((data) => data.id == id);

  if (item) {
    item.day = day;
    item.seat = seat;
    item.client = client;
    item.email = email;
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Element not found...' });
  }
});

router.route('/seats/:id').delete((req, res) => {
  const id = req.params.id;
  let item = db.seats.findIndex((data) => data.id == id);

  if (item !== -1) {
    db.seats.splice(item, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Element not found...' });
  }
});

router.route('/seats/:id').get((req, res) => {
  const id = req.params.id;
  const item = db.seats.find((data) => data.id == id);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Element not found...' });
  }
});

module.exports = router;
