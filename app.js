const express = require("express");

const indexRoutes = require("./routes/index")

var app = express();

app.set("view engine", "pug");

// Routing
app.use("/", indexRoutes);


// Start Server
app.listen(3000, function() {
  console.log("Server is listening on port 3000...")
});
