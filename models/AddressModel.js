const { DataTypes } = require ('sequelize')

const DB = require ('../db/connection')

const User = require ('./UserModel')

const Address = DB.define ('Address', {
    street: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    }
})

User.hasMany (Address)
Address.belongsTo (User)

module.exports = Address