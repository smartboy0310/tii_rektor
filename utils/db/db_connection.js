const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(
    "sequelize_db", "postgres", "Smartboy@0310",
    {
        host: "localhost",
        dialect: "postgres",
        port: 5432,
        logging: false
    }
)

module.exports = sequelize