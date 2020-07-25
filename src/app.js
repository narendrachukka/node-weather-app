const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
//directories setup
const publicDirectory = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname, "../templates/views");
const partialsDirectory = path.join(__dirname, "../templates/partials");

// view engine settings
app.set("view engine", "hbs");
app.set("views", viewsDirectory);
hbs.registerPartials(partialsDirectory);

// serving static directory
app.use(express.static(publicDirectory));
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Narendra"
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Narendra"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    helpText: "This is the help help page",
    name: "Narendra"
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address as query"
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
  // res.send({
  //   forecast: "Sunny",
  //   location: "philadelphia",
  //   address: req.query.address
  // });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Help article not found",
    name: "Narendra"
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Page Not Found",
    name: "Narendra"
  });
});

app.listen(3000, () => {
  console.log("Server running at port 3000");
});
