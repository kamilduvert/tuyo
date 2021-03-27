const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database');

class Post extends Model {

};

Post.init({
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    picture_url: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    likes : {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0
        }
    } 

}, {
        tableName: "post",
        sequelize // connexion instance
});

module.exports = Post;