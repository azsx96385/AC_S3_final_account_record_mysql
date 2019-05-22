"use strict";
module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define(
    "Record",
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      category: DataTypes.STRING,
      date: DataTypes.DATE,
      amount: DataTypes.INTEGER
    },
    {}
  );
  Record.associate = function(models) {
    // associations can be defined here
    Record.belongTo(models.User);
  };
  return Record;
};
