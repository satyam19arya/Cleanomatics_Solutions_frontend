import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [distance, setDistance] = useState(0);
  const [vehicleName, setVehicleName] = useState('');
  const [result, setResult] = useState(null);
  const [comparisonResults, setComparisonResults] = useState([]);

  const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

  const fetchData = useCallback(async () => {
    try{
      const response = await axios.get(`${baseUrl}/`);
      setVehicles(response.data);
    }
    catch(err){
      console.log(err);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCalculate = async () => {
    if (!vehicleName || !distance) {
      alert('Please select a vehicle and enter distance');
      return;
    }

    try{
      const response = await axios.post(`${baseUrl}/`, { vehicleName, distance });
      setResult(response.data.selectedVehicleResult);
      setComparisonResults(response.data.comparisonResults);
    }
    catch(err){
      console.log(err);
    }
  };

  return (
  <div className="p-6 bg-white rounded-lg">
    <div className="mb-4">
      <label className="block text-gray-700">Distance (km)</label>
      <input
        type="number"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Select Vehicle</label>
      {vehicles.map(vehicle => (
        <div key={vehicle.name}>
          <input
            type="radio"
            id={vehicle.name}
            name="vehicle"
            value={vehicle.name}
            onChange={(e) => setVehicleName(e.target.value)}
            className="mr-2"
          />
          <label htmlFor={vehicle.name}>{vehicle.name}</label>
        </div>
      ))}
    </div>
    <button onClick={handleCalculate} className="px-4 py-2 bg-blue-700 text-white rounded-md">Calculate Time and Fuel</button>
    {result && (
      <div className="mt-4 bg-gray-100 p-4 rounded-md">
        <p>Vehicle Name: {result.vehicleName}</p>
        <p>Time Required: {result.time} hours</p>
        <p>Fuel Needed: {result.fuelNeeded} liters</p>
        {result.isOutOfRange && <p className="text-red-500">Out of range</p>}
      </div>
    )}
      {comparisonResults.length > 0 && (
        <div className="mt-4">
          <h3 className="text-2xl font-semibold mb-6 text-center">Comparison with other vehicles</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time (hours)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fuel Needed (liters)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Out of Range</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {comparisonResults.map(result => (
                <tr key={result.vehicleName}>
                  <td className="px-6 py-4 whitespace-nowrap">{result.vehicleName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{result.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{result.fuelNeeded}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{result.isOutOfRange ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="text-sm text-gray-500 mt-2">© 2024 Cleanomatics Solutions. All rights reserved.</div>
  </div>
  )
}

export default Home;