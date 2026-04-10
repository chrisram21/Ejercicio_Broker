const { DataTypes} = require("sequelize");
const {sequelize} = require("../config/database")

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('DetalleTiposDeProducto', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        estado: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        timestamps: true,
        tableName: 'detalle_tipos_de_producto'
    })
}