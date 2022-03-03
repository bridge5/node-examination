/* indent size: 2 */

module.exports = function(sequelize, DataTypes) {
  const Player = sequelize.define('Player', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    playerId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      field: 'player_id',
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
    },
    position: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
    },
    created: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
    },
    modified: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'player',
  });


  return Player;
};
