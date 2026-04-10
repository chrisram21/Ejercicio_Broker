const { where } = require('sequelize');
const {Producto} = require('../models');

//CREAR PRODUCTO
exports.create = async (req, res) => {
      try {
        const { nombre } = req.body;

        const productoExistente = await Producto.findOne({ where: { nombre: nombre } });

        if (productoExistente) {
            return res.status(200).json({
                message: 'El producto ' + nombre + ' ya existe',
                producto: productoExistente,
                idempotente: true
            });
        }

      const product = await Producto.create(req.body)
        const bodyRespuesta = {
            code: 201,
            message: "El producto "+ product.nombre +" se creo bien",
            nombre: product.nombre,
            existencia: product.existencia,
            precio_compra: product.precio_compra,
            precio_venta: product.precio_venta,
            descripcion: product.descripcion
        }
        res.status(201).json(bodyRespuesta)

    } catch (error) {

        return res.status(500).json({ message: 'Error interno', error });
    }
   
}

//OBTENER TODOS LOS PRODUCTOS
exports.getAll = async (req, res) => {
    const product = await Producto.findAll({where: {estado: 1}}) 
    res.status(200).json(product) 
}

//ACTUALIZAR PRODUCTO
exports.actualizar = async (req,res) => {
    const { id } = req.params

    await Producto.update(req.body, {
        where: { id }
        })

        res.json({
            code: 200,
            message: "El producto se ha actualizado correctamente"
        })
}

//ELIMINACION LOGICA
exports.desactivar = async (req,res) => {
    const { id } = req.params

    await Producto.update(
        {estado: 0}, 
        {where: { id }})

        res.json({
            code: 200,
            message: "El producto se eliminó correctamente"
        })
}