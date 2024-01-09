$(document).ready(function () {
  let API_KEY = "89c02cddfda46a49623a056a7e324dac";
  let currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=${API_KEY}&units=imperial`;
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=tokyo&appid=${API_KEY}&units=imperial`;

  function updateUrl(city) {
    currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;
    forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`;
  }

  function getWeatherData(city) {
    updateUrl(city);

    $.get(currentUrl).then(function (data) {
      let temperature = data.main.temp;
      let humidity = data.main.humidity;
      let windSpeed = data.wind.speed;

      $("#temperature").text(`Temperature: ${temperature}°F`);
      $("#humidity").text(`Humidity: ${humidity}%`);
      $("#wind").text(`Wind Speed: ${windSpeed} m/s`);
    });

    $.get(forecastUrl).then(function (data) {
      let forecastData = data.list;

      $(".forecast-icons").empty();

      for (let i = 0; i < forecastData.length; i += 8) {
        let forecastTemperature = forecastData[i].main.temp;
        let forecastHumidity = forecastData[i].main.humidity;
        let forecastWindSpeed = forecastData[i].wind.speed;
        let weatherIcon = forecastData[i].weather[0].icon;

        let forecastItem = $(`<li class="weather-items">
                                <h2 id="userInput">${city}</h2>
                                <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="weather-icon">
                                <h4 id="forecastTemperature${i / 8}">Temperature: ${forecastTemperature}°F</h4>
                                <h3 id="forecastWindSpeed">Wind: ${forecastWindSpeed} m/s</h3>
                                <h3 id="forecastHumidity">Humidity: ${forecastHumidity}%</h3>
                              </li>`);

        $(".forecast-icons").append(forecastItem);
      }
    });
  }

  function saveAndDisplayCity(city) {
    let cities = JSON.parse(localStorage.getItem('cities')) || [];

    if (cities.length >= 5) {
      cities.shift(); 
    }

    cities.push(city);
    localStorage.setItem('cities', JSON.stringify(cities));

    $("#lastCities").empty();

    for (let i = cities.length - 1; i >= 0; i--) {
      let cityItem = $(`<li>${cities[i]}</li>`);
      $("#lastCities").append(cityItem);

      cityItem.click(function () {
        getWeatherData(cities[i]);
      });
    }
  }

  $("#searchButton").click(function () {
    let city = $("#cityInput").val();
    updateUrl(city);
    $('h2').text(`Weather for ${city}`);
    localStorage.setItem('city', city);

    getWeatherData(city);
    saveAndDisplayCity(city);
  });

  let savedCity = localStorage.getItem('city');
  if (savedCity) {
    $('h2').text(`Weather for ${savedCity}`);
    getWeatherData(savedCity);
    saveAndDisplayCity(savedCity);
  }
});
