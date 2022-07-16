const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('pokemon', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
        },
        name:{
            type: DataTypes.STRING,
        },
    })
}