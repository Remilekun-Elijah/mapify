const Api = require("express").Router();
const UserController = require('../controllers/user')

Api.post("/login", UserController.login)

module.exports = Api