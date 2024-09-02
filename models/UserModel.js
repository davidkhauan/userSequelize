const { DataTypes } = require ('sequelize')

// const Address = require ('./AddressModel')

const DB = require ('../db/connection')

const User = DB.define ('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    occupation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    newsletter: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

// User.hasMany (Address)

module.exports = User