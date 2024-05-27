const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('superTask', 'root', '123', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate()
.then(() => {
    console.log(`> Database authenticated with sucess.`)
})
.catch((err) => {
    console.error(`X Failed to authenticate database, error: ${err}`)
})

module.exports = sequelize