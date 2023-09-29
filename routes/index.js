const route = require('express').Router();
const { actor, film } = require('../models');

route.get('/', async (req,res) => {
    let films = await film.findAll({
        order: [
            ['id', 'desc']
        ]
    });
    let actors = await actor.findAll({
        order: [
            ['id', 'desc']
        ]
    });
    res.render('../views/home.ejs', {films:films,actors:actors});
})

const routeActor = require('./actor');
const routeFilm = require('./film');
const routeFilmActor = require('./filmActors');
const routeActorFilm = require('./actorFilms');
route.use('/actors', routeActor);
route.use('/films', routeFilm);
route.use('/', routeFilmActor);
route.use('/', routeActorFilm);

module.exports = route;