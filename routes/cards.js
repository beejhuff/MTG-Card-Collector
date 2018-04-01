const express     = require("express");

const Card    = require("../models/card");

var router = express.Router({mergeParams: true});

router.get("/", function(req, res) {
  res.render("cards", {pageTitle: "Cards"})
});

router.post("/", function(req, res) {
  req.body.name = new RegExp(escapeRegex(req.body.name), 'gi');
  Card.find(req.body, function(err, foundCards) {
    res.render("cards", {pageTitle: "Cards", cardList: foundCards})
  })
})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
