import React, { useState } from 'react';

const CitySelector = ({ setCity }) => {
  const [inputCity, setInputCity] = useState('');

  const handleChange = (event) => {
    setInputCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCity(inputCity);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center gap-4 mb-6 w-full max-w-md"
    >
      <input
        type="text"
        value={inputCity}
        onChange={handleChange}
        placeholder="Enter city"
        className="p-2 border-2 border-purple-300 rounded-md shadow-md w-full md:w-64 mb-2 md:mb-0 text-purple-700"
      />
      <button
        type="submit"
        className="bg-purple-600 text-white p-2 rounded-md shadow-md hover:bg-purple-700 w-full md:w-auto"
      >
        Get Weather
      </button>
    </form>
  );
};

export default CitySelector;
