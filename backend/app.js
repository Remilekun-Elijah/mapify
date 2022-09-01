const express  = require('express');
const mongoose = require("mongoose")
const app = express();
if(app.get("env")==='development') require("dotenv/config")

mongoose.connect(process.env.DB_URL, (error)=> {
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

app.use(express.json({limit: '24kb'}));
app.use(express.urlencoded({extended: false, limit: '24kb'}))
app.use(cors("*"));

app.use(routes)

app.listen(port, e => console.log('App running on port '+port))