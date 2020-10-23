// Require modules
const express = require("express");
const fs = require("fs");
const path = require("path");

// Define the PORT this server will be using
const PORT = 4623;

// Set up express to handle data parsing
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());