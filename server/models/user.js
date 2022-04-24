'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Question, {
        foreignKey: 'userId'
      });
      User.hasMany(models.Answer, {
        foreignKey: 'userId'
      });
      User.hasMany(models.Like, {
        foreignKey: 'userId'
      });
      User.hasMany(models.Notification, {
        foreignKey: 'userId'
      });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};