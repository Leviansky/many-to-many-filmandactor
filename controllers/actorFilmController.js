const { filmActors, film, actor } = require('../models');

class actorFilmController  {
    static async getActorFilm(req,res) {
        try {
            const actorId = +req.params.actorId;
            let result = await filmActors.findAll({
                where: {
                    actorId:actorId
                },
                order: [
                    ['id', 'desc']
                ]
            });
            if(result[0].filmId !== null) {
                result = await filmActors.findAll({
                    where: {actorId:actorId},
                    include: [actor, film]
                });
                let films = []
                result.forEach(AF => {
                    if( AF.filmId !== null) {
                        const { id, name, poster, director, releaseYear, company } = AF.film    
                        let result = {
                            id, name, poster, director, releaseYear, company
                        }
                        films.push(result);
                    }
                })
                let resultOneAF = {
                    ...result[0].actor.dataValues,
                    films
                }
                const acceptHeader = req.get("Accept");
                if (acceptHeader && acceptHeader.includes("text/html")) {
                    res.render('actor/detail.ejs', {actor:resultOneAF})
                } else {
                    res.json(resultOneAF);
                }
            } else {
                let resultOneAF = await actor.findAll({
                    where: {
                        id: actorId
                    }
                })
                const acceptHeader = req.get("Accept");
                if (acceptHeader && acceptHeader.includes("text/html")) {
                    res.render('actor/detail.ejs', {actor:resultOneAF[0].dataValues})
                } else {
                    res.json(resultOneAF);
                }
            }
        } catch (error) {
            res.json(error);
        }
    }
}

module.exports = actorFilmController;