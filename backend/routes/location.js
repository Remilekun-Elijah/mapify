const Api = require("express").Router();
const LocationController = require('../controllers/location')

Api.route("/")
 .post(LocationController.create)
 .get(LocationController.getAll)
 .patch(LocationController.deleteBulk);

 Api.route("/:id")
 .delete(LocationController.deleteOne)
 .put(LocationController.edit);

Api.put("/image/:id", LocationController.uploadImage)

module.exports = Api