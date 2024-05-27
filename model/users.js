const { DataTypes } = require('sequelize')
const database = require('../database/connect.js')

const Users = database.define('users', {
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
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

Users.sync({ force: true })

module.exports = Users