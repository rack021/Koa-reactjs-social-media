module.exports = function*(next) {
  try {
    yield next;
  } catch (err) {
    this.status = err.status || 500;
    this.body = err.message;
    if (!err.status) {
      this.app.emit("error", err, this);
    }
  }
};
