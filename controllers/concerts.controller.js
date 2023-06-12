const Concert = require('../models/concerts.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { performer, genre, price, day } = req.body;
    const image = `/img/uploads/${req.file.originalname}`;
    const newConcert = new Concert({ performer, genre, price, day, image });
    await newConcert.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.edit = async (req, res) => {
  try {
    const { performer, genre, price, day } = req.body;
    const image = `/img/uploads/${req.file.originalname}`;

    const updatedConcert = await Concert.findById(req.params.id);

    if (updatedConcert) {
      await Concert.updateOne(
        { _id: req.params.id },
        {
          $set: {
            day: day,
            performer: performer,
            genre: genre,
            price: price,
            image: image,
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
    const updatedConcert = await Concert.findById(req.params.id);
    if (updatedConcert) {
      await Concert.deleteOne({ _id: req.params.id });
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
    const updatedConcert = await Concert.findById(req.params.id);

    if (!updatedConcert) {
      res.status(404).json({ message: 'Element not found...' });
    } else {
      res.json(updatedConcert);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
