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
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        jobsHiring: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        jobsDone: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        specialty: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
    });

    User.associate = function (models) {

        User.hasMany(models.Task, {
            onDelete: "cascade"
        });
    };

    return User;
}