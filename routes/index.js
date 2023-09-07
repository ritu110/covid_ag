const express = require("express");
const app = express();
const router = require("./routes/covid-statistics");
const bodyParser = require("body-parser");
const port = 8080;

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require("./connector");

// routes
app.use("/", router);

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
