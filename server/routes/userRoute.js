const express = require("express");
const router = express.Router();
const {userRegister, userLogin, findUser} = require("../controller/userController");
const {isAuth} = require("../middleware/isAuth")

router.post('/register',userRegister);
router.post("/login",userLogin);
router.get('/',isAuth,findUser);
module.exports = router;