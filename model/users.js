const { DataTypes } = require('sequelize')
const database = require('../database/connect.js')

console.log(`> Reading model/users.js`)
const Users = database.define('users', {
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
} , {
    createdAt: false,
    updatedAt: false
})


module.exports = Users