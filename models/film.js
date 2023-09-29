'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class film extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      film.belongsToMany(models.actor, { 
        through: models.filmActors,
        onDelete: 'CASCADE',
      });
    }
  }
  film.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Name can't be empty"
        }
      }
    },
    poster: DataTypes.STRING,
    director: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Director can't be empty"
        }
      }
    },
    releaseYear: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "Release (Year) can't be empty"
        }
      }
    },
    company: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Company can't be empty"
        }
      }
    },
    actorId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: function(film, option) {
        film.actorId = null;
      }
    },
    sequelize,
    modelName: 'film',
  });
  return film;
};