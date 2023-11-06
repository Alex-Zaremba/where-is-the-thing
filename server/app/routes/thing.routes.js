module.exports = app => {
  const things = require("../controllers/things.controller.js");

  var router = require("express").Router();

  // Create a new Thing
  router.post("/", things.create);

  // Retrieve all Containers
  router.get("/", things.getAll);

  // // Retrieve a single Thing with id
  // router.get("/:id", things.findOne);

  // Update a Thing with id
  router.put("/:id", things.update);

  // Delete a Thing with id
  router.delete("/:id", things.delete);

  // // Delete all Containers
  // router.delete("/", things.deleteAll);

  app.use("/api/things", router);
};
