const { filmActors, film, actor } = require('../models');

class filmActorController  {
    static async getFilmActor(req,res) {
        try {
            const filmId = +req.params.filmId;
            let result = await filmActors.findAll({
                where: {
                    filmId:filmId
                },
                order: [
                    ['id', 'desc']
                ]
            })
            if(result[0].actorId !== null) {
                result = await filmActors.findAll({
                    where: {filmId:filmId},
                    include: [film, actor]
                });
                let actors = []
                result.forEach(FA => {
                    if( FA.actorId !== null ) {
                        const { id, name, image, country, birthYear, height } = FA.actor;
                        let result = {
                            id, name, image, country, birthYear, height
                        }
                        actors.push(result);
                    }
                })
                let resultOneFA = {
                    ...result[0].film.dataValues,
                    actors
                }
                const acceptHeader = req.get("Accept");
                if (acceptHeader && acceptHeader.includes("text/html")) {
                    res.render('film/detail.ejs', {film:resultOneFA})
                } else {
                    res.json(resultOneFA);
                }
            } else {
                let resultOneFA = await film.findAll({
                    where: {
                        id: filmId
                    }
                })
                const acceptHeader = req.get("Accept");
                if (acceptHeader && acceptHeader.includes("text/html")) {
                    res.render('film/detail.ejs', {film:resultOneFA[0].dataValues})
                } else {
                    res.json(resultOneFA);
                }
            }
        } catch (error) {
            res.json(error);
        }
    }
}

module.exports = filmActorController;