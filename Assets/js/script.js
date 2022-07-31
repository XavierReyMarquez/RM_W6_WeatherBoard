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

var saveCities = function () {
  localStorage.setItem("cities", JSON.stringify(cities));
};

var displaySearched;

var getCurrentData = function (data, city) {
  //end points
  var tempCurrent = Math.round(data.current.temp);
  var windSpeed = Math.round(data.current.wind_speed);
  var humidity = data.current.humidity;
  var iconCurrent = data.current.weather[0].icon;
  var uvIndex = data.current.uvi;

  //creating HTML
  currentContainerEl.textContent = "";
  currentContainerEl.setAttribute("class", "m-3 border col-10 text-center");
  var divCityHeader = document.createElement("div");
  var headerCityDate = document.createElement("h2");
  var currentDate = moment().format("L");
  var imageIcon = document.createElement("img");
  imageIcon.setAttribute("src", "");
  imageIcon.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/" + iconCurrent + "@2x.png"
  );
  headerCityDate.textContent = city + " (" + currentDate + ")";

  //append to current container
  divCityHeader.appendChild(headerCityDate);
  divCityHeader.appendChild(imageIcon);
  currentContainerEl.appendChild(divCityHeader);

  //displaying weather data

  var divCurrent = document.createElement("div");
  var tempEl = document.createElement("p");
  var humitdityEl = document.createElement("p");
  var windSpeedEl = document.createElement("p");
  var uvIndexEl = document.createElement("p");
  var uvIndexColorEl = document.createElement("p");
  uvIndexColorEl.textContent = uvIndex;
  //color for background of UVindex depending on severity
  if (uvIndex <= 4) {
    uvIndexColorEl.setAttribute("class", "bg-success text-white p-2");
  } else if (uvIndex <= 8) {
    uvIndexColorEl.setAttribute("class", "bg-warning text-black p-2");
  } else {
    uvIndexColorEl.setAttribute("class", "bg-danger text-white p-2");
  }

  //adding data to elements
  tempEl.textContent("Temperature: " + tempCurrent + "°F");
  humitdityEl.textContent = "Humidity: " + humidity + "%";
  windSpeedEl.textContent = "Wind Speed: " + windSpeed + " MPH";
  uvIndexEl.textContent = "UV Index: ";
  uvIndexEl.appendChild(uvIndexColorEl);

  //appending
  divCurrent.appendChild(tempEl);
  divCurrent.appendChild(humitdityEl);
  divCurrent.appendChild(windSpeedEl);
  divCurrent.appendChild(uvIndexEl);

  currentContainerEl.appendChild(divCurrent);
};

var displayForecastData = function (data) {
  forecastContainerEl.textContent = "";
  var forecastHeadEl = document.getElementById("five-day");
  forecastHeadEl.textContent = "5-Day Forecast:";

  for (var i = 1; i < 6; i++) {
    var tempForecast = Math.round(data.daily[i].temp.day);
    var windForecast = Math.round(data.daily[i].wind_speed);
    var humForecast = data.daily[i].humidity;
    var iconForecast = data.daily[i].weather[0].icon;

    console.log(tempForecast);
    console.log(windForecast);
    console.log(humForecast);
    console.log(iconForecast);

    var cardEl = document.createElement("div");
    cardEl.setAttribute(
      "class",
      "card col-xl-2 col-md-5 col-sm-10 mx-3 my-2 bg-primary text-white text-center"
    );

    var cardBodyEl = document.createElement("div");
    cardBodyEl.setAttribute("class", "card-body");

    //create HTML elements
    var cardDateEl = document.createElement("h6");
    cardDateEl.setAttribute("class", "card-text");
    cardDateEl.textContent = moment(i, "days").format("L");

    var cardIconEl = document.createElement("img");
    cardIconEl.setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" + iconForecast + "@2x.png"
    );

    var cardTempEl = document.createElement("p");
    cardTempEl.setAttribute("class", "card-text");
    cardTempEl.textContent = "Temperature:  " + tempForecast + "°F";

    var cardWindEl = document.createElement("p");
    cardWindEl.setAttribute("class", "card-text");
    cardWindEl.textContent = "Wind:  " + windForecast + "MPH";

    var cardHumidEl = document.createElement("p");
    cardHumidEl.setAttribute("class", "card-text");
    cardHumidEl.textContent = "Humidity:  " + humForecast + "%";

    //appending
    cardBodyEl.appendChild(cardDateEl);
    cardBodyEl.appendChild(cardIconEl);
    cardBodyEl.appendChild(cardTempEl);
    cardBodyEl.appendChild(cardWindEl);
    cardBodyEl.appendChild(cardHumidEl);

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
        getCurrentData(city, data);
      });
    }
  });
};
