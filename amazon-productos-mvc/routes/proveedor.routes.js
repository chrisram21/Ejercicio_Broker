const express = require('express');
const controller = require('../controllers/proveedor.controller')

const router = express.Router();

router.post('/', controller.create)
router.get('/', controller.getAll)
router.put('/:id', controller.actualizar)
router.put('/delete/:id', controller.desactivar)
module.exports = router;