const Register = require("./libs/register");
const Hepler = require("./libs/Helper");
const UserController = require("./libs/UserController");
class Membership {
  *registeration() {
    yield new Register(this.request.body).process();
    this.status = 200;
  }

  get login() {
    return Hepler.authHandler;
  }

  get auth() {
    return Hepler.validate;
  }

  get isAdmin() {
    return Hepler.isAdmin;
  }

  get getProfile() {
    return UserController.getProfile;
  }
}
module.exports = new Membership();
