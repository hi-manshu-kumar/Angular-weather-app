const dotenv = require('dotenv');
const weatherKey = process.env.WEATHER_API_KEY;
const axios = require('axios');
const dates= require('./dates');

const weather = (lat, lng, callback) => {
	const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${weatherKey}`;
	console.log(url)
	axios
		.get(url)
		.then(response => {
			const {data} = response;
			weatherJson = data;
			var weatherArray = [];
			for(var i = 2; i < weatherJson.list.length; i+=7)
			{	

			  var loopObject = {
					temperature: Math.round(weatherJson.list[i].main.temp - 273.15),             //Sets the values taken from the API query
					description: weatherJson.list[i].weather[0].main,
					pressure   : weatherJson.list[i].main.pressure,
					humidity   : weatherJson.list[i].main.humidity,
					icon       : weatherJson.list[i].weather[0].icon,
					date       : dates.dayOfWeek(new Date(weatherJson.list[i].dt_txt).getDay())
				}
				
			  weatherArray.push(loopObject);
			}

			var weather = { //Gets accurate current weather
				temperature: Math.round(weatherJson.list[0].main.temp - 273.15),
				pressure   : weatherJson.list[0].main.pressure,
				humidity   : weatherJson.list[0].main.humidity,
				description: weatherJson.list[0].weather[0].main,
				icon       : weatherJson.list[0].weather[0].icon
			};
	  
			var weatherData = {weather: weather, weatherArray: weatherArray}; //Prepares data for ejs file.
			
			callback(undefined, {weatherData});
		})
		.catch(error => {
			console.log(error);
			if (error.code === 'ENOTFOUND') {
				callback({ message: 'Unable to connect to servers. Please try again later.' }, undefined);
			} else if (error.response.status === 400) {
				callback({ message: 'Invalid input. Please try again.' }, undefined);
			} else {
				callback({ message: error.message }, undefined);
			}
		});
};

module.exports = weather;
