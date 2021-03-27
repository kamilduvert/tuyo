const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database');

class Favorite extends Model {

};

Favorite.init({
    member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "member_favorites_post",
    sequelize // connexion instance
});

module.exports = Favorite;
