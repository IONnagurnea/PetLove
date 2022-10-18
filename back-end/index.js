const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const pool = require("./db");
const { readdirSync } = require("fs");

// middleware
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', parameterLimit: 100000, extended: true }));


const PORT = process.env.PORT || 5001

app.use(express.static(__dirname + '/public'));

// route
readdirSync('./routes').map((r) => 
    app.use('/api', require(`./routes/${r}`))
);

app.listen(PORT, () => {
    console.log("Server has started on port", PORT);
});

