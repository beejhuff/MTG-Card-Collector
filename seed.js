const scry     = require("scryfall-sdk"),
      mongoose = require("mongoose");

const Card = require("./models/Card");

mongoose.connect("mongodb://localhost/mtg_card_collector");

function addCard(card) {
  Card.findOne({id: card.id}, function(err, foundCard) {
    if(err) {
      console.log(err)
    } else {
      if(!foundCard) {
        Card.create(card, function(err, newCard) {
          if (err) {
            console.log(err)
          } else {
            console.log("Saving " + newCard.name + " to the database...");
            newCard.save();
          }
        })
      }
    }
  })
}

Card.remove({}, function(err) {
  if(err) {
    console.log(err)
  } else {
    console.log("Database Cleared.")
    scry.Cards.all().on("data", card => {
      addCard(card);
    }).on("end", () => {
      console.log("Database updated.")
    })
  }
});
