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
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "vacant"
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
