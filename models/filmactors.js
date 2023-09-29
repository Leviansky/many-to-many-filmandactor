'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class filmActors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      filmActors.belongsTo(models.film);
      filmActors.belongsTo(models.actor);
    }
  }
  filmActors.init({
    filmId: DataTypes.INTEGER,
    actorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'filmActors',
  });
  return filmActors;
};