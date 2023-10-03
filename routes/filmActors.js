const { Router } = require('express');
const filmActorRoute = Router();
const { filmActorController } = require('../controllers');

filmActorRoute.get('/films/:filmId', filmActorController.getFilmActor);

module.exports = filmActorRoute;