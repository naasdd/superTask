const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('supertask', 'root', 'nasd', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate()
.then(() => {
    console.log(`> Database authenticated with sucess.`)
})
.catch((err) => {
    console.error(`X Failed to authenticate database, \n\n error: ${err}`)
})

module.exports = sequelize