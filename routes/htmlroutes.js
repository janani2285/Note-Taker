const path = require("path");

module.exports = function (app) {
    //Route to notes.html
    app.get("/notes", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
  
 
  
    //If no routes match, default all non-matching routes to index.html
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
  };