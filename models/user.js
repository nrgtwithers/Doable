var bcrypt = require("bcrypt-nodejs");

module.exports = function (sequelize, DataTypes) {
    var db = require("../models");
    var User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "DC"
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
      validate: {
        isEmail: true
      }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // jobsHiring: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        //     defaultValue: 0
        // },
        // jobsDone: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        //     defaultValue: 0
        // },
        specialty: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // status: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        //     defaultValue: ""
        // },
    });

    User.associate = function (models) {

        User.hasMany(models.Task, {
            onDelete: "cascade"
        });

        User.hasOne(models.Signin)
    };

    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
      };
      User.hook("beforeCreate", function(User) {
        User.password = bcrypt.hashSync(User.password, bcrypt.genSaltSync(10), null);
      });
    return User;
}