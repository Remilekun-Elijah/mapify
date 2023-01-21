const Api = require("express").Router()
const location = require('./location')
const user = require('./user')

Api.use('/auth', user)
Api.use("/location", location)

module.exports = Api;