const { Router } = require('express');
const actorFilmRoute = Router();
const { actorFilmController } = require('../controllers');

actorFilmRoute.get('/actor/:actorId', actorFilmController.getActorFilm);

module.exports = actorFilmRoute;