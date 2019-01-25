module.exports = function(sequelize, DataTypes){
    var Hiring = sequelize.define("Hiring",{
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
    }
    })

    Hiring.associate = function(models) {

        Hiring.hasMany(models.Task, {
          onDelete: "cascade"
        });
      };
    
      return Hiring;
}