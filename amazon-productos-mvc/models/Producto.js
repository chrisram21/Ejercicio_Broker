const { DataTypes} = require("sequelize");
const {sequelize} = require("../config/database")

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Producto', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull:false
        },
         existencia: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        precio_compra: {
            type: DataTypes.DECIMAL(10, 2),
        },
         precio_venta: {
            type: DataTypes.DECIMAL(10, 2), 
        },
        codigo_barras: {
            type: DataTypes.STRING,
        },
        descripcion: {
            type: DataTypes.STRING,
        },
        estado: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        timestamps: true,
        tableName: 'productos'
    })
}