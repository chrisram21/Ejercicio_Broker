const Sequelize = require('sequelize');
const sequelize = require('../config/database');

//IMPORTAR MODELOS
const TipoProducto = require('./TipoProducto')(sequelize, Sequelize)
const Dimension = require('./Dimension')(sequelize, Sequelize)
const Proveedor = require('./Proveedor')(sequelize, Sequelize)
const Producto = require('./Producto')(sequelize, Sequelize)
const DetalleTiposDeProducto = require('./DetalleTiposDeProducto')(sequelize, Sequelize)

//RELACIONES
Proveedor.hasMany(Producto)
Producto.belongsTo(Proveedor)

Dimension.hasMany(Producto)
Producto.belongsTo(Dimension)

TipoProducto.hasMany(DetalleTiposDeProducto)
DetalleTiposDeProducto.belongsTo(TipoProducto)

Producto.hasMany(DetalleTiposDeProducto)
DetalleTiposDeProducto.belongsTo(Producto)

module.exports = {
    sequelize,
    TipoProducto,
    Dimension,
    Proveedor,
    Producto,
    DetalleTiposDeProducto
}
