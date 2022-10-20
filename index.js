const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const pool = require("./db");
const { readdirSync } = require("fs");
const path = require("path");

const PORT = process.env.PORT || 5001

// middleware
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', parameterLimit: 100000, extended: true }));


app.use(express.static(__dirname + '/public'))

if (process.env.NODE_ENV === "production") {
    //server  static contend
    //npm run build
    app.use(express.static(path.join(__dirname, "front-end/build")));
}

// route
readdirSync('./routes').map((r) => 
    app.use('/api', require(`./routes/${r}`))
);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
    console.log("Server has started on port", PORT);
});

