const mongorito = require("mongorito");
const Model = mongorito.Model;
class Users extends Model {}
Users.ProfileModel = {
  fristName: null,
  lastName: null,
  email: null
};
module.exports = Users;
