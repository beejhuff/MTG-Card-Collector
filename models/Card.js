const mongoose = require("mongoose");

var cardSchema = new mongoose.Schema({
  id: String,
  oracle_id: String,
  multiverse_ids: [Number],
  mtgo_id: Number,
  mtgo_foil_id: Number,
  uri: String,
  scryfall_uri: String,
  prints_search_uri: String,
  rulings_uri: String,
  name: String,
  layout: String,
  cmc: Number,
  type_line: String,
  oracle_text: String,
  mana_cost: String,
  power: String,
  toughness: String,
  loyalty: String,
  life_modifier: String,
  hand_modifier: String,
  colors: [String],
  color_indicator: [String],
  color_identity: [String],
  all_parts: [{
    object: String,
    id: String,
    name: String,
    uri: String
  }],
  card_faces: [{
    object: String,
    name: String,
    mana_cost: String,
    type_line: String,
    oracle_text: String,
    colors: [String],
    color_indicator: [String],
    power: String,
    toughness: String,
    loyalty: String,
    flavor_text: String,
    illustration_id: String,
    image_uris:
     { small: String,
       normal: String,
       large: String,
       png: String,
       art_crop: String,
       border_crop: String
     }
  }],
  legalities: {
    standard: String,
    future: String,
    frontier: String,
    modern: String,
    legacy: String,
    pauper: String,
    vintage: String,
    penny: String,
    commander: String,
    '1v1': String,
    duel: String,
    brawl: String
  },
  reserved: Boolean,
  ehdrec_rank: Number,
  set: String,
  set_name: String,
  collector_number: String,
  set_uri: String,
  set_search_uri: String,
  scryfall_set_uri: String,
  image_uris: {
    png: String,
    border_crop: String,
    art_crop: String,
    large: String,
    normal: String,
    small: String
  },
  highres_image: Boolean,
  reprint: Boolean,
  digital: Boolean,
  rarity: String,
  flavor_text: String,
  artist: String,
  illustration_id: String,
  frame: String,
  full_art: Boolean,
  watermark: String,
  border_color: String,
  story_spotlight_number: Number,
  story_spotlight_uri: String,
  timeshifted: Boolean,
  colorshifted: Boolean,
  futureshifted: Boolean,
  related_cards: {
    object: String,
    id: String,
    name: String,
    uri: String
  },
  usd: String,
  tix: String,
  eur: String,
  related_uris: {
    gatherer: String,
    tcgplayer_decks: String,
    edhrec: String,
    mtgtop8: String
  },
  purchase_uris: {
    amazon: String,
    ebay: String,
    tcgplayer: String,
    magiccardmarket: String,
    cardhoarder: String,
    card_kingdom: String,
    mtgo_traders: String,
    coolstuffinc: String
  }
});
// If Model is already compiled, then delete and re-compile.
delete mongoose.connection.models["Card"];

module.exports = mongoose.model("Card", cardSchema)
