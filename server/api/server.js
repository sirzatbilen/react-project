const auth = require("./Auth/auth-router");
const company = require("./Company/Company-router");

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());

app.use("/user", auth);
app.use("/login", auth);
app.use("/company", company);

module.exports = app;
