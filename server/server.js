// Require modules
const express = require("express");
const fs = require("fs");
const routes = require("./routes.js");

// Define the PORT this server will be using
const PORT = process.env.PORT || 4000;

// Set up express to handle data parsing
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes will take in app as an arguement to run .get() on app
routes(app);