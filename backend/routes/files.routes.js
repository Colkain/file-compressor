module.exports = (app) => {
  const files = require("../controllers/files.controller.js");

  var router = require("express").Router();

  // Create a new Test
  router.post("/", files.create);

  app.use("/api/files", router);
};
