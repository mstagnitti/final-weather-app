function newCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", newCity);

let day = document.querySelector("#date");
