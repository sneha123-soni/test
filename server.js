const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();

const PORT = process.env.port || 8080;

const ConnectDb = require("./config/dbConnection");

//db connection
ConnectDb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));

//load user routes
const user_routes = require("./route/User");
app.use("/api", user_routes);

//load contact routes
const contact_routes = require("./route/Contact");
app.use("/api/contact", contact_routes);

app.listen(PORT, ()=>{
    console.log(`Server is Running on ${PORT}`);
})