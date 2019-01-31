module.exports = function (sequelize, DataTypes) {

  var Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rateOfPay: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    vacant: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    requested: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    doer: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Task.associate = function (models) {
    Task.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return Task;
}
