const Api = require("express").Router();
const { LocationController } = require('../controllers/user')

Api.post("/location", LocationController.create)
Api.get("/location", LocationController.getAll)

module.exports = Api