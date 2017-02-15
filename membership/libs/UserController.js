const UserModel = require("../model/users");
class UserController {
  constructor() {
  }

  *getProfile() {
    let condition = { _id: this.request.uid };
    if (this.params.id) {
      condition = { username: this.params.id };
    }
    let user = yield UserModel.findOne(condition);
    let profile = {
      fristName: user.get("fristName") ? user.get("fristName") : user.get("username")
    };
    this.body = Object.assign(UserModel.ProfileModel, profile);
  }
}

module.exports = new UserController();
