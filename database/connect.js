const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env._DataBaseSCHEMA, process.env._DataBaseUSERNAME, process.env._DataBasePASSWORD, {
    host: process.env._DataBaseHOST,
    port: process.env._DataBasePORT,
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