const express = require('express');
const routes = express.Router();
const UserController = require('../controller/User');
const { userListValidation, getUserValidation } = require('../validation/user')
const { runValidation } = require("../validation");
routes.post("/create-user",userListValidation, runValidation, UserController.createUser)
routes.get("/get-user", getUserValidation, runValidation, UserController.getUser)
routes.get("/get-all-user",  UserController.getAllUser)
routes.put("/update-user", getUserValidation, runValidation, UserController.updateUser)
routes.delete("/delete-user", getUserValidation, runValidation, UserController.removeUser)
module.exports = routes