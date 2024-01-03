// let searchInput = $("#search-input");
// let searchButton = $("#search-button");

let apiKey = "89c02cddfda46a49623a056a7e324dac";
let currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}&units=imperial`;
let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=london&appid=${apiKey}&units=imperial`;

$.get(forecastUrl)
  .then(function(data) {
    
  });