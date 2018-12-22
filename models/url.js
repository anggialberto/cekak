'use strict';
module.exports = (sequelize, DataTypes) => {
  const Url = sequelize.define('Url', {
    hash: {
      allowNull: false,
      type: DataTypes.STRING(6),
      unique: true
    },
    longUrl: {
      allowNull: false,
      type: DataTypes.STRING(512)
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING(30)
    }
  }, {});
  Url.associate = function (models) {
    // associations can be defined here
  };
  return Url;
};