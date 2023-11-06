module.exports = app => {
  const containers = require("../controllers/containers.controller.js");

  var router = require("express").Router();

  // Create a new Container
  router.post("/", containers.create);

  // Retrieve all Containers
  router.get("/", containers.getAll);

  // // Retrieve a single Container with id
  // router.get("/:id", containers.findOne);

  // Update a Container with id
  router.put("/:id", containers.update);

  // Delete a Container with id
  router.delete("/:id", containers.delete);

  // // Delete all Containers
  // router.delete("/", containers.deleteAll);

  app.use("/api/containers", router);
};
