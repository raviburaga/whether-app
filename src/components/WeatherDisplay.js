import React from 'react';

const WeatherDisplay = ({ weather }) => {
  if (!weather || !weather.weather) {
    return <div className="text-red-500">Weather data is not available</div>;
  }

  const { temp, weather: weatherConditions, city_name, wind_spd, precip, pres, wind_cdir } = weather;
  const icon = weatherConditions.icon;
  const description = weatherConditions.description;
  const iconUrl = `https://www.weatherbit.io/static/img/icons/${icon}.png`;

  return (
    <div className="bg-white   p-4 rounded-lg shadow-lg  shadow-purple-600 mx-auto">
      <div className=" mx-auto">
        <h2 className='text-2xl text-center font-semibold text-purple-600'>{city_name} - Present</h2>
        <div className="flex items-center justify-between mt-4">
          <div className="text-center flex-grow">
            <img src={iconUrl} alt={description} className="mx-auto mb-2" />
            <p className="text-3xl font-semibold text-purple-600">{temp}°C</p>
            <p className="text-purple-500">{description}</p>
          </div>
          <div className="flex-grow text-lg text-purple-700">
            <p><strong>Wind:</strong> {wind_spd} km/h</p>
            <p><strong>Precip:</strong> {precip} mm</p>
            <p><strong>Pressure:</strong> {pres} mb</p>
            <p><strong>Wind Direction:</strong> {wind_cdir}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
