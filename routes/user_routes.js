const express = require("express");
const {registerUser,loginUser,getDetails} = require("../controllers/user_controller");
const validToken = require("../errorHandlers/validationHandler");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.get("/details",validToken,getDetails);

module.exports = router;