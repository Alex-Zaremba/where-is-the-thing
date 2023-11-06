const db = require("../models");
const Distribution = db.distributions;
var jwt = require("jsonwebtoken");

// Create and Save a new Distribution
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const token = req.session.token;
  const tokenData = jwt.decode(token);

  // Create a Distribution
  const distribution = new Distribution({
    userId: tokenData.id,
    distribution: req.body.distribution ?? []
  });

  await Distribution.deleteMany({ userId: tokenData.id })

  // Save Distribution in the database
  distribution
    .save(distribution)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Distribution."
      });
    });
};

// Retrieve Distribution for current user
exports.getForCurrentUser = (req, res) => {
  const token = req.session.token;
  const tokenData = jwt.decode(token);


  Distribution.findOne({ userId: tokenData?.id })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving distribution for current user."
      });
    });
};

// Retrieve all Distributions
exports.getAll = (req, res) => {
  Distribution.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all distributions"
      });
    });
};