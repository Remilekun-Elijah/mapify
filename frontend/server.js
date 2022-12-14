const express = require("express");
const path = require("path");
const port = process.env.PORT || 3002;
const app = express();

app.use(express.static(path.join(__dirname, "./build")));

app.get("/ping", function(req, res) {
    return res.send("pong");
});

app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "./build", "index.html"));
});

app.listen(port, () => console.log(`app is running on port ${port}`));