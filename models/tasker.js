module.exports = function(sequelize, DataTypes){
    var Tasker = sequelize.define("Tasker",{
       name: {
           type: DataTypes.STRING,
           allowNull: false,
       },
       location: {
           type: DataTypes.STRING,
           allowNull: false,
       },
       contact: {
           type: DataTypes.STRING,
           allowNull: false,
       },
       rating: {
        type: DataTypes.INT,
        allowNull: false,
    },
    jobs: {
        type: DataTypes.INT,
        allowNull: false
    },
    specialty: {
        type: DataTypes.STRING,
        allowNull: false
    }
    })

    Tasker.associate = function(models) {

        Tasker.hasMany(models.Task, {
          onDelete: "cascade"
        });
      };
}