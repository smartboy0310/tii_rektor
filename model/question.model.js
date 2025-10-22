const { DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");

const Questions = sequelize.define(
    "questions",
    {
        question: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },

    },
    {
        timestamps: true,
        tableName: "questions",
    }
)

module.export = Questions;