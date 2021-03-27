// require specific class
const { Sequelize } = require('sequelize');

// create a new instance with some options
const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        underscored: true, // to switch to snake_case by default

        // to change the timestamps name in the models
        createdAt: "created_at",
        updatedAt: "updated_at",

        // timestamps: true is set by default
    }
});

sequelize.authenticate().then(() => {
    console.log('Connection to database has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to database:', err);
});

sequelize.options.logging = false

module.exports = sequelize;
