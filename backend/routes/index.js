const Api = require("express").Router()
const location = require('./location')
const user = require('./user')

Api.use(user)
Api.use(location)

module.exports = Api;