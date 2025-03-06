function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityTemperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(cityTemperature);

  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  humidityElement.innerHTML = `${humidity}%`;

  let windElement = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  windElement.innerHTML = `${windSpeed} km/h`;

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);

  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img
              src="${response.data.condition.icon_url}"
              alt="weather-icon"
              class="weather-icon"
            />`;
}

function formatDate(date) {
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
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
