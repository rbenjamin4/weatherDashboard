const userInput = document.querySelector('#input')
const button = document.querySelector('#search')

const getWeather = async () => {
    const APIKey = 'b392aae0fde35000c51596ef36233a2f'
    const cityName = document.querySelector('#input')

    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName.value}&limit=1&appid=${APIKey}`)
    const cityData = await response.json()
    console.log(cityData)

    const long = cityData[0].lon
    const lat = cityData[0].lat

    console.log(long)
    console.log(lat)

    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${APIKey}&units=imperial`)
    const weatherData = await weatherResponse.json()
    console.log(weatherData)

    const currentWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKey}&units=imperial`)
    const currentData = await currentWeather.json()
    console.log(currentData)

    let weatherRow = document.querySelector('.weather')
    let resultsContainer = document.getElementById('results-container')
    let dateRow = document.getElementById('date-row')
    let iconRow = document.getElementById('icon-row')
    let tempRow = document.getElementById('temp-row')
    let humidityRow = document.getElementById('humidity-row')
    let windRow = document.getElementById('wind-row')
    let currentDateRow = document.getElementById('current-date-row')
    let currentIconRow = document.getElementById('current-icon-row')
    let currentTempRow = document.getElementById('current-temp-row')
    let currentHumidityRow = document.getElementById('current-humidity-row')
    let currentWindRow = document.getElementById('current-wind-row')
    let currentCityRow = document.getElementById('current-city-row')

const currentCityName = userInput.value
let cityDiv = document.createElement('div')
let cityEl = document.createElement('h2')
cityEl.textContent = currentCityName.toUpperCase()
cityDiv.appendChild(cityEl)
currentCityRow.appendChild(cityDiv)


const currentDate = currentData.dt
console.log(currentDate)
let currentDateDiv = document.createElement('div')
currentDateDiv.className = 'col-9'
let currentDateEl = document.createElement('p')
currentDateEl.textContent = 'Today'
currentDateDiv.appendChild(currentDateEl)
currentDateRow.appendChild(currentDateDiv)


const currentIcon = currentData.weather[0].icon
console.log(currentIcon)
let currentIconDiv = document.createElement('div')
currentIconDiv.className = 'col-9'
let currentIconEl = document.createElement('img')
currentIconEl.src = `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`
currentIconDiv.appendChild(currentIconEl)
currentIconRow.appendChild(currentIconDiv)

const currentTemp = currentData.main.temp
console.log(currentTemp)
let currentTempDiv = document.createElement('div')
currentTempDiv.className = 'col-9'
let currentTempEl = document.createElement('p')
currentTempEl.textContent = 'Temp: ' + currentData.main.temp + ' °F'
currentTempDiv.appendChild(currentTempEl)
currentTempRow.appendChild(currentTempDiv)

const currentHumidity = currentData.main.humidity
console.log(currentHumidity)
let currentHumidityDiv = document.createElement('div')
currentHumidityDiv.className = 'col-9'
let currentHumidityEl = document.createElement('p')
currentHumidityEl.textContent = 'Humidity: ' + currentData.main.humidity + '%'
currentHumidityDiv.appendChild(currentHumidityEl)
currentHumidityRow.appendChild(currentHumidityDiv)

const currentWind = currentData.wind.speed
console.log(currentWind)
let currentWindDiv = document.createElement('div')
currentWindDiv.className = 'col-9'
let currentWindEl = document.createElement('p')
currentWindEl.textContent = 'Wind: ' + currentData.wind.speed + ' mph'
currentWindDiv.appendChild(currentWindEl)
currentWindRow.appendChild(currentWindDiv)

    for (let i = 3; i < weatherData.list.length; i += 8) {
        // console.log(weatherData.list[i].dt_txt)

        // Create a new column div for each result
        let columnDiv = document.createElement('div')
        columnDiv.className = 'col-sm-2' // Adjust the column size based on your layout needs

        // Create a new element to hold each result (e.g., a paragraph)
        let resultElement = document.createElement('p')

        // Set the text content of the element to the current result
        resultElement.textContent = weatherData.list[i].dt_txt

        // Append the result element to the column
        columnDiv.appendChild(resultElement)

        // Append the column to the row
        dateRow.appendChild(columnDiv)
    }

    for (let i = 3; i < weatherData.list.length; i += 8) {
        // console.log(weatherData.list[i].weather[0].icon)

        let columnDiv = document.createElement('div')
        columnDiv.className = 'col-sm-2' // Adjust the column size based on your layout needs

        // Create a new element to hold each result (e.g., a paragraph)
        let resultElement = document.createElement('img')
        resultElement.src = `https://openweathermap.org/img/wn/${weatherData.list[i].weather[0].icon}@2x.png`

        // Set the text content of the element to the current result
        // resultElement.textContent = weatherData.list[i].weather[0].icon

        // Append the result element to the column
        columnDiv.appendChild(resultElement)

        // Append the column to the row
        iconRow.appendChild(columnDiv)
    }

    for (let i = 3; i < weatherData.list.length; i += 8) {
        // console.log(weatherData.list[i].main.temp)

        let columnDiv = document.createElement('div')
        columnDiv.className = 'col-sm-2' // Adjust the column size based on your layout needs

        // Create a new element to hold each result (e.g., a paragraph)
        let resultElement = document.createElement('p')    

        // Set the text content of the element to the current result
        resultElement.textContent = 'Temp: ' + weatherData.list[i].main.temp + ' °F'

        // Append the result element to the column
        columnDiv.appendChild(resultElement)

        // Append the column to the row
        tempRow.appendChild(columnDiv)
    }

    for (let i = 3; i < weatherData.list.length; i += 8) {
        // console.log(weatherData.list[i].main.humidity)

        let columnDiv = document.createElement('div')
        columnDiv.className = 'col-sm-2' // Adjust the column size based on your layout needs

        // Create a new element to hold each result (e.g., a paragraph)
        let resultElement = document.createElement('p')

        // Set the text content of the element to the current result
        resultElement.textContent = 'Humidity: ' + weatherData.list[i].main.humidity + '%'

        // Append the result element to the column
        columnDiv.appendChild(resultElement)

        // Append the column to the row
        humidityRow.appendChild(columnDiv)
    }

    for (let i = 3; i < weatherData.list.length; i += 8) {
        // console.log(weatherData.list[i].wind.speed)

        let columnDiv = document.createElement('div')
        columnDiv.className = 'col-sm-2' // Adjust the column size based on your layout needs

        // Create a new element to hold each result (e.g., a paragraph)
        let resultElement = document.createElement('p')

        // Set the text content of the element to the current result
        resultElement.textContent = 'Wind: ' + weatherData.list[i].wind.speed + ' mph'

        // Append the result element to the column
        columnDiv.appendChild(resultElement)

        // Append the column to the row
        windRow.appendChild(columnDiv)
    }

    userInput.value = ''

}

button.addEventListener('click', getWeather)
