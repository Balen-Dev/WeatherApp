// Pulling Elements From DOM
let city = document.querySelector(".location .city");
let date = document.querySelector(".location .date");
let temp = document.querySelector(".current .temp");
let weather_el = document.querySelector(".current .weather");
let high_low = document.querySelector(".high-low");
// Pulling Elements From DOM End 

// Declaring API Object To Store Our Data In
const api = {
  key: "996ac21ded3465886a4c499f16d05d64",
  base: "https://api.openweathermap.org/data/2.5/"
}
// Declaring API Object To Store Our Data In End

// Manually Input City Name To Get Weather Data
const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

function setQuery(event) {
  if (event.keyCode == 13) {
    getResults(searchBox.value);
  }
}

async function getResults(query) {
  let weather = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
  let weatherData = await weather.json();
  console.log(weatherData);

  try {
    displayResults(weatherData);
  }
  catch (e) {
    alert(`(${searchBox.value}) is not a valid city name!`)
  }
}



function displayResults(weather) {
  city.innerText = `${weather.name}, ${weather.sys.country}`

  let now = new Date();
  date.innerText = dateBuilder(now);

  temp.innerHTML = `${Math.round(weather.main.temp)} <span>&#176;c</span>`

  weather_el.innerHTML = `${weather.weather[0].description}`;
  // weather_el.innerText = weather.weather[0].main;

  high_low.innerHTML = `${Math.round(weather.main.temp_min)}&#176;c / ${Math.round(weather.main.temp_max)}&#176;c`
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`
}
// Manually Input City Name To Get Weather Data End

// Automatically Request Curren Location And Get Weather Data 
window.addEventListener("load", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
  
      const apiByGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=996ac21ded3465886a4c499f16d05d64`
  
      async function autoGetWeather(autoQuery) {
        let data = await fetch(autoQuery);
        let weatherData = await data.json();
        
          displayResults(weatherData);
        
          }
        autoGetWeather(apiByGeo);
    })
  }
  
})
// Automatically Request Curren Location And Get Weather Data End

// Change Background According To Weather 
// if ()
// Change Background According To Weather End