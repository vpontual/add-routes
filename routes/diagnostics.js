const diagnostics = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");

// GET Route for retrieving diagnostic information
diagnostics.get("/", (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile("./db/diagnostics.json")
    .then((data) => res.json(JSON.parse(data)))
    .catch((err) => res.status(500).json(err));
});

// POST Route for a error logging
diagnostics.post("/", (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  const { tip, username } = req.body;
  if (!tip || !username) {
    return res.status(400).json({
      message: "Please include a tip and username .",
    });
  }

  const newDiagnostic = {
    diagnostic_id: uuidv4(),
    submission_date: new Date().toISOString(),
    tip,
    username,
  };

  readAndAppend(newDiagnostic, "./db/diagnostics.json");
  res.json(`Diagnostic added: ${newDiagnostic.diagnostic_id}`);
});

module.exports = diagnostics;
