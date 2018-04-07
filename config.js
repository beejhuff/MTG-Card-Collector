const mongoose = require("mongoose"),
      scry     = require("scryfall-sdk");

const Card     = require("./models/Card")

mongoose.connect("mongodb://localhost/mtg_card_collector");


// All data options we want to populate with choices.
var configOptionsToPopulate = ["layout", "colors", "legalities", "set_name", "rarity", "artist", "border_color"]

// Data config object to export and use to populate search component
var configOptions = {
  layouts: [],
  colors: [],
  legalities: [],
  set_names: [],
  rarities: [],
  artists: [],
  border_colors: []
}

// Populate configObject with all available choices from the database for each configOption
optionsToPopulate.forEach(configOption => {
  Card.distinct(configOption, (err, choices) => {
    choices.forEach(choice => {

      switch(configOption) {
        case "layout":
          configOptions.layouts.push(choice)
          break
        case "colors":
          configOptions.colors.push(choice)
          break
        case "legalities":
          for(var key in choice) {
            if(!configOptions.legalities.includes(key)) {
              configOptions.legalities.push(key)
            }
          }
          break
        case "set_name":
          configOptions.set_names.push(choice)
          break
        case "rarity":
          configOptions.rarities.push(choice)
          break
        case "artist":
          configOptions.artists.push(choice)
          break
        case "border_color":
          configOptions.border_colors.push(choice)
          break
        default:
          console.log("Something went wrong...");
      }
      console.log(configOptions)
    })
  })
})

type_line: String
