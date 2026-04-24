module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Curso', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nota: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        costo: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        timestamps: true,
        tableName: 'cursos'
    })
}
