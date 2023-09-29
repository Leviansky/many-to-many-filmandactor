const { Router } = require('express');
const filmRoute = Router();
const { filmController } = require('../controllers');

filmRoute.get('/', filmController.getFilms);
filmRoute.get('/create', filmController.createPage);
filmRoute.post('/create', filmController.create);
filmRoute.get('/delete/:id', filmController.delete);
filmRoute.get('/update/:id', filmController.updatePage);
filmRoute.post('/update/:id', filmController.update);

module.exports = filmRoute;