$(document).ready(function () {
  let API_KEY = "89c02cddfda46a49623a056a7e324dac";
  let currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=${API_KEY}&units=imperial`;
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=tokyo&appid=${API_KEY}&units=imperial`;


  function updateUrl(city) {
    currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;
  }


  let savedCity = localStorage.getItem('city');
  if (savedCity) {

    $('#savedCity').text(`Saved City: ${savedCity}`);


    $('#savedCity').click(function () {

      updateUrl(savedCity);

      $('h2').text(`Weather for ${savedCity}`);

      function updateUrl(forecastcity) {
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`;
      }


      $.get(currentUrl).then(function (data) {

        let temperature = data.main.temp;
        let humidity = data.main.humidity;
        let windSpeed = data.wind.speed;

        $("#temperature").text(`Temperature: ${temperature}°F`);
        $("#humidity").text(`Humidity: ${humidity}%`);
        $("#wind").text(`Wind Speed: ${windSpeed} m/s`);
      });

      $.get(forecastUrl).then(function (data) {

        let forecastData = data.list.slice(0, 5);

        for (let i = 0; i < forecastData.length; i++) {
          let forecastTemperature = forecastData[i].main.temp;
          let forecastHumidity = forecastData[i].main.humidity;
          let forecastWindSpeed = forecastData[i].wind.speed;

          $(`#forecastTemperature${i}`).text(`Temperature: ${forecastTemperature}°F`);
          $(`#forecastHumidity${i}`).text(`Humidity: ${forecastHumidity}%`);
          $(`#forecastWind${i}`).text(`Wind Speed: ${forecastWindSpeed} m/s`);
        }
      });
    });
  }

  $("#searchButton").click(function () {

    let city = $("#cityInput").val();


    updateUrl(city);

    $('h2').text(`Weather for ${city}`);


    localStorage.setItem('city', city);


    $.get(currentUrl).then(function (data) {

      let temperature = data.main.temp;
      let humidity = data.main.humidity;
      let windSpeed = data.wind.speed;


      $("#temperature").text(`Temperature: ${temperature}°F`);
      $("#humidity").text(`Humidity: ${humidity}%`);
      $("#wind").text(`Wind Speed: ${windSpeed} m/s`);
    });
  });


  $.get(currentUrl).then(function (data) {

    let temperature = data.main.temp;
    let humidity = data.main.humidity;
    let windSpeed = data.wind.speed;


    $("#temperature").text(`Temperature: ${temperature}°C`);
    $("#humidity").text(`Humidity: ${humidity}%`);
    $("#wind").text(`Wind Speed: ${windSpeed} m/s`);


    $.get(forecastUrl).then(function (data) {

      let forecastData = data.list.filter(item => {
        const date = new Date(item.dt * 1000);
        const hours = date.getHours();
        return hours === 0 || hours === 12;
      });


      for (let i = 0; i < forecastData.length; i++) {
        let forecastTemperature = forecastData[i].main.temp;
        let forecastHumidity = forecastData[i].main.humidity;
        let forecastWindSpeed = forecastData[i].wind.speed;

        $(`#forecastTemperature${i}`).text(`Temperature: ${forecastTemperature}°F`);
        $(`#forecastHumidity${i}`).text(`Humidity: ${forecastHumidity}%`);
        $(`#forecastWind${i}`).text(`Wind Speed: ${forecastWindSpeed} m/s`);
      }
    });
  });
});