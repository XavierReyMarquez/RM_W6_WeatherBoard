var cityFormEl = document.getElementById("city-form");
var cityInputEl = document.getElementById("city-input");
var searchFromEl = document.getElementById("search-button");
var searchHistoryEl = document.getElementById("search-history");
var currentContainerEl = document.getElementById("current-container");
var forecastContainerEl = document.getElementById("forecast-container");

var APIKey = "a1bcf4e8069e231bf20b7eda912b9747";

var city = ["seattle"];

// var queryURL =
//   "https://api.openweathermap.org/data/2.5/weather?q=" +
//   city +
//   " &appid=" +
//   APIKey;

// fetch(queryURL)
//   .then((response) => response.json())
//   .then((data) => console.log(data));

var displayForecastData = function (data) {
  forecastContainerEl.textContent = "";
  var forecastHeadEl = document.getElementById("five-day");
  forecastHeadEl.textContent = "5-Day Forecast:";

  for (var i = 1; i < 6; i++) {
    var tempForecast = Math.round(data.daily[i].temp.day);

    console.log(tempForecast);

    var cardEl = document.createElement("div");
    cardEl.setAttribute(
      "class",
      "card col-xl-2 col-md-5 col-sm-10 mx-3 my-2 bg-primary text-white text-center"
    );

    var cardBodyEl = document.createElement("div");
    cardBodyEl.setAttribute("class", "card-body");

    var cardTempEl = document.createElement("p");
    cardTempEl.setAttribute("class", "card-text");
    cardTempEl.textContent = "Temperature:  " + tempForecast + "°F";

    cardBodyEl.appendChild(cardTempEl);

    cardEl.appendChild(cardBodyEl);
    forecastContainerEl.appendChild(cardEl);

    cityFormEl.reset();
  }
};

var getCityData = function (city) {
  //   event.preventDefault();

  var cityInfoUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    " &appid=" +
    APIKey;

  fetch(cityInfoUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);

        var cityName = data.name;
        var latitude = data.coord.lat;
        var longitude = data.coord.lon;

        getWeatherData(cityName, latitude, longitude);
      });
    }
  });
};

getWeatherData = function (city, latitude, longitude) {
  var forecastUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&units=imperial&exclude=minutely,hourly&appid=" +
    APIKey;

  fetch(forecastUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);

        displayForecastData(data);
      });
    }
  });
};

getCityData(city);
