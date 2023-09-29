const { Router } = require('express');
const actorRoute = Router();
const { actorController } = require('../controllers');

actorRoute.get('/', actorController.getActors);
actorRoute.get('/create', actorController.createPage);
actorRoute.post('/create', actorController.create);
actorRoute.get('/delete/:id', actorController.delete);
actorRoute.get('/update/:id', actorController.updatePage)
actorRoute.post('/update/:id', actorController.update);

module.exports = actorRoute;