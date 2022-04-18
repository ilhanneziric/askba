'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    static associate(models) {
      Answer.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      Answer.belongsTo(models.Question, {
        foreignKey: 'questionId',
        onDelete: 'CASCADE'
      });
      Answer.hasMany(models.Like, {
        foreignKey: 'answerId'
      });
    }
  }
  Answer.init({
    text: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};