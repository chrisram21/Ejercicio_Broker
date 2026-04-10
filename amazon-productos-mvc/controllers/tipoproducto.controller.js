const { where } = require('sequelize');
const {TipoProducto} = require('../models');

//CREAR TIPO PRODUCTO
exports.create = async (req, res) => {
    try {

        const { tipo } = req.body;

        const tipoExistente = await TipoProducto.findOne({ where: { tipo: tipo } });
   
        if (tipoExistente) {
            return res.status(200).json({
                message: "El tipo de producto '" + tipo + "' ya existe",
                tipoproducto: tipoExistente,
                idempotente: true
            });
        }

       const tipoproducto = await TipoProducto.create(req.body)
        const bodyRespuesta = {
            code: 201,
            message: "El tipo "+ tipoproducto.tipo+" Creado chido",
            tipo: tipoproducto.tipo
        }
        res.status(201).json(bodyRespuesta) // devolvemos el producto creado

    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor', error });
    }
   
}

//OBTENER TODOS LOS PRODUCTOS
exports.getAll = async (req, res) => {
    const tipoproductos = await TipoProducto.findAll({where: {estado: 1}}) 
    res.status(200).json(tipoproductos) // devolvemos el producto creado
}

//ACTUALIZAR PRODUCTO
exports.actualizar = async (req,res) => {
    const { id } = req.params

    await TipoProducto.update(req.body, {
        where: { id }
        })

        res.json({
            code: 200,
            message: "El tipo de producto se actualizo chido"
        })
}

//ELIMINACION LOGICA
exports.desactivar = async (req,res) => {
    const { id } = req.params

    await TipoProducto.update(
        {estado: 0}, 
        {
        where: { id }
        })

        res.json({
            code: 200,
            message: "El tipo de producto se elimino"
        })
}