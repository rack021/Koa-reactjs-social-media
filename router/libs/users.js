const router = require("koa-router")();
const MemberShip = require("../../membership");

router.post("/login", MemberShip.login);
router.post("/register", MemberShip.registeration);
router.get("/profile/:id", MemberShip.auth, MemberShip.isAdmin, MemberShip.getProfile);
router.get("/profile", MemberShip.auth, MemberShip.getProfile);

module.exports = router;
