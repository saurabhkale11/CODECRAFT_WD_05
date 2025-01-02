const apiKey = 'd78cda5cc0fe3f444aa744d8ed2acf15'; 
const weatherDisplay = document.getElementById('weatherDisplay');
const searchButton = document.getElementById('searchButton');
const locationInput = document.getElementById('locationInput');

async function fetchWeather(location) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
        );
        if (!response.ok) throw new Error('Location not found');
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherDisplay.innerHTML = `<p class="message">Error: ${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    weatherDisplay.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p class="weather-info">Temperature: ${main.temp}°C</p>
        <p class="weather-info">Humidity: ${main.humidity}%</p>
        <p class="weather-info">Condition: ${weather[0].description}</p>
    `;
}

searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeather(location);
    } else {
        weatherDisplay.innerHTML = `<p class="message">Please enter a location!</p>`;
    }
});
