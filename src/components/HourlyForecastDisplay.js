import React from 'react';

const HourlyForecastDisplay = ({ hourly }) => {
  const currentTime = new Date().getHours();

  // Filter out hours earlier than the current time
  const filteredHourly = hourly.filter(hour => parseInt(hour.datetime.slice(11, 13)) >= currentTime);

  return (
    <div className="bg-white p-4 rounded-lg  shadow-lg shadow-purple-600 mt-6 mx-auto">
      <h2 className="text-xl font-bold text-center text-purple-700 mb-4">Hourly Forecast</h2>
      <div className="flex overflow-x-auto flex justify-center  space-x-2 py-2">
        {filteredHourly.slice(0, 12).map((hour, index) => (
          <div key={index} className="flex-shrink-0 w-20 text-center">
            <p className="text-sm font-semibold text-purple-600">{hour.datetime.slice(11, 16)}</p>
            <img
              src={`https://www.weatherbit.io/static/img/icons/${hour.weather.icon}.png`}
              alt={hour.weather.description}
              className="mx-auto mb-1"
            />
            <p className="text-sm text-purple-600">{hour.temp}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecastDisplay;
