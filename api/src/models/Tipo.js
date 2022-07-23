const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('tipo', {
        name:{
            type: DataTypes.STRING,
            allowNwll: false,
        }
    },{
        createdAt: false,
        updatedAt: false,
          })
}