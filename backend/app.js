const express  = require('express');
const mongoose = require("mongoose")
const app = express();
const path = require("path")
let mongoDB_Uri;
if(app.get("env")==='development'){
 require("dotenv/config")
mongoDB_Uri = process.env.LOCAL_DB_URL
}  else mongoDB_Uri = process.env.DB_URL

mongoose.connect(mongoDB_Uri, (error)=> {
 if(error) console.error(error)
 else console.log("Database Connected")
})
const routes = require('./routes')
const cors = require("cors")

require("./utils/loadMigration")


const port = process.env.PORT||9000;

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

app.listen(port, e => console.log('App running on port '+port))