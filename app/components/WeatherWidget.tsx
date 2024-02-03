"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";


interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: string;
    humidity: string;
    wind_kph: string;
    condition:{
      text:string;
      icon:string;
    }
  };
}

const WeatherWidget: React.FC<{}> = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const getWeatherData = async (cityName: string) => {
    try {
      const response = await axios.get<WeatherData>(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${cityName}&aqi=no`
      );
      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleGetWeather = () => {
    if (city.trim() !== "") {
      getWeatherData(city);
    }
  };

  useEffect(() => {
    // Fetch weather data for the default city (Mumbai) when the component mounts
    getWeatherData("mumbai");
  }, [city]);

  return (
    <div className="container flex items-center justify-center mx-auto p-4">
    <div className="main bg-blue-300 bg-opacity-80 rounded-lg p-8">
      <div className="flex items-center">
        <input
          className="flex-grow bg-gray-200 bg-opacity-70 rounded-full py-2 px-4"
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleCityChange}
        />
        <button
          className="bg-gray-300 ml-4 px-6 py-2 rounded-full bg-opacity-70"
          onClick={handleGetWeather}
        >
          <FaSearch className="text-gray-600" />
        </button>
      </div>

      {weatherData ? (
        <div className="parent flex flex-col items-center justify-center mt-8">
          <div className="child flex flex-col items-center justify-center">
                  <div className="mt-4">
                      <img
                        src={`http:${weatherData.current.condition.icon}`}
                        alt="Weather Icon"
                        className="w-16 h-16"
                      />
                    </div>
                  <h1 className="text-4xl font-bold text-gray-800">
                    {weatherData.current.temp_c}°C
                  </h1>
                  <h1 className="text-4xl font-bold text-gray-800">
                    {weatherData.current.condition.text}
                  </h1>

                  <h2 className="text-2xl text-gray-600">
                    {weatherData.location.name}, {weatherData.location.region},{" "}
                    {weatherData.location.country}
                  </h2>
                  <h2 className="text-2xl text-gray-600">
                    {weatherData.location.localtime}
                  </h2>
          </div>
         

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-200 p-4 rounded-lg">
              <h2 className="text-lg"><b>Humidity</b></h2>
              <p>{weatherData.current.humidity}</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg">
              <h2 className="text-lg"><b>Wind speed</b></h2>
              <p>{weatherData.current.wind_kph} Kph</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-gray-600">Loading weather data...</p>
      )}
    </div>
  </div>
  );
};

export default WeatherWidget;
