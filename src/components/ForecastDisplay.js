import React, { useState } from 'react';

const ForecastDisplay = ({ forecast }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg shadow-purple-600  mt-6">
      <h2 className="text-2xl text-center font-semibold text-purple-700 mb-4">7-Day Forecast</h2>
      <div className="flex  overflow-x-auto flex justify-center  space-x-4 py-2">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-40 bg-gray-100 p-4 rounded-lg text-center cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => setSelectedDay(day)}
          >
            <p className="text-lg font-semibold text-purple-600 mb-2">
              {new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
            </p>
            <img
              src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`}
              alt={day.weather.description}
              className="mx-auto mb-2"
            />
            <p className="text-lg text-purple-600">{day.temp}°C</p>
          </div>
        ))}
      </div>

      {selectedDay && (
        <div className="bg-white p-4 rounded-lg shadow-lg shadow-purple-600 mt-6">
          <h3 className="text-xl font-bold text-purple-700 mb-2">
            Detailed Forecast for - {new Date(selectedDay.datetime).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric' })}
          </h3>
          <img
            src={`https://www.weatherbit.io/static/img/icons/${selectedDay.weather.icon}.png`}
            alt={selectedDay.weather.description}
            className="mx-auto"
          />
          <div className="text-lg text-purple-600 mb-2">
            <p><strong>Temperature:</strong> {selectedDay.temp}°C</p>
            <p><strong>Weather:</strong> {selectedDay.weather.description}</p>
            <p><strong>Humidity:</strong> {selectedDay.rh}%</p>
            <p><strong>Precipitation:</strong> {selectedDay.precip} mm</p>
            <p><strong>Pressure:</strong> {selectedDay.pres} mb</p>
            <p><strong>Wind Speed:</strong> {selectedDay.wind_spd} km/h</p>
            <p><strong>Wind Direction:</strong> {selectedDay.wind_cdir}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForecastDisplay;
