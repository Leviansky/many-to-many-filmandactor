const { actor, filmActors, film } = require('../models');

class actorController {
    static async getActors(req,res) {
        try {
            let result = await actor.findAll({
                order: [
                    ['id', 'desc']
                ]
            });
            const acceptHeader = req.get("Accept");
            if (acceptHeader && acceptHeader.includes("text/html")) {
                res.render('./actor/allActors.ejs', {actors: result})
            } else {
                res.json(result);
            }
        } catch (error) {
            res.json(error);
        }
    }

    static async createPage(req,res) {
        let films = await film.findAll();
        res.render('actor/create.ejs', { films: films });
    }

    static async create(req,res) {
        try {
            let { name, image, country, birthYear, height } = req.body;
            let result = await actor.create({
                name, image, country, birthYear, height
            })
            const acceptHeader = req.get("Accept");
            if (acceptHeader && acceptHeader.includes("text/html")) {
                res.redirect('/actors');
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
            let result = await actor.destroy({
                where: {id}
            })
            let deleteJunction = await filmActors.destroy({
                where: {actorId: id}
            })
            const acceptHeader = req.get("Accept");
            if (acceptHeader && acceptHeader.includes("text/html")) {
                res.redirect('/actors');
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
            let actors = await actor.findAll({
                where : {id}
            })
            let films = await film.findAll();
            res.render('actor/update.ejs', { films: films, actor: actors[0].dataValues });
        } catch (error) {
            res.json(error);
        }
    }

    static async update(req,res) {
        try {
            const id = +req.params.id;
            let { name, image, country, birthYear, height, filmId } = req.body;
            if(filmId === '' || filmId === null) {
                filmId = null;
            } else {
                filmId = +filmId;
            }
            let result = await actor.update({
                name, image, country, birthYear, height, filmId
            },{
                where: {id}
            })
            let isThereNull = await filmActors.findAll({
                where: {
                    filmId: null,
                    actorId: id
                }
            })
            let actorId = +id;
            if(isThereNull.length = 0 && filmId === null) {
                await filmActors.create({
                    filmId, actorId
                }) 
            } else if (filmId !== null) {
                await filmActors.create({
                    filmId, actorId
                }) 
            }
            const acceptHeader = req.get("Accept");
            if (acceptHeader && acceptHeader.includes("text/html")) {
                res.redirect(`/actor/${actorId}`);
            } else {
                result[0] === 1 ? res.json({message: `Update Success`}) : res.json({message: `Update Failed`})
            }
        } catch (error) {
            res.json(error);
        }
    }
}

module.exports = actorController;