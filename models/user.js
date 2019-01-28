var bcrypt = require('bcrypt-nodejs')

module.exports = function (sequelize, DataTypes) {
    var db = require("../models");
    var User = sequelize.define("User", {
        name: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
        email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { notEmpty: true } },
        location: { type: DataTypes.STRING, allowNull: false, },
        jobsHiring: { type: DataTypes.INTEGER, allowNull: true },
        jobsDone: { type: DataTypes.INTEGER, allowNull: true },
        specialty: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.STRING, allowNull: false },
    }, {
            dialect: "mysql"
        });
    User.validPassword = function (password, passwd, done, user) {
        bcrypt.compare(password, passwd, function (err, isMatch) {
            if (err) console.log(err)
            if (isMatch) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
    };
    User.associate = function (models) {

        User.hasMany(models.Task, {
            onDelete: "cascade"
        });
    };

    //encryption occurs here before password logged to database
    User.hook('beforeCreate', function (user, fn) {
        var salt = bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            return salt
        });
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            var fn = function fn() { };
            if (err) return err;
            console.log(user.password);
            User.update({ password: hash }, { where: { username: user.username } })
            console.log(user.password);
            return fn(null, user)
        });
    });
    return User;
}