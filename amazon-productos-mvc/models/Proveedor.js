const { DataTypes} = require("sequelize");
const {sequelize} = require("../config/database")

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Proveedor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull:false
        },
         contacto: {
            type: DataTypes.STRING,
            allowNull:false
        },
         correo: {
            type: DataTypes.STRING,
        },
         direccion: {
            type: DataTypes.STRING,
        },
        estado: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        timestamps: true,
        tableName: 'proveedores'
    })
}