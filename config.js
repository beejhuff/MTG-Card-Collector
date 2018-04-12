const mongoose = require("mongoose"),
      scry     = require("scryfall-sdk");

const Card     = require("./models/Card")

mongoose.connect("mongodb://localhost/mtg_card_collector");

// Create our object to populate with Config Options.
var configOptions = {}

// Isolate the DB query for ease and modularity
function getChoices(option) {
  return Card.distinct(option).exec()
}


// Cycle through each config option, waiting on a resolved Promise from getChoices() and assinging the result to a key within configOptions
async function populateConfigOptions() {
  configOptions.layouts = await getChoices("layout");
  configOptions.colors = await getChoices("colors");
  configOptions.set_names = await getChoices("set_name");
  configOptions.rarities = await getChoices("rarity");
  configOptions.artists = await getChoices("artist");
  configOptions.border_colors = await getChoices("border_color");

  // Legalities is a bit more complicated. We want the keys within the objects in each array, but only once.
  var legalities = await getChoices("legalities");

  for (let i = 0; i < legalities.length; i++) {
    for (var key in legalities[i]) {
      if(configOptions.legalities && !configOptions.legalities.includes(key)) {
        configOptions.legalities.push(key)
      }
    }
  }
  return configOptions
}

module.exports = populateConfigOptions;
