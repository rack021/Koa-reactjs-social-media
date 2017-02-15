const UserModel = require("../model/users");
const co = require("co");
const mailer = require("./Mail");

let status_banned = 0;
let status_active = 1;
let activated = true;
let nonActivated = false;

class Register {
  constructor({username, password, confirmPassword, email}) {
    this.username = username;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.email = email;
  }

  * process() {
    if (yield this._isValid()) {
      let user = new UserModel({
        username: this.username,
        password: this.password,
        email: this.email,
        type: "user",
        active: nonActivated,
        status: status_active
      });
      yield user.save();
      let mail = new mailer(this.email, "dsd");
      mail.send();
    } else {
      throw new Error();
    }
  }

  * _isUnique() {
    let condition = [{
      username: this.username
    }, {
      email: this.email
    }];

    let posts = yield UserModel.or(condition).find();

    if (posts.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  * _isValid() {
    if (
      typeof this.username === "string" &&
      (this.username.length >= 4 || this.username.length <= 16)
    ) {
      if (
        typeof this.email === "string" &&
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(this.email)
      ) {
        if (typeof (this.password == "string" && this.password.length >= 6)) {
          if (this.password === this.confirmPassword) {
            if (yield this._isUnique()) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
}

module.exports = Register;