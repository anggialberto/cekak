'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: false,
      type: DataTypes.STRING(30),
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(60),
    },
    role: {
      type: DataTypes.INTEGER(1)
    }
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};