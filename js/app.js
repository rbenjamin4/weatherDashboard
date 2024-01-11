const userInput = document.querySelector('#input')
const button = document.querySelector('#search')
const results = document.querySelector('#results-container')

// Save and display city search names to new buttons
const cityButton = () => {
    let citySearchEl = document.getElementById('past-search')
    let old_city = JSON.parse(localStorage.getItem('data'))
    citySearchEl.innerHTML = ''
    
    if(old_city) {

    for (let i = 0; i < old_city.length; i++) {
        let cityButtonEl = document.createElement('button')
        cityButtonEl.className = 'btn btn-secondary m-3'
        cityButtonEl.textContent = old_city[i]
        cityButtonEl.classList.add('citySearchButton')
        cityButtonEl.addEventListener('click', function (event) {
            let city = event.target.textContent
            getForecast(city)
        })
        citySearchEl.append(cityButtonEl)
    }
}
}

cityButton()

// Search by city
const getSearch = async () => {
    const cityName = document.querySelector('#input')
    getForecast(cityName.value)

    // Add city to local storage
    const addCity = (newCity) => {

        if (localStorage.getItem('data') == null) {
            localStorage.setItem('data', '[]')
        }

        let old_city = JSON.parse(localStorage.getItem('data'))
        if (old_city.indexOf(newCity) === -1) {


            old_city.push(newCity)

            localStorage.setItem('data', JSON.stringify(old_city))
            cityButton()
        }
    }

    addCity(cityName.value)
}

// Function to obtain weather forecast data from API
const getForecast = async (cityName) => {

    const APIKey = 'b392aae0fde35000c51596ef36233a2f'

    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIKey}`)
    const cityData = await response.json()

    const long = cityData[0].lon
    const lat = cityData[0].lat

    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${APIKey}&units=imperial`)
    const weatherData = await weatherResponse.json()

    const currentWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKey}&units=imperial`)
    const currentData = await currentWeather.json()

    // Select elements by ID
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

    // Populate city name on page
    currentCityRow.textContent = cityName

    // Populate today
    const currentDate = currentData.dt
    let currentDateDiv = document.createElement('div')
    currentDateDiv.className = 'col-9'
    let currentDateEl = document.createElement('h3')
    currentDateEl.textContent = 'Today'
    currentDateDiv.appendChild(currentDateEl)
    currentDateRow.innerHTML = ""
    currentDateRow.appendChild(currentDateDiv)

    // Populate weather icons
    const currentIcon = currentData.weather[0].icon
    console.log(currentIcon)
    let currentIconDiv = document.createElement('div')
    currentIconDiv.className = 'col-9'
    let currentIconEl = document.createElement('img')
    currentIconEl.src = `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`
    currentIconDiv.appendChild(currentIconEl)
    currentIconRow.innerHTML = ""
    currentIconRow.appendChild(currentIconDiv)

    // Populate temp data
    const currentTemp = currentData.main.temp
    console.log(currentTemp)
    let currentTempDiv = document.createElement('div')
    currentTempDiv.className = 'col-9'
    let currentTempEl = document.createElement('p')
    currentTempEl.textContent = 'Temp: ' + currentData.main.temp + ' °F'
    currentTempDiv.appendChild(currentTempEl)
    currentTempRow.innerHTML = ""
    currentTempRow.appendChild(currentTempDiv)

    //Populate humidity data
    const currentHumidity = currentData.main.humidity
    console.log(currentHumidity)
    let currentHumidityDiv = document.createElement('div')
    currentHumidityDiv.className = 'col-9'
    let currentHumidityEl = document.createElement('p')
    currentHumidityEl.textContent = 'Humidity: ' + currentData.main.humidity + '%'
    currentHumidityDiv.appendChild(currentHumidityEl)
    currentHumidityRow.innerHTML = ""
    currentHumidityRow.appendChild(currentHumidityDiv)

    // Populate wind speed data
    const currentWind = currentData.wind.speed
    console.log(currentWind)
    let currentWindDiv = document.createElement('div')
    currentWindDiv.className = 'col-9'
    let currentWindEl = document.createElement('p')
    currentWindEl.textContent = 'Wind: ' + currentData.wind.speed + ' mph'
    currentWindDiv.appendChild(currentWindEl)
    currentWindRow.innerHTML = ""
    currentWindRow.appendChild(currentWindDiv)

    // Clear divs 
    dateRow.innerHTML = ""
    tempRow.innerHTML = ""
    iconRow.innerHTML = ""
    humidityRow.innerHTML = ""
    windRow.innerHTML = ""

    // Get weather data for each day of the 5 day forecast and put on page
    for (let i = 1; i < weatherData.list.length; i += 8) {

        // Create a new column div for each result
        let columnDiv1 = document.createElement('div')
        columnDiv1.className = 'col-sm-2' // Adjust the column size 

        // Create a new element to hold each result 
        let resultElement1 = document.createElement('h4')

        const date = new Date(weatherData.list[i].dt * 1000)
        const formatDate = date.toLocaleDateString('en-US')

        // Set the text content of the element to the current result
        resultElement1.textContent = formatDate

        // Append the result element to the column
        columnDiv1.appendChild(resultElement1)

        // Append the column to the row
        dateRow.appendChild(columnDiv1)


        let columnDiv2 = document.createElement('div')
        columnDiv2.className = 'col-sm-2' // Adjust the column size 

        // Create a new element to hold each result 
        let resultElement2 = document.createElement('img')
        resultElement2.src = `https://openweathermap.org/img/wn/${weatherData.list[i].weather[0].icon}@2x.png`

        // Append the result element to the column
        columnDiv2.appendChild(resultElement2)

        // Append the column to the row
        iconRow.appendChild(columnDiv2)


        let columnDiv3 = document.createElement('div')
        columnDiv3.className = 'col-sm-2' // Adjust the column size 

        // Create a new element to hold each result
        let resultElement3 = document.createElement('p')

        // Set the text content of the element to the current result
        resultElement3.textContent = 'Temp: ' + weatherData.list[i].main.temp + ' °F'

        // Append the result element to the column
        columnDiv3.appendChild(resultElement3)

        // Append the column to the row
        tempRow.appendChild(columnDiv3)


        let columnDiv4 = document.createElement('div')
        columnDiv4.className = 'col-sm-2' // Adjust the column size 

        // Create a new element to hold each result 
        let resultElement4 = document.createElement('p')

        // Set the text content of the element to the current result
        resultElement4.textContent = 'Humidity: ' + weatherData.list[i].main.humidity + '%'

        // Append the result element to the column
        columnDiv4.appendChild(resultElement4)

        // Append the column to the row
        humidityRow.appendChild(columnDiv4)


        let columnDiv5 = document.createElement('div')
        columnDiv5.className = 'col-sm-2' // Adjust the column size 

        // Create a new paragraph
        let resultElement5 = document.createElement('p')

        // Set the text content of the element to the current result
        resultElement5.textContent = 'Wind: ' + weatherData.list[i].wind.speed + ' mph'

        // Append the result element to the column
        columnDiv5.appendChild(resultElement5)

        // Append the column to the row
        windRow.appendChild(columnDiv5)
    }

    userInput.value = ''

}


button.addEventListener('click', getSearch)


