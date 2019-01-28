var bcrypt = require("bcrypt-nodejs");
module.exports = function(sequelize, DataTypes) {
  var Signin = sequelize.define("Signin", {
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
  Signin.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  Signin.hook("beforeCreate", function(Signin) {
    Signin.password = bcrypt.hashSync(Signin.password, bcrypt.genSaltSync(10), null);
  });
  return Signin;
};