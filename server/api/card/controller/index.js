'use strict';
const Card = require('../model/card.sequalize');
const Task = require('../model/task.sequalize');

function getCards(req, res) {
    Card.findAll({
        attributes: ['cardId', 'name', 'sort'],
        include: [{
            model: Task,
            attributes: ['name', 'taskId', 'importance', 'sort']
        }]
    }).then(card => {
        res.json(card);
    })
};

function createCard(req, res) {
    let body = req.body;
    if (req.body) {
        if (body.name) {
            if (body.sort && body.cardId && body.importance) {
                //create a new
                Task.create(body).then(result => {
                    res.json({ 'success': 'ok' });
                })
            } else res.status(503).send('Did not recieve a necessary parameters for Task');
        } else res.status(502).send('Did not recieve a name for the Task');
    } else res.status(501).send('Did not recieve a payload');
}

function saveCard(req, res) {
    let body = req.body;
    if (req.body) {
        if (body.taskId) {
            if (body.name) {
                if (body.sort && body.cardId && body.importance) {
                    Task.update(body, { where: { taskId: body.taskId } })
                        .then(result => {
                            res.json({ 'success': 'ok' });
                        })
                } else res.status(503).send('Did not recieve a necessary parameters for Task');
            } else res.status(502).send('Did not recieve a name for the Task');
        } else res.status(505).send('Did not recieve an id for the Task');
    } else res.status(501).send('Did not recieve a payload');
}

function deleteCard(req, res) {
    let body = req.body;
    if (req.body) {
        if (body.taskId) {
            Task.destroy({
                where: { taskId: body.taskId }
            }).then(result => {
                res.json({ 'success': 'ok' });
            })
        } else res.status(505).send('Did not recieve an id for the Task');
    } else res.status(501).send('Did not recieve a payload');
}

module.exports = {
    getCards: getCards,
    createCard: createCard,
    saveCard: saveCard,
    deleteCard: deleteCard
};