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

  getForecast(response.data.city);
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

function getForecast(city) {
  let apiKey = "aa50c5taa349ad0ccb0b41133of3fd60";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit="metric"`;

  axios.get(apiUrl).then(displayForecast);
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weekly-forecast">
            <div class="weekly-forecast-day">${formatForecastDay(
              day.time
            )}</div>
            <img src = "${
              day.condition.icon_url
            }" class="weekly-forecast-icon" />
            <div class="weekly-forecast-temperatures">
              <div class="weekly-forecast-temp-high">
                <strong>${Math.round(day.temperature.maximum)}°</strong>
              </div>
              <div class="weekly-forecast-temp-low">
                ${Math.round(day.temperature.minimum)}° 
              </div>
              </div>
              </div>
              `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", newCity);

searchCity("Melbourne");
displayForecast();
