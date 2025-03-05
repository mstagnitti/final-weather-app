function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityTemperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(cityTemperature);

  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.city;
}

function searchCity(city) {
  let apiKey = "aa50c5taa349ad0ccb0b41133of3fd60";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit="metric"`;

  axios.get(apiUrl).then(updateWeather);
}

function newCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", newCity);

searchCity("Melbourne");

let day = document.querySelector("#date");
