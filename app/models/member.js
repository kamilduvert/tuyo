const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database');

class Member extends Model {

};

Member.init({
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
        tableName: "member",
        sequelize // connexion instance
});

module.exports = Member;