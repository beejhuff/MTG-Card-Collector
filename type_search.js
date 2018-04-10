const scry = require("scryfall-sdk"),
      mongoose = require("mongoose")

const Card = require("./models/Card")

mongoose.connect("mongodb://localhost/mtg_card_collector")

// The following function returns a Promise. It can be called in other files by requiring it and then calling:

/*  findCards(searchTerms, exactMatch).then(results => {
  returns an Array of the cards that match the search term.
})

*/

function searchDB(searchTerm) {
  return Card.find({type_line: searchTerm}).exec() // Returns a Promise that is executed when searchDB() is called.
}

function populateResults(cards, currentResults) {

  for(i = 0; i < cards.length; i++) {
    if(!currentResults.includes(cards[i])) {
      currentResults.push(cards[i])
    }
  }
  return currentResults
}

function buildSearchTerms(searchString, exactMatch) {

  if(exactMatch) {
    var searchTerms = searchString.replace("-", "\u2014").split(); // Create array of the search term to make it consistent with the other methods.

    return searchTerms
  }

  else if(searchString.includes(",")) {
    var searchTerms = searchString.split(","); // Returns Array of search terms
    for(i = 0; i <  searchTerms.length; i++) {
      searchTerms[i] = searchTerms[i].trim();
      searchTerms[i] = new RegExp(searchTerms[i], "gi")
    }

    return searchTerms
  }

  else {
    searchTerms = searchString.trim();
    searchTerms = searchTerms.split(); // Converts string to array
    searchTerms[0] = new RegExp(searchTerms[0], "gi")

    return searchTerms
  }
}

async function findCards(searchString, exactMatch) {
  var results = []

  var searchTerms = buildSearchTerms(searchString, exactMatch);

  for(let term of searchTerms) {
    let foundCards = await searchDB(term);
    results = await populateResults(foundCards, results)
  }

  return Promise.all(results);
}

module.exports = findCards;
