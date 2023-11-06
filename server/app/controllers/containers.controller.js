const db = require("../models");
const Container = db.containers;

// Create and Save a new Container
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.volume) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Container
  const container = new Container({
    name: req.body.name,
    volume: req.body.volume
  });

  // Save Container in the database
  container
    .save(container)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Container."
      });
    });
};

// Retrieve all Containers from the database.
exports.getAll = (req, res) => {
  Container.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving containers."
      });
    });
};

// Update a Container by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Container.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Container with id=${id}. Container was not found!`
        });
      } else {
        res.send({ message: "Container was updated successfully." });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Container with id=" + id
      });
    });
};

// Delete a Container with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Container.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Container with id=${id}. Maybe Container was not found!`
        });
      } else {
        res.send({
          message: "Container was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Container with id=" + id
      });
    });
};