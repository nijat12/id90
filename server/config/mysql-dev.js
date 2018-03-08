const Sequelize = require('sequelize');

module.exports = new Sequelize('heroku_d2c2cc6ab1439cc', 'bd8ddbcc0517e8', '5b68c5c1', {
    host: 'us-cdbr-iron-east-05.cleardb.net',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});