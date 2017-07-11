// Model for departments table
module.exports = function(sequelize, DataTypes) {
  return sequelize.define("department", {
    dept_no: {
      type: DataTypes.CHAR(4),
      primaryKey: true,
      allowNull: false
    },
    dept_name: {
      type: DataTypes.STRING(40),
      unique: true,
      allowNull: false
    },
  }, {
    // don't add timestamps attributes updatedAt and createdAt
    timestamps: false,
  });
};
