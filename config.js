const mongoose = require("mongoose"),
      scry     = require("scryfall-sdk");

const Card     = require("./models/Card")

mongoose.connect("mongodb://localhost/mtg_card_collector");

var configOptions = {
  layouts: [],
  colors: [],
  legalities: [],
  set_names: [],
  rarities: [],
  artists: [],
  border_colors: []
}

function getChoices(option) {
  return Card.distinct(option).exec()
}

async function populateConfigOptions() {
  var layouts = await getChoices("layout");
  var colors = await getChoices("colors");
  var legalities = await getChoices("legalities");
  var set_names = await getChoices("set_name");
  var rarities = await getChoices("rarity");
  var artists = await getChoices("artist");
  var border_colors = await getChoices("border_color");

  var config = await Promise.all([layouts, colors]).then(() => {
    configOptions.layouts = layouts;
    configOptions.colors = colors;
    configOptions.set_names = set_names;
    configOptions.rarities = rarities;
    configOptions.artists = artists;
    configOptions.border_colors = border_colors;

    for (let i = 0; i < legalities.length; i++) {
      for (var key in legalities[i]) {
        if(!configOptions.legalities.includes(key)) {
          configOptions.legalities.push(key)
        }
      }
    }
    return configOptions
  })
  return config
}

module.exports = populateConfigOptions;
