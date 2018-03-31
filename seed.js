const mongoose = require("mongoose"),
      mtg      = require("mtgsdk");

const Card     = require("./models/card");

function addCard(newCard) {
  var mId  = newCard.multiverseid
  Card.find({multiverseid: mId}, function(err, foundCard) {
    if(foundCard.length == 0) {
      Card.create(newCard, function(err, createdCard) {
        if(err) {
          console.log(err)
        } else {
          createdCard.save();
          console.log("Saved " + createdCard.name + " to the database.")
        }
      })
    }
  })
}

function seedDB() {

  var searchStream = mtg.card.all({})
  searchStream.on("data", card => {
    addCard(card)
  });

  searchStream.on("end", () => {
    console.log("Database updated.")
  })
}

module.exports = seedDB;
