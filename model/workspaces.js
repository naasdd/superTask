const { DataTypes } = require('sequelize')
const database = require('../database/connect.js')
const Users = require('./users.js')

console.log(`> Reading workspaces.js`)
const Workspaces = database.define('Workspaces', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    workspaceName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER, // Tipo de dado deve corresponder ao tipo da coluna referenciada
        allowNull: false,
        references: {
            model: Users, // Nome do modelo referenciado
            key: 'id'    // Nome da coluna referenciada
        }
    }
} , {
    createdAt: false,
    updatedAt: false
})

Users.hasMany(Workspaces, { foreignKey: 'user_id' });
Workspaces.belongsTo(Users, { foreignKey: 'user_id' });

module.exports = Workspaces