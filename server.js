const express = require("express");
const setupApiRoutes = require("./routes/apiroutes");
const setupHtmlRoutes = require("./routes/htmlroutes");
const path = require("path");

const app = express();

// PORT number, use 8080 for localhost and any available port number in heroku
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

// handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routing API and HTML call
setupApiRoutes(app);
setupHtmlRoutes(app);

//Start server
app.listen(PORT, () => {
  console.log("App listening on PORT: " + PORT);
});
