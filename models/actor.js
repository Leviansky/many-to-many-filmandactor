'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      actor.belongsToMany(models.film, { 
        through: models.filmActors,
        onDelete: 'CASCADE',
      });
    }
  }
  actor.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Name can't be empty"
        }
      }
    },
    image: DataTypes.STRING,
    country: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Country can't be empty"
        }
      }
    },
    birthYear: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "Birth (Year) can't be empty"
        }
      }
    },
    height: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "Height can't be empty"
        }
      }
    },
    filmId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: function(actor, option) {
        actor.filmId = null;
      }
    },
    sequelize,
    modelName: 'actor',
  });
  return actor;
};