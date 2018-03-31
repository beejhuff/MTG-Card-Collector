const mongoose = require("mongoose");

var cardSchema = new mongoose.Schema({

  name: String,
  manaCost: String,
  cmc: Number,
  colors: [String],
  colorIdentity: [String],
  type: [String],
  types: [String],
  subtypes: [String],
  rarity: String,
  set: String,
  setName: String,
  text: String,
  flavor: String,
  artist: String,
  number: String,
  power: String,
  toughness: String,
  layout: String,
  multiverseid: Number,
  imageUrl: String,
  watermark: String,
  rulings: [{ date: String, text: String }],
  foreignNames: [{ name: String, imageUrl: String, language: String, multiverseid: Number }],
  printings: [String],
  originalText: String,
  originalType: String,
  legalities: [{ format: String, legality: String }],
  id: String

})

module.exports = mongoose.model("Card", cardSchema);
