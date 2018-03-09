const Sequelize = require('sequelize');

module.exports = new Sequelize('heroku_43a0065c0844532', 'b36089b5f24764', 'd1324b10', {
    host: 'us-cdbr-iron-east-05.cleardb.net',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});