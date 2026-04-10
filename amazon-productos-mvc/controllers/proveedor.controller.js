const { where } = require('sequelize');
const {Proveedor} = require('../models');

//CREAR Proveedor
exports.create = async (req, res) => {
     try {
        const { nombre } = req.body;

        const proveedorExistente = await Proveedor.findOne({ where: { nombre: nombre } });

        if (proveedorExistente) {
            return res.status(200).json({
                message: 'El proveedor ' + nombre + ' ya existe',
                proveedor: proveedorExistente,
                idempotente: true
            });
        }

          const proveedor = await Proveedor.create(req.body)
        const bodyRespuesta = {
            code: 201,
            message: "El proveedor "+ proveedor.nombre +" se creo bien",
            nombre: proveedor.nombre,
            contacto: proveedor.contacto,
            correo: proveedor.correo,
            direccion: proveedor.direccion
        }
        res.status(201).json(bodyRespuesta)

    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor', error });
    }

}

//OBTENER TODOS LOS PROVEEDORES
exports.getAll = async (req, res) => {
    const proveedor = await Proveedor.findAll({where: {estado: 1}}) 
    res.status(200).json(proveedor) 
}

//ACTUALIZAR PRODUCTO
exports.actualizar = async (req,res) => {
    const { id } = req.params

    await Proveedor.update(req.body, {
        where: { id }
        })

        res.json({
            code: 200,
            message: "El proveedor se ha actualizado correctamente"
        })
}

//ELIMINACION LOGICA
exports.desactivar = async (req,res) => {
    const { id } = req.params

    await Proveedor.update(
        {estado: 0}, 
        {where: { id }})

        res.json({
            code: 200,
            message: "El proveedor de producto se eliminó"
        })
}