'use strict';
var Sequelize = require('sequelize');
var sequelize = require('../../../config/mysql-dev');
const Card = require('./card.sequalize');

const Task = sequelize.define('task', {
    taskId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: Sequelize.STRING,
    importance: Sequelize.STRING,
    sort: Sequelize.INTEGER,
    cardId: {
        type: Sequelize.INTEGER,
        references: 'cards',
        referencesKey: 'cardId'
    }
})

module.exports = Task;

// id90
// tasks table
//
// name varchar(255)
// sort INT(10)
// importance varchar(255)
// taskId int NOT NULL AUTO_INCREMENT
// updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
// createdAt TIMESTAMP NOT NULL
// cardId int
// PRIMARY KEY(taskId)
//
// INSERT INTO tasks (taskId, name, sort, importance, cardId)
// VALUES (1, 'Task1', 1, '1', 1),
// (2, 'Task2', 2, '1', 1),
// (3, 'Task3', 1, '2', 1),
// (4, 'Task4', 1, '2', 1),
// (5, 'Mision1', 1, '1', 2),
// (6, 'Mision2', 2, '1', 2),
// (7, 'Mision3', 1, '2', 2),
// (8, 'Mision4', 2, '2', 2),
// (9, 'Mision5', 1, '3', 2),
// (10, 'Order1', 1, '1', 3),
// (11, 'Order2', 1, '3', 3),
// (12, 'Order3', 2, '3', 3),
// (13, 'Order4', 3, '3', 3);