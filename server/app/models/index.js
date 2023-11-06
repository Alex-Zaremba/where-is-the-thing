const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.things = require("./thing.model.js")(mongoose);
db.containers = require("./container.model.js")(mongoose);
db.distributions = require("./distribution.model.js")(mongoose);

db.ROLES = ["user", "admin"];

module.exports = db;