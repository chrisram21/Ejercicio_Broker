const { where } = require('sequelize');
const {Dimension} = require('../models');

//CREAR DIMENSION
exports.create = async (req, res) => {
      try {
        const { tamanio } = req.body;

        const dimensionExistente = await Dimension.findOne({ where: { tamanio: tamanio } });

        if (dimensionExistente) {
            return res.status(200).json({
                message: 'La dimensión ' + tamanio + ' ya existe',
                dimension: dimensionExistente,
                idempotente: true
            });
        }
       const dimen = await Dimension.create(req.body)
        const bodyRespuesta = {
            code: 201,
            message: "La Dimension "+ dimen.tamanio +" se creo bien",
            tamanio: dimen.tamanio,
            precio: dimen.precio

        }
        res.status(201).json(bodyRespuesta)

    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor', error });
    }
    
}

//OBTENER TODOS LOS Dimension
exports.getAll = async (req, res) => {
    const dimen = await Dimension.findAll({where: {estado: 1}}) 
    res.status(200).json(dimen) 
}

/*//OBTENER Dimension POR ID
exports.getById = async (req, res) => {
    const { id } = req.params
    const dimen = await Dimension.findOne({where: {id, estado: 1}})
    if(dimen){
        res.status(200).json(dimen)
    }else{
        res.status(404).json({
            code: 404,
            message: "La Dimension no existe"
        })
    }
}*/

//ACTUALIZAR Dimension
exports.actualizar = async (req,res) => {
    const { id } = req.params

    await Dimension.update(req.body, {
        where: { id }
        })

        res.json({
            code: 200,
            message: "La Dimension se ha actualizado correctamente"
        })
}

//ELIMINACION LOGICA
exports.desactivar = async (req,res) => {
    const { id } = req.params

    await Dimension.update(
        {estado: 0}, 
        {where: { id }})

        res.json({
            code: 200,
            message: "La Dimension se eliminó correctamente"
        })
}