const scry = require("scryfall-sdk");

scry.Cards.all().on("data", card => {
  console.log(card.card_faces)
});
