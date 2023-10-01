const { film, actor, filmActors } = require('../models');

class filmController {
    static async getFilms(req,res) {
        try {
            let result = await film.findAll({
                order: [
                    ['id', 'desc']
                ],
            });
            const acceptHeader = req.get("Accept");
            if (acceptHeader && acceptHeader.includes("text/html")) {
                res.render("./film/allFilms.ejs", { films:  result});
            } else {
                res.json(result);
            }
        } catch (error) {
            res.json(error)
        }
    }

    static async createPage(req,res) {
        let actors = await actor.findAll();
        res.render('film/create.ejs', { actors: actors });
    }

    static async create(req,res) {
        try {
            let { name, poster, director, releaseYear, company } = req.body;
            let result = await film.create({
                name, poster, director, releaseYear, company
            })
            const acceptHeader = req.get("Accept");
            if (acceptHeader && acceptHeader.includes("text/html")) {
                res.redirect('/films');
            } else {
                res.json(result);
            }
        } catch (error) {
            res.json(error);
        }
    }

    static async delete(req,res) {
        try {
            const id = +req.params.id;
            let result = await film.destroy({
                where: {id}
            })
            let deleteJunction = await filmActors.destroy({
                where: {filmId: id}
            })
            const acceptHeader = req.get("Accept");
            if (acceptHeader && acceptHeader.includes("text/html")) {
                res.redirect('/films');
            } else {
                result === 1 ? res.json({message: `Delete Success`}) : res.json({message: `Delete Failed`})
            }
        } catch (error) {
            res.json(error);
        }
    }

    static async updatePage(req,res) {
        try {
            let id = +req.params.id;
            let films = await film.findAll({
                where : {id}
            })
            let actors = await actor.findAll();
            res.render('film/update.ejs', { film: films[0].dataValues, actors: actors });
        } catch (error) {
            res.json(error);
        }
    }

    static async update(req,res) {
        try {
            const id = +req.params.id;
            let { name, poster, director, releaseYear, company, actorId } = req.body;
            if(actorId === '' || actorId === null) {
                actorId = null;
            } else {
                actorId = +actorId;
            }
            let result = await film.update({
                name, poster, director, releaseYear, company, actorId
            },{
                where: {id}
            })
            let isThereNull = await filmActors.findAll({
                where: {
                    filmId: id,
                    actorId: null
                }
            })
            let filmId = +id;
            if(isThereNull.length = 0 && actorId === null) {
                await filmActors.create({
                    filmId, actorId
                }) 
            } else if (actorId !== null) {
                await filmActors.create({
                    filmId, actorId
                }) 
            }
            const acceptHeader = req.get("Accept");
            if (acceptHeader && acceptHeader.includes("text/html")) {
                res.redirect(`/film/${filmId}`);
            } else {
                result[0] === 1 ? res.json({message: `Update Success`}) : res.json({message: `Update Failed`})
            }
        } catch (error) {
            res.json(error);
        }
    }
}

module.exports = filmController;