function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);

  let description = document.querySelector("#description");
  let currentDescription = response.data.condition.description;
  description.innerHTML = currentDescription;

  let humidity = document.querySelector("#humidity");
  let currentHumidity = `${response.data.temperature.humidity}%`;
  humidity.innerHTML = currentHumidity;

  let windspeed = document.querySelector("#windspeed");
  let currentWindSpeed = `${response.data.wind.speed}km/h`;
  windspeed.innerHTML = currentWindSpeed;

  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  time.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-temperature-icon"/>`;
}

function formatDate(date) {
  let day = date.getDay();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `${minutes}`;
  }
  let hours = date.getHours();
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let currentDay = days[day];
  return `${currentDay} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "5ca9a4e04df3dddde0tdc3bec6cd3f5o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `    <div class="weather-forecast-day">
            <div class="weather-forecast-date">${day}</div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">9°</div>
              <div class="weather-forecast-temperature">2°</div>
            </div>
            <div class="weather-forecast-icon">🌩️</div>
          </div>`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormCity = document.querySelector("#search-form");
searchFormCity.addEventListener("submit", handleSearchSubmit);

searchCity("Abuja");
displayForecast();
