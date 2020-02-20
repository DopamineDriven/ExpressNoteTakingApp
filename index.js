const express = require("express");
//body-parser is middleware designed by the same team that made express
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const noteRoutes = require("./notes/routes");
const publicRoutes = require("./public/routes");
const app = express();
const PORT = 4000;

//connecting express and mongodb via mongoose
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/expressnotetaker";

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

console.log(MONGODB_URI)


//parses any json body passed in the app
app.use(bodyParser.json())
//takes parameter for extended to extend capability of body-parser
app.use(bodyParser.urlencoded({extended: true}))

//placing app.use('path') beneath bodyParser gives all paths body-parser features
app.use('/notes', noteRoutes)
app.use('/public', publicRoutes)

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`)
});