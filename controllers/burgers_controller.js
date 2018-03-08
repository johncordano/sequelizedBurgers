var express = require("express");
var router = express.Router();
// Import the model (burger.js) to use its database functions.
var db = require("../models");
// Create the routes and set up logic within those routes as needed.
router.get("/", function(req, res) {
 db.Burger.findAll({}).then(function (data) {
    var hbsObject = {
      burgers: data
    };
    console.log("hbsObject:", hbsObject)
    res.render("index", hbsObject);
  });
});
router.post("/api/burgers", function(req, res) {
  db.Burger.create({
    burger_name:req.body.burger_name,
    devoured: false
  }).then(function(result) {
    // Send back the ID of the new burger.
    res.json({ id: result.insertId });  
    });
});
router.put("/api/burgers/:id", function(req, res) {
  db.Burger.update({
    devoured: true
  }, {
    where: {
      id: req.params.id
    }
  }).then(function(data) {
    res.json(data);
  });
}); 
// Export the routes for the server.js file to use.
module.exports = router;