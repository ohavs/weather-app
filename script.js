
const search = document.getElementById("search")
const date = new Date()
let hour = date.getHours()
let locationText = document.getElementById("location-p")
let humitidyText = document.getElementById("humitidy-p")
let windText = document.getElementById("wind-p")
let weatherCard = document.querySelector(".weather-card")
let weather

// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '6e98eb82a8mshf6bb1c0e1c8ef6cp195144jsn4c3fc61a9d10',
//         'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
//     }
// };

// async function fetchWeather() {
//     let location = document.getElementById("location").value
//     let response = await fetch(`https://meteostat.p.rapidapi.com/stations/hourly?station=10637&start=2023-02-21&end=2023-02-21&tz=Europe%2F${location}&units=celsius`, options)
//         .then(response => response.json())
//         .catch(err => error());
//     if (!response.ok) {
//         // getWeather(response, location)
//         console.log(response)
//     } else {
//         error()
//     }
// }



// function getWeather(response, location) {
//     weatherCard.classList.remove("hide")
//     weather = response.data[hour]
//     weatherCard.innerHTML = `
// <div class="location">
// <p id="location-p">${location}</p>
// </div>
// <div class="icon">
// <img src="weather-icon.png" alt="" width="200px">
// </div>
// <div class="temp">
//     <p id="temp-p">${weather.temp}° </p>
// </div>
// <div class="other-params">
// <div class="moisture">
//     <i class="fa-solid fa-water"></i>
//     <p id="humitidy-p">${weather.dwpt}% humidity </p>
// </div>
// <div class="wind-speed">
//     <i class="fa-solid fa-wind"></i>
//     <p id="wind-p">${weather.wspd}Km/h wind speed</p>
// </div>
// </div>`
// }





async function openWeather(latitude, longitude, location) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}19&lon=${longitude}&units=metric&appid=46bf3312f760d0d322705c547549b5e4`)
        .then(response => response.json())
        .catch(err => error());
    if (!response.ok) {
        console.log(response)
        getWeather(response, location)

    } else {
        error()
    }
}




async function getLocation(event) {
    event.preventDefault()
    let location = document.getElementById("location").value
    let res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=46bf3312f760d0d322705c547549b5e4`)
        .then(res => res.json())
        .catch(err => error());
    if (res.length > 0) {
        let arr = Object.values(res)
        let latitude = arr[0].lat
        let longitude = arr[0].lon
        console.log(latitude)
        console.log(longitude)
        openWeather(latitude, longitude, location)
    } else {
        error()
    }
}

function getWeather(response, location) {
    weatherCard.classList.remove("hide")

    weatherCard.innerHTML = `
<div class="location animation">
<p id="location-p">${location}</p>
</div>
<div class="icon animation">
<img src="weather-icon.png" alt="" width="200px">
</div>
<div class="temp animation">
    <p id="temp-p">${Math.floor(response.main.temp)}° </p>
    <p id="temp-feels-like">feels like ${Math.floor(response.main.feels_like)}° </p>
</div>
<div class="other-params animation">
<div class="moisture">
    <i class="fa-solid fa-water"></i>
    <p id="humidity-p">${response.main.humidity}% humidity </p>
</div>
<div class="wind-speed">
    <i class="fa-solid fa-wind"></i>
    <p id="wind-p">${response.wind.speed}Km/h wind speed</p>
</div>
</div>`
}

function error() {
    weatherCard.classList.remove("hide")
    weatherCard.innerHTML = `
    <div>
    <div class="icon">
    <img src="400 Error Bad Request-bro.png" alt="" width="200px">
</div>
    <p class="error animation">oops! invalid location.</p>
    </div>
`
}