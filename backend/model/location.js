const {
 Schema,
 model
} = require("mongoose");

const locationSchema = new Schema({
 description: String,
 longitude: Number,
 latitude: Number,
 image: String,
 address: String,
 pollingUnit: String,
 agentParty: String,
 phoneNumber: String,
 lga: String
}, {
 timestamps: true
})

module.exports =  model("location", locationSchema)