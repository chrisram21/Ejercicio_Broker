const { DataTypes} = require("sequelize");
const {sequelize} = require("../config/database")

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('TipoProducto', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull:false
        },
        estado: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        timestamps: true,
        tableName: 'tipos_de_productos'
    })
}