import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import CitySelector from './components/CitySelector';
import HourlyForecastDisplay from './components/HourlyForecastDisplay';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { IoLogoTwitter } from 'react-icons/io';
import Logo from './assets/logo.png';

const API_KEY = '4b3d9818d47a44d4ad86b4815247c5a6';
const CURRENT_WEATHER_URL = 'https://api.weatherbit.io/v2.0/current';
const FORECAST_URL = 'https://api.weatherbit.io/v2.0/forecast/daily';
const HOURLY_URL = 'https://api.weatherbit.io/v2.0/forecast/hourly';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [city, setCity] = useState(null); // Default city is null
  const [userLocation, setUserLocation] = useState(null); // User location state

  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
      fetchForecastData(city);
      fetchHourlyData(city);
    } else if (userLocation) {
      fetchWeatherDataByCoords(userLocation.latitude, userLocation.longitude);
      fetchForecastDataByCoords(userLocation.latitude, userLocation.longitude);
      fetchHourlyDataByCoords(userLocation.latitude, userLocation.longitude);
    } else {
      getUserLocation();
    }
  }, [city, userLocation]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          
        },
       
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(CURRENT_WEATHER_URL, {
        params: {
          city: city,
          key: API_KEY,
        },
      });
      console.log(response.data);
      setWeatherData(response.data.data[0]);
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  const fetchForecastData = async (city) => {
    try {
      const response = await axios.get(FORECAST_URL, {
        params: {
          city: city,
          key: API_KEY,
          days: 7,
        },
      });
      setForecastData(response.data.data);
    } catch (error) {
      console.error('Error fetching forecast data', error);
    }
  };

  const fetchHourlyData = async (city) => {
    try {
      const response = await axios.get(HOURLY_URL, {
        params: {
          city: city,
          key: API_KEY,
          hours: 24,
        },
      });
      console.log(response.data);
      setHourlyData(response.data.data);
    } catch (error) {
      console.error('Error fetching hourly data', error);
    }
  };

  const fetchWeatherDataByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(CURRENT_WEATHER_URL, {
        params: {
          lat: lat,
          lon: lon,
          key: API_KEY,
        },
      });
      console.log(response.data);
      setWeatherData(response.data.data[0]);
      setCity(response.data.data[0].city_name); // Set city name based on coordinates
    } catch (error) {
      console.error('Error fetching weather data by coordinates', error);
    }
  };

  const fetchForecastDataByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(FORECAST_URL, {
        params: {
          lat: lat,
          lon: lon,
          key: API_KEY,
          days: 7,
        },
      });
      setForecastData(response.data.data);
    } catch (error) {
      console.error('Error fetching forecast data by coordinates', error);
    }
  };

  const fetchHourlyDataByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(HOURLY_URL, {
        params: {
          lat: lat,
          lon: lon,
          key: API_KEY,
          hours: 24,
        },
      });
      setHourlyData(response.data.data);
    } catch (error) {
      console.error('Error fetching hourly data by coordinates', error);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center p-4">
      <header className="w-full bg-purple-700 text-white py-4 px-6 rounded-lg shadow-lg shadow-purple-500">
        <h1 className="text-4xl font-bold text-center my-4">Weather - Ravi Buraga</h1>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="text-white text-3xl font-semibold mb-4 md:mb-0 md:mr-4 text-center md:text-left">
            {city || 'Fetching your location...'}
          </div>
          <CitySelector setCity={setCity} />
        </div>
      </header>
      <main className="mt-6 w-full">
        {weatherData && <WeatherDisplay weather={weatherData} />}
        {hourlyData && <HourlyForecastDisplay hourly={hourlyData} />}
        {forecastData && <ForecastDisplay forecast={forecastData} />}
      </main>
      {/* Footer */}
      <footer className="bg-purple-700 text-white p-6 flex flex-col md:flex-row md:justify-between items-center rounded-lg shadow-lg shadow-purple-500 mt-6 w-full">
        {/* Left Section */}
        <div className="flex flex-row items-center md:items-start space-y-4 md:space-y-0 md:flex-row md:space-x-8">
          <img src={Logo} alt="Logo" className="w-16 h-16 md:w-24 md:h-24 mb-2 md:mb-0" />
          <div className="text-xl flex flex-row items-center justify-center font-bold">Event Planner</div> 
        </div>

        {/* Center Section */}
        <div className="flex flex-col md:flex-row md:space-x-12 space-y-4 md:space-y-0 mt-4 md:mt-0">
          <div className="flex flex-col space-y-2">
            <div className="font-bold">Contact Us</div>
            <a href="mailto:buragaravi2002@gmail.com" className="hover:text-purple-300 transition duration-300">Email: buragaravi2002@gmail.com</a>
            <a href="tel:+919010462357" className="hover:text-purple-300 transition duration-300">Phone: +91 9010462357</a>
            <div className="flex flex-row m-4 space-x-4">
              <a href="https://www.facebook.com/pandu.bujji.50159/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition duration-300">
                <FaFacebookF />
              </a>
              <a href="https://x.com/RaviBuraga" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition duration-300">
                <IoLogoTwitter />
              </a>
              <a href="https://www.instagram.com/r_o_y_a_l_s_u_n" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition duration-300">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/in/ravi-buraga-54b0bb280" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition duration-300">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="font-bold">Our Other Apps</div>
            <a href="#" className="hover:text-purple-300 transition duration-300">Recipe App</a>
            <a href="https://expense-tracker-ravi.vercel.app/" className="hover:text-purple-300 transition duration-300">Expense Tracker</a>
            <a href="https://translator-ravi.vercel.app/" className="hover:text-purple-300 transition duration-300">Translator</a>
            <a href="https://event-planner-ravi.vercel.app/" className="hover:text-purple-300 transition duration-300">Event Planner</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
