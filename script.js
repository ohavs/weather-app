
const search = document.getElementById("search")
const date = new Date()
let hour = date.getHours()
let locationText = document.getElementById("location-p")
let humitidyText = document.getElementById("humitidy-p")
let windText = document.getElementById("wind-p")
let weatherCard = document.querySelector(".weather-card")
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '6e98eb82a8mshf6bb1c0e1c8ef6cp195144jsn4c3fc61a9d10',
        'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
    }
};

async function fetchWeather() {
    let location = document.getElementById("location").value
    let response = await fetch(`https://meteostat.p.rapidapi.com/stations/hourly?station=10637&start=2023-02-21&end=2023-02-21&tz=Europe%2F${location}&units=celsius`, options)
        .then(response => response.json())
        .catch(err => error());
    if (!response.ok) {
        getWeather(response, location)
    } else {
        error()
    }

}



// search.addEventListener("click", () => {
//     let location = document.getElementById("location").value
//     fetch(`https://meteostat.p.rapidapi.com/stations/hourly?station=10637&start=2023-02-21&end=2023-02-21&tz=Europe%2F${location}&units=celsius`, options)
//         .then(response => response.json())
//         .then(response => {
//             if (response.status !== 200) {
//                 error()
//             } else {
//                 getWeather(response, location)
//             }
//         })
//         .catch(err => console.log("error"));
// })

function getWeather(response, location) {
    weatherCard.classList.remove("hide")
    let weather = response.data[hour]
    weatherCard.innerHTML = `
<div class="location">
<p id="location-p">${location}</p>
</div>
<div class="icon">
<img src="weather-icon.png" alt="" width="200px">
</div>
<div class="other-params">
<div class="moisture">
    <i class="fa-solid fa-water"></i>
    <p id="humitidy-p">${weather.dwpt}% humidity </p>
</div>
<div class="wind-speed">
    <i class="fa-solid fa-wind"></i>
    <p id="wind-p">${weather.wspd}Km/h wind speed</p>
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
    <p class="error">oops! invalid location.</p>
    </div>
`
}
