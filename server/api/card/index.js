'use strict';

const router = require('express').Router();

const CardsCtrl = require('./controller');

router.post('/', CardsCtrl.createCard);

router.put('/', CardsCtrl.saveCard);

router.get('/', CardsCtrl.getCards);

router.delete('/', CardsCtrl.deleteCard);

router.put('/all', CardsCtrl.saveAll);


module.exports = router;