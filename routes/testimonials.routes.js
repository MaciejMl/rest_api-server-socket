const express = require('express');
const db = require('../db/db');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  db.testimonials.push({ id: uuid, author, text });
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const id = req.params.id;
  let item = db.testimonials.find((data) => data.id == id);

  if (item) {
    item.author = author;
    item.text = text;
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Element not found...' });
  }
});

router.route('/testimonials/:id').delete((req, res) => {
  const id = req.params.id;
  let itemIndex = db.testimonials.findIndex((data) => data.id == id);

  if (itemIndex !== -1) {
    db.testimonials.splice(itemIndex, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Element not found...' });
  }
});

router.route('/testimonials/random').get((req, res) => {
  const amount = db.testimonials.length;
  const randomized = Math.floor(Math.random() * amount);
  res.json(db.testimonials[randomized]);
});

router.route('/testimonials/:id').get((req, res) => {
  const id = req.params.id;
  const item = db.testimonials.find((data) => data.id == id);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Element not found...' });
  }
});

module.exports = router;
