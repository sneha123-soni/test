const express = require("express");
const user_route = express.Router();

const user_controller = require("../controller/User")

user_route.post("/register",user_controller.register_user);
user_route.post("/login",user_controller.login_user);

module.exports= user_route;
