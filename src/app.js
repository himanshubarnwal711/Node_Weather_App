const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geoCode");
const forcast = require("./utils/forecast");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// app.com
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Seth Manikchand",
  });
});

// app.com/about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    image: "/img/robot.jpg",
    name: "Bakchod Launda",
  });
});

// app.com/help
app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Help is given to all those who comes to Hogwarts.",
    title: "Help",
    name: "Fukrey Chaurasia",
  });
});

// app.com/weather
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address.",
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, foecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: foecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );

  // res.send({
  //   forecast: "Heavy rainfall",
  //   location: "Varanasi",
  //   address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 help",
    name: "Kersil Lallu",
    errorMessage: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Paglu Tilakia",
    errorMessage: "Page not found!",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
