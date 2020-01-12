const Sequelize = require('sequelize')
const connection = new Sequelize('margaridas','root','thiago', {
    host: 'localhost',
    dialect: 'mysql'
}) 

module.exports = connection
