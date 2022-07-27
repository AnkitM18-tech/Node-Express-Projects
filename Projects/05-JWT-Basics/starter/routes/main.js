const express = require("express");
const router = express.Router();

const { login, dashboard } = require("../controllers/main");
const authMiddleware = require("../middleware/auth");

router.route("/dashboard").get(authMiddleware, dashboard); // now to reach dashboard one need to go through the authentication middleware.
router.route("/login").post(login);

module.exports = router;
