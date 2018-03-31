const express    = require("express"),
      mongoose   = require("mongoose"),
      bodyParser = require("body-parser"),
      mtg        = require("mtgsdk");

const indexRoutes = require("./routes/index"),
      cardRoutes  = require("./routes/cards");

const seed = require("./seed");

mongoose.connect("mongodb://localhost/mtg_card_collector")

var app = express();

app.set("view engine", "pug");

// Allows us to use form data in req.body
app.use(bodyParser.urlencoded({extended: true}));

// Routing
app.use("/", indexRoutes);
app.use("/cards", cardRoutes);

// Start Server
app.listen(3000, function() {
  console.log("Server is listening on port 3000...")
});
