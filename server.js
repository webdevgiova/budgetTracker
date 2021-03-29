const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PWD);

if (!DB) DB = process.env.LOCALHOST;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`DB connection successful`))
  .catch((err) => console.log(err));

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
