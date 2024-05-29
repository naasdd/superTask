const { DataTypes } = require('sequelize')
const database = require('../database/connect.js')
const Workspaces = require('./workspaces.js')

console.log(`> Reading projects.js`)
const Projetcs = database.define('projetcs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    workspaces_id: {
        type: DataTypes.INTEGER, // Tipo de dado deve corresponder ao tipo da coluna referenciada
        allowNull: false,
        references: {
            model: Workspaces, // Nome do modelo referenciado
            key: 'id'    // Nome da coluna referenciada
        }
    }
} , {
    createdAt: false,
    updatedAt: false
})

Projetcs.sync({ force: true })

module.exports = Projetcs