require('dotenv').config();
const express      = require('express');
const path         = require('path');
const morgan       = require('morgan');
const cors         = require('cors');
const favicon      = require('serve-favicon');

// ROUTES
const routes = require('./routes/index');
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express();

// bodyparser
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());
app.use(morgan('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// static file config
app.use(express.static(path.join(__dirname, 'public')));

// routes

// @route GET /
// @desc Loads index page
app.use('/', routes);

// @route GET /weather
// @desc Takes location data from user Fetches the weather data from open weather api 
app.get('/weather', (req, res) => {
	const errorHandler = error => {
		res.status(400).send({ error });
	};

	if (!req.query.location) return errorHandler({ message: 'No location provided' });

	geocode(
		req.query.location,
		(error, { lat, lng, street, adminArea5, adminArea3, postalCode } = {}) => {
			if (error) return errorHandler(error);

			weather(lat, lng, (error, { weatherData } = {}) => {
				if (error) return errorHandler(error);

				res.send({
                    success :true,
					location: `${street} ${adminArea5}, ${adminArea3} ${postalCode}`.trim(),
					weatherData
				});
			});
		}
    );
    
    
});

app.use(function (req, res){
    res.status(400).send("Oops somehting wrong in url");
});

const port = process.env.PORT || 4000;

app.listen(port, () =>{
    console.log(`--connection open--`);
    console.log(`server running on ${port}`);
});