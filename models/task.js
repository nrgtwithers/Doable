module.exports = function(sequelize, DataTypes){
    var Task = sequelize.define("Task",{
       title: {
           type: DataTypes.STRING,
           allowNull: false,
       },
       description: {
           type: DataTypes.TEXT,
           allowNull: false,
       },
       rateOfPay: {
           type: DataTypes.INT,
           allowNull: false,
       },
       location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    time: {
        type: DataTypes.INT,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
    })

    Task.associate = function(models) {
        Task.belongsTo(models.Hiring, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    
      Task.associate = function(models) {
        Task.belongsTo(models.Tasker, {
          foreignKey: {
            allowNull: false
          }
        });
      };
      return Task;
}