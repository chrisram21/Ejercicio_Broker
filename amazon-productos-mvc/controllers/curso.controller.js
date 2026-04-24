const { Curso } = require('../models');

exports.ingresar = async (req, res) => {
    const respuesta = await fetch('http://localhost:8000/api/curso');
    const datos = await respuesta.json();

    const curso = await Curso.create({
        nombre: datos.nombre,
        nota: datos.nota,
        costo: datos.costo
    });

    res.status(200).json({
        mensaje: 'ingreso correcto',
        curso: {
            nombre: curso.nombre,
            nota: curso.nota,
            costo: Number(curso.costo)
        },
        codigo: 200
    });
}
