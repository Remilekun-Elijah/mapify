const Api = require("express").Router();
const { LocationController } = require('../controllers/user')

Api.post("/location", LocationController.create)
Api.get("/location", LocationController.getAll)
Api.delete("/location/:id", LocationController.deleteOne)
Api.patch("/location", LocationController.deleteBulk)

module.exports = Api