import React, { useRef, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import clear from "./assets/clear.jpg"; 
import humidityIcon from "./assets/humidity.webp";
import windIcon from "./assets/wind.webp"; 
import "./weather.css"; 

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(null);

    const search = async (city) => {
        if (city === "") {
            alert("please Enter city name");
            return;
        }
        try {
            const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY; 
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            const icon = clear; 
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            });
        } catch (error) {
            console.error("Error fetching weather data:", error);
            alert("Error fetching data. Please try again.");
        }
    };

    return (
        <div className='weather'>
            <div className="search-bar">
                <input type="text" placeholder='Search' ref={inputRef} />
                <span onClick={() => search(inputRef.current.value)}>
                    <FaSearch />
                </span>
            </div>
            {weatherData ? (
                <div>
                    <img src={weatherData.icon} alt="Weather Icon" className='weather-icon' />
                    <p className='temperature'>{weatherData.temperature}°C</p>
                    <p className='location'>{weatherData.location}</p>
                    <div className="weather-data">
                        <div className="col">
                            <img src={humidityIcon} alt="Humidity" />
                            <p>{weatherData.humidity}%</p>
                        </div>
                        <div className="col">
                            <img src={windIcon} alt="Wind Speed" />
                            <p>{weatherData.windSpeed} Km/h</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Please enter a city .</p>
            )}
        </div>
    );
};

export default Weather;
