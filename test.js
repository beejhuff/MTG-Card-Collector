const scry = require("scryfall-sdk"),
      mongoose = require("mongoose")

const Card = require("./models/Card")

mongoose.connect("mongodb://localhost/mtg_card_collector")

function findCards(searchTerm) {
  return Card.find({type_line: searchTerm}).exec();
};

function populateResults(cards) {
  var results = [];
  for(i = 0; i < cards.length; i++) {
    if(!results.includes(cards[i].type_line)) {
      results.push(cards[i].type_line)
    }
  }
  return results
};

function retrieveCards() {
  var searchTerm = "Basic Land";
  var exactMatch = true;

  if(exactMatch) {
    console.log("Mode: Exact Match");
    findCards(searchTerm)
      .catch(() => {console.log(err)})
      .then(cards => populateResults(cards))
  }

  else if(searchTerm.includes(",")) {
    console.log("Mode: Comma Match");
    searchTerm = searchTerm.split(",");

    for(i = 0; i < searchTerm.length; i++) {
      searchTerm[i] = searchTerm[i].trim();
      searchTerm[i] = new RegExp(searchTerm[i], "gi")

      findCards(searchTerm[i])
        .catch(() => {console.log(err)})
        .then(cards => populateResults(cards))
    }
  }

  else {
    console.log("Mode: Other Match")
    searchTerm = searchTerm.split(" ");

    for(i = 0; i < searchTerm.length; i++) {
      searchTerm[i] = new RegExp(searchTerm[i], "gi")

      findCards(searchTerm[i])
        .catch(() => {console.log(err)})
        .then(cards => populateResults(cards))
    }
  }
}

var test = retrieveCards();
console.log(test)
