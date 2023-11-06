module.exports = app => {
  const distributions = require("../controllers/distributions.controller.js");

  var router = require("express").Router();

  // Create a new Distribution
  router.post("/", distributions.create);

  // Retrieve Distribution for current user
  router.get("/current-user", distributions.getForCurrentUser);

  // Retrieve all Distributions
  router.get("/", distributions.getAll);

  // // Retrieve a single Distribution with id
  // router.get("/:id", distributions.findOne);

  // Update a Distribution with id
  // router.put("/:id", distributions.update);

  // Delete a Distribution with id
  // router.delete("/:id", distributions.delete);


  app.use("/api/distributions", router);
};
