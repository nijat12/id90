'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../../config/mysql-dev');
const Task = require('./task.sequalize');

const Card = sequelize.define('card', {
    cardId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING,
    sort: Sequelize.INTEGER
})

Card.hasMany(Task, {
    foreignKey: {
        name: 'cardId',
        allowNull: false
    }
})

module.exports = Card;

// id90
// cards table
//
// name varchar(255)
// sort INT(10)
// cardId int NOT NULL AUTO_INCREMENT;
// updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW();
// PRIMARY KEY(cardId);
//
// INSERT INTO cards (cardId, name, sort)
// VALUES (1, 'ToDo', 1),
// (2, 'In Progress', 2),
// (3, 'Done', 3)