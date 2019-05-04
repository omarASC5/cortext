

module.exports = (sequelize, DataTypes) => {
  const Link = sequelize.define('Link', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: 'true'
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
	timestamps: false,
	freezeTableName: true // Model tableName will be the same as the model name 	
  }, {});
  return Link;
};