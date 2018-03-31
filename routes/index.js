const express    = require("express")

var router = express.Router();

router.get("/", function(req, res) {
  res.render("landing", {pageTitle: "Home"})
})

router.post("/", function(req, res) {
  res.redirect("cards");
})

module.exports = router
