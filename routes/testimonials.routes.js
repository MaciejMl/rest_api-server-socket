const express = require('express');
const router = express.Router();
const TestimonialsController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialsController.getAll);

router.post('/testimonials', TestimonialsController.post);

router.put('/testimonials/:id', TestimonialsController.edit);

router.delete('/testimonials/:id', TestimonialsController.delete);

router.get('/testimonials/random', TestimonialsController.getRandom);

router.get('/testimonials/:id', TestimonialsController.getSingle);

module.exports = router;
