const Api = require("express").Router();
const { LocationController } = require('../controllers/user')

Api.post("/", LocationController.create)
Api.get("/", LocationController.getAll)
Api.delete("/:id", LocationController.deleteOne)
Api.patch("/", LocationController.deleteBulk)
Api.put("/image/:id", LocationController.uploadImage)

module.exports = Api