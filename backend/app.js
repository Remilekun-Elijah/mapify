const express  = require('express');
const mongoose = require("mongoose")
const app = express();
if(app.get("env") === 'development') require("dotenv/config")

mongoose.connect(config.mongodbUrl, (error)=> {
 if(error) console.error(error)
 else console.log("Database Connected")
})
const routes = require('./routes')
const cors = require("cors");
const config = require('./utils/config');

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

app.listen(config.port, e => console.log('App running on port '+port))