const db = require("../models");
const Thing = db.things;

// Create and Save a new Thing
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.volume) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Thing
  const thing = new Thing({
    name: req.body.name,
    volume: req.body.volume
  });

  // Save Thing in the database
  thing
    .save(thing)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Thing."
      });
    });
};

// Retrieve all Containers from the database.
exports.getAll = (req, res) => {
  Thing.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving things."
      });
    });
};

// Update a Thing by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Thing.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Thing with id=${id}. Thing was not found!`
        });
      } else {
        res.send({ message: "Thing was updated successfully." });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Thing with id=" + id
      });
    });
};

// Delete a Thing with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Thing.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Thing with id=${id}. Maybe Thing was not found!`
        });
      } else {
        res.send({
          message: "Thing was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Thing with id=" + id
      });
    });
};