const express = require('express');
const routes = express.Router();
const UserRoute = require('./user');
routes.use("/user",UserRoute)
module.exports = routes