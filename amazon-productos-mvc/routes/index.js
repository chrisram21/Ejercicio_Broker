const express = require('express');
const router = express.Router();

router.use('/tipo-producto', require('./tipoproducto.routes'))
router.use('/proveedor', require('./proveedor.routes'))
router.use('/producto', require('./producto.routes'))
router.use('/dimension', require('./dimension.routes'))

module.exports = router;