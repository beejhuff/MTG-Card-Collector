const express     = require("express");

const Card    = require("../models/card");

var router = express.Router({mergeParams: true});

router.get("/", function(req, res) {
  res.render("cards", {pageTitle: "Cards"})
});

router.post("/", function(req, res) {
  Card.find(req.body, function(err, foundCards) {
    res.render("cards", {pageTitle: "Cards", cardList: foundCards})
  })
})

module.exports = router;
