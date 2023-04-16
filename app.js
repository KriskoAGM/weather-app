const cityInput = document.querySelector('.search-container > input');
const cityName = document.getElementById('city-name');
const weatherContainer = document.querySelector('.weather-container');
const currentTemp = document.getElementById('current-temp');
const feelsLikeTemp = document.getElementById('feels-like-temp');
const weatherDescription = document.getElementById('weather-description');
const pressureValue = document.getElementById('pressure-value');
const humidityValue = document.getElementById('humidity-value');
const windSpeedValue = document.getElementById('speed-value');
const visibilityValue = document.getElementById('visibility-value');
const searchBtn = document.getElementById('search-btn');
const apiKey = '247ef65274751aebf9eedb5a11b2fb94';

const icons = {
    'Clear': "./icons/sun-icon.png",
    'Clouds': "./icons/cloud-icon.png",
    'Rain': "./icons/rain-icon.png",
    'Thunderstorm': "./icons/thunder-icon.png",
    'Snow': "./icons/snow-icon.png",
    'Drizzle': "./icons/drizzle-icon.png",
    'Mist': "./icons/mist-icon.png",
    'Smoke': "./icons/smoke-icon.png",
    'Haze': "./icons/haze-icon.png",
    'Dust': "./icons/dust-icon.png",
    'Fog': "./icons/mist-icon.png",
    'Sand': "./icons/sandstorm-icon.png",
    'Ash': "./icons/sandstorm-icon.png",
    'Squall': "./icons/mist-icon.png",
    'Tornado': "./icons/hurricane-icon.png"
}

const backgroundImg = {
    'Clear': './images/clear-sky.jpg',
    'Clouds': './images/cloudy-sky.jpg',
    'Rain': './images/rain.jpg',
    'Thunderstorm': './images/thunderstorm.jpg',
    'Snow': './images/snowing.jpg',
    'Drizzle': './images/drizzle.jpg',
    'Mist': './images/mist-fog.jpg',
    'Smoke': './images/smoke.jpg',
    'Haze': './images/haze.jpg',
    'Dust': './images/dust.jpg',
    'Fog': './images/mist-fog.jpg',
    'Sand': './images/sand.jpg',
    'Ash': './images/ash.jpg',
    'Squall': './images/squall.jpg',
    'Tornado': './images/tornado.jpg'
}

searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

function handleSearch() {
    if (cityInput.value.trim() === '') {
        return;
    }

    city = cityInput.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            getWeather(data);
        })
        .catch((err) => {
            alert('Error, city not found');
        })
}

function getWeather(data) {
    const { name } = data;
    const { main, description } = data.weather[0];
    const { temp, feels_like, pressure, humidity } = data.main;
    const visibility = data.visibility;
    const { speed } = data.wind;

    const roundedTemp = roundTemps(temp);
    const roundedFeelsLikeTemp = roundTemps(feels_like);
    const visibilityInKm = meterToKilometer(visibility);
    const windSpeedInKm = msToKm(speed);

    setIconAndBackground(main);
    setData(roundedTemp, roundedFeelsLikeTemp, name, description, pressure, humidity, windSpeedInKm, visibilityInKm);
    scaleContainer(name);
}

function roundTemps(temp) {
    return Math.round(temp);
}

function meterToKilometer(meters) {
    return meters / 1000;
}

function msToKm(ms) {
    return Math.round(ms * 3.6);
}

function scaleContainer(cityName) {
    const screenWidth = window.screen.width;

    if (screenWidth > 600) {
        if (cityName.length > 10) {
            weatherContainer.style.maxWidth = '95%';
        } else if (cityName.length <= 10 && cityName.length > 6) {
            weatherContainer.style.maxWidth = '75%';
        } else if (cityName.length <= 5) {
            weatherContainer.style.maxWidth = '50%';
        }
    }
}

function setData(temp, feelsLike, city, description, pressure, humidity, windSpeed, visibility) {
    currentTemp.textContent = temp;
    feelsLikeTemp.textContent = feelsLike;
    cityName.textContent = city;
    weatherDescription.textContent = description;
    pressureValue.textContent = pressure;
    humidityValue.textContent = humidity;
    windSpeedValue.textContent = windSpeed;
    visibilityValue.textContent = visibility;
}

function setIconAndBackground(description) {
    if (icons.hasOwnProperty(description)) {
        document.getElementById('weather-icon').setAttribute('src', icons[description]);
    }

    if (backgroundImg.hasOwnProperty(description)) {
        document.getElementById('body').style.backgroundImage = `url('${backgroundImg[description]}')`;
    }
}
