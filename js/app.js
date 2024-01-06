const button = document.querySelector('#search')

const getWeather = async() => {
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

const date = weatherData.list[0].dt_txt
console.log(date)

const icon = weatherData.list[0].weather[0].icon
console.log(icon)

const temp = weatherData.list[0].main.temp
console.log(temp)

const humidity = weatherData.list[0].main.humidity
console.log(humidity)

const wind = weatherData.list[0].wind.speed
console.log(wind)

}

button.addEventListener('click', getWeather)
