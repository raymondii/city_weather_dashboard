let searchInput = $("#search-input");
let searchButton = $("#search-button");

let apiKey = "89c02cddfda46a49623a056a7e324dac";
let currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=imperial`;
let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=${apiKey}&units=imperial`;


$.get(currentUrl)
  .then(function(data) {
    let block = data.list;

    for (let i = 0; i < blocks.length; i++) {
      let blockObject = blocks[i];

      if (blockObject.dt_txt.includes("12:00")) {
        console.log(blockObject);
      }
    }
  });

  function getSearchHistory() {
    let rawData = localStorage.getItem("search-history");
    let history = JSON.parse(rawData) || [];

    return history;
  }

  function getForecastWeather() {
    console.log("forcast");
  }

  function getCurrentForecast() {
    let cityName = searchInput.val();
    let history = getSearchHistory();

    if (!history.includes(cityName)) {
      history.push(cityName);
      localStorage.setItem("search-history", JSON.stringify(history));
    }

    $.get(currentUrl + `&q=${cityName}`)
      .then(function (data) {
        // output the current wether conditions

        // retirive the forcast weather

      })
      .then(getForcastWeather)
  }

  // output search history as html buttons
  function outputSearchHistory() {

  }

  searchButton.click(getCurrentForecast);