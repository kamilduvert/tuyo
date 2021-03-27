const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database');

class Like extends Model {

};

Like.init({
    member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "member_likes_post",
    sequelize // connexion instance
});

module.exports = Like;
