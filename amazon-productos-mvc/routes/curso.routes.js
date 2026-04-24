const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/curso.controller');

router.get('/', cursoController.ingresar);

module.exports = router;
