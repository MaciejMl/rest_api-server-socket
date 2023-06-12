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

module.exports = router;
