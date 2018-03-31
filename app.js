const express   = require("express"),
      mongoose  = require("mongoose"),
      mtg       = require("mtgsdk");

const indexRoutes = require("./routes/index");

const seed = require("./seed");

mongoose.connect("mongodb://localhost/mtg_card_collector")

var app = express();

app.set("view engine", "pug");

// Routing
app.use("/", indexRoutes);

seed();

// Start Server
app.listen(3000, function() {
  console.log("Server is listening on port 3000...")
});
