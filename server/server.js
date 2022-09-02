const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const appRoutes = require("./routes/app.routes");

const port = process.env.PORT || 8080;

const dbUrl = process.env.MONGO_URI;

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection open");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/entries", appRoutes);

app.listen(port, () => {
  console.log(`Serving at port: ${port}`);
});
