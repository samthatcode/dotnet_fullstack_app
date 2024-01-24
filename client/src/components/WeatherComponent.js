import React, { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';

const WeatherComponent = () => {
  const [forecasts, setForecasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('http://localhost:5185/WeatherForecast');
        const data = await response.json();
        // console.log(data);
        setForecasts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="container mx-auto p-10">
      {loading ? (
        <div className='spinner-container'>
          <FaSpinner className="spinner" />
        </div>
      ) : (
        <>     
        <div className='text-center'>
            <h1 className='md:text-2xl text-md text-indigo-500 p-10'>WeatherForecast Report</h1>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr className="">
              <th className="border border-red-600 px-4 py-2">Date</th>
              <th className="border border-green-600 px-4 py-2">Temp. (C)</th>
              <th className="border border-red-600 px-4 py-2">Temp. (F)</th>
              <th className="border border-green-600 px-4 py-2">Summary</th>
            </tr>
          </thead>
          <tbody>
            {forecasts.map((forecast) => (
              <tr key={forecast.date}>
                {/* Format the date here */}
                <td className="border text-center border-amber-900 px-4 py-2">
                  {new Date(forecast.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </td>
                <td className="border text-center border-pink-600 px-4 py-2">{forecast.temperatureC}</td>
                <td className="border text-center border-amber-900 px-4 py-2">{forecast.temperatureF}</td>
                <td className="border text-center border-pink-600 px-4 py-2">{forecast.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
      )}
    </div>
  );
};

export default WeatherComponent;
