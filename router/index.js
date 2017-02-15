const router = require("koa-router")();
const users = require("./libs/users");

router.use("/user", users.routes());

module.exports = router;
