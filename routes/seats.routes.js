const express = require('express');
const router = express.Router();
const SeatsController = require('../controllers/seats.controller');

router.get('/seats', SeatsController.getAll);

router.post('/seats', SeatsController.post);

router.put('/seats/:id', SeatsController.edit);

router.delete('/seats/:id', SeatsController.delete);

router.get('/seats/:id', SeatsController.getSingle);

module.exports = router;
