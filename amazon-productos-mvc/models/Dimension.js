const { DataTypes} = require("sequelize");
const {sequelize} = require("../config/database")

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Dimension', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tamanio: {
            type: DataTypes.STRING,
            allowNull:false
        },
        precio: {
            type: DataTypes.DECIMAL(10,2),
            allowNull:false
        },
        estado: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        timestamps: true,
        tableName: 'dimensiones'
    })
}