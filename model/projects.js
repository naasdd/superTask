const { DataTypes } = require('sequelize')
const database = require('../database/connect.js')
const Workspaces = require('./workspaces.js')

console.log(`> Reading model/projects.js`)
const Projects = database.define('Projects', {
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
    date: {
        type: DataTypes.STRING(10),
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

Workspaces.hasMany(Projects, { foreignKey: 'workspaces_id' });
Projects.belongsTo(Workspaces, { foreignKey: 'workspaces_id' });


module.exports = Projects