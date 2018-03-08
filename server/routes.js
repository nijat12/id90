'use strict';

module.exports = (app) => {
    app.use('/api', require('./api'));
    
    app.route('/*').all( (req, res) => {
        res.status(404).send('Not found');
    });
}