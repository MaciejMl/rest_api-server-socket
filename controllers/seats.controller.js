const Seat = require('../models/seats.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    let { day, seat, client, email } = req.body;
    day = Number(day);
    seat = Number(seat);

    day = sanitize(day);
    seat = sanitize(seat);
    client = sanitize(client);
    email = sanitize(email);

    const isSeatTaken = await Seat.findOne({
      $and: [{ day: day }, { seat: seat }],
    });

    if (isSeatTaken) {
      res.status(409).json({ message: 'The slot is already taken...' });
    } else {
      const newSeat = new Seat({ day, seat, client, email });
      await newSeat.save();
      res.json({ message: 'OK' });
      req.io.emit('seatsUpdated', req.body);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.edit = async (req, res) => {
  try {
    let { day, seat, client, email } = req.body;
    day = Number(day);
    seat = Number(seat);

    const updatedSeat = await Seat.findById(req.params.id);

    if (updatedSeat) {
      await Seat.updateOne(
        { _id: req.params.id },
        {
          $set: {
            day: day,
            seat: seat,
            client: client,
            email: email,
          },
        }
      );
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Element not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const updatedSeat = await Seat.findById(req.params.id);
    if (updatedSeat) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Element not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getSingle = async (req, res) => {
  try {
    const updatedSeat = await Seat.findById(req.params.id);

    if (!updatedSeat) {
      res.status(404).json({ message: 'Element not found...' });
    } else {
      res.json(updatedSeat);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
