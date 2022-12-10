
const api = {
    key: "6c4e5dd5b1988604be9f3087967ae19c",
    base:"https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box')

searchBox.addEventListener('keypress', setQuery)

function setQuery(evt) {
    if(evt.keyCode == 13){
        getResults(searchBox.value)
    }
}

function getResults (query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json()
    }).then(displayResults)
}

function displayResults (weather) {
    let city = document.querySelector('.location .city') 
    city.innerText = `${weather.name}, ${weather.sys.country} `

    let now = new Date()
    let date = document.querySelector('.location .date')
    date.innerText = dateBuilder(now)

    let temp = document.querySelector('.current .temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`

    let weather_el = document.querySelector('.current .weather')
    weather_el.innerText = weather.weather[0].main 

    let hilow = document.querySelector('.current .hi-low')
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`
}

function dateBuilder (d) {
    let months = ["January", "February","March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
    
    let days = ["Sunday", "Monday", "Tuesday", "wednesday", "Thursday",
    "Friday", "saturday"]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
}