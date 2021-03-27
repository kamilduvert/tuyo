const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database');

class Category extends Model {

};

Category.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
}, {
    tableName: "category",
    sequelize // connexion instance
});

module.exports = Category;
