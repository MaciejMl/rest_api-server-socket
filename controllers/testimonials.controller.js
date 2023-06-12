const Testimonial = require('../models/testimonials.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { author, text } = req.body;
    const newTestimonial = new Testimonial({ author, text });
    await newTestimonial.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.edit = async (req, res) => {
  try {
    const { author, text } = req.body;
    const updatedTestimonial = await Testimonial.findById(req.params.id);
    if (updatedTestimonial) {
      await Testimonial.updateOne(
        { _id: req.params.id },
        {
          $set: {
            author: author,
            text: text,
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
    const updatedTestimonial = await Testimonial.findById(req.params.id);
    if (updatedTestimonial) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Element not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const updatedTestimonial = await Testimonial.findOne().skip(rand);

    if (!updatedTestimonial) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(updatedTestimonial);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getSingle = async (req, res) => {
  try {
    const updatedTestimonial = await Testimonial.findById(req.params.id);

    if (!updatedTestimonial) {
      res.status(404).json({ message: 'Element not found...' });
    } else {
      res.json(updatedTestimonial);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
