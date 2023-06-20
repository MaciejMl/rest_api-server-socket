const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './client/public/img/uploads' });
const ConcertsController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertsController.getAll);

router.post('/concerts', upload.single('image'), ConcertsController.post);

router.put('/concerts/:id', upload.single('image'), ConcertsController.edit);

router.delete('/concerts/:id', ConcertsController.delete);

router.get('/concerts/:id', ConcertsController.getSingle);

router.get('/concerts/performer/:performer', ConcertsController.getByPerformer);

router.get('/concerts/genre/:genre', ConcertsController.getByGenre);

router.get(
  '/concerts/price/:price_min/:price_max',
  ConcertsController.getByPriceRange
);

router.get('/concerts/day/:day', ConcertsController.getByDay);

module.exports = router;
