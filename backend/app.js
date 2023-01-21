const express  = require('express');
const mongoose = require("mongoose")
const config = require('./utils/config');
const app = express();

mongoose.connect(config.mongodbUrl, (error)=> {
 if(error) console.error(error)
 else console.log("Database Connected")
})
const routes = require('./routes')
const cors = require("cors");

require("./utils/loadMigration")

app.get("/", (req, res)=> {
 res.status(200).json({
  success: true,
  message: "Welcome to Mapify",
  verison: "1.0.0"
 })
})

app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({extended: false, limit: '50kb'}))
app.use(cors("*"));

app.use(express.static(__dirname))

app.use(routes)

app.listen(config.port, e => console.log('App running on port '+config.port))