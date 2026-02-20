const apiKey = "f81e73e537c6869e5eeea7fa53265542";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        // Proper error handling
        if (data.cod != 200) {
            alert("City not found!");
            return;
        }

        // Update UI
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Change weather icon
        const weatherMain = data.weather[0].main;

        if (weatherMain === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } 
        else if (weatherMain === "Clear") {
            weatherIcon.src = "images/clear.png";
        } 
        else if (weatherMain === "Rain") {
            weatherIcon.src = "images/rain.png";
        } 
        else if (weatherMain === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } 
        else if (weatherMain === "Mist") {
            weatherIcon.src = "images/mist.png";
        } 
        else if (weatherMain === "Snow") {
            weatherIcon.src = "images/snow.png";
        }

    } catch (error) {
        alert("Something went wrong!");
        console.log(error);
    }
}

// Search button click
searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() !== "") {
        checkWeather(searchBox.value.trim());
    }
});

// Enter key search
searchBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkWeather(searchBox.value.trim());
    }
});