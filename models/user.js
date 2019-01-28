var bcrypt = require("bcrypt-nodejs");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
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
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        jobsHiring: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        jobsDone: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        specialty: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
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
            allowNull: false
        }
    });
    // User.prototype.validPassword = function(password) {
    //   return bcrypt.compareSync(password, this.password);
    // };
    // User.hook("beforeCreate", function(User) {
    //     User.password = bcrypt.hashSync(Signin.password, bcrypt.genSaltSync(10), null);
    // });

    User.associate = function (models) {

        User.hasMany(models.Task, {
            onDelete: "cascade"
        });

    };
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    User.hook("beforeCreate", function (User) {
        User.password = bcrypt.hashSync(User.password, bcrypt.genSaltSync(10), null);
    });
    return User;
}