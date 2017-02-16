const error = require("http-error-constructor");
const HttpError = require("http-error-constructor");
const TokenModel = require("../model/tokens");
const UserModel = require("../model/users");
const jwt = require("jsonwebtoken");

var ctx;

class Helper {
  constructor() {
    ctx = this;
  }

  *_authSuccess(userAgent, uid) {
    let token = yield ctx._generateAndStoreToken(userAgent, uid);
    let body = { token: token, message: "Successfully logged in!" };
    return body;
  }

  *_invalidatedTokens(uid) {
    let tokens = yield TokenModel.find({ uid: uid, valid: true });
    if (tokens.length > 0) {
      for (let token of tokens) {
        token.set("valid", false);
        yield token.save();
      }
    }
  }

  *_generateAndStoreToken(userAgent, uid) {
    yield ctx._invalidatedTokens(uid);
    let tokenEntry = new TokenModel({ uid: uid, valid: true });
    yield tokenEntry.save();

    let token = ctx._generateToken(userAgent, tokenEntry.get("_id").toString());
    tokenEntry.set("token", token);
    yield tokenEntry.save();
    return token;
  }

  _generateToken(userAgent, tid) {
    let payload = {
      auth: tid,
      agent: userAgent,
      exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60
    };
    return jwt.sign(payload, "secret");
  }

  _authFail() {
    throw new HttpError(401);
  }

  _forbidden() {
    throw new HttpError(403);
  }

  *authHandler() {
    let body = this.request.body;

    let condition = { username: body.username, password: body.password };

    let user = yield UserModel.findOne(condition);
    if (user) {
      this.body = yield ctx._authSuccess(this.state.source, user.get("_id").toString());
    } else {
      ctx._authFail();
    }
  }

  *_verify(tid) {
    let condition = { _id: tid };
    let token = yield TokenModel.findOne(condition);
    if (token && token.get("valid") == true) {
      let user = yield UserModel.findOne({ _id: token.get("uid") });
      return user;
    } else {
      ctx._authFail();
    }
  }

  *isAdmin(next) {
    return this.request.user.type === "admin" ? yield next : ctx._forbidden();
  }

  *validate(next) {
    var token = this.request.token;
    try {
      var decoded = jwt.verify(token, "secret");
    } catch (e) {
      ctx._authFail();
    }
    if (!decoded || !decoded.auth) {
      ctx._authFail();
    } else {
      const userdoc = yield ctx._verify(decoded.auth);
      this.request.user = userdoc.get();
      yield next;
    }
  }
}

module.exports = new Helper();
