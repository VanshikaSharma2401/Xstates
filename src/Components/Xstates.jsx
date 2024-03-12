import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Xstates() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    // Fetch all countries upon component mount
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://crio-location-selector.onrender.com/countries');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
      setStates(response.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };
useEffect(()=>{
    fetchStates()
},[selectedCountry])
useEffect(()=>{
    fetchCities()
},[selectedState])
  return (
    <div>
      <label>
        Select Country:
        <select onChange={handleCountryChange} value={selectedCountry}>
          <option value="">Select Country</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </label>
      <br />
        <>
          <label>
            Select State:
            <select onChange={handleStateChange} value={selectedState}>
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </label>
          <br />
        </>
        <>
          <label>
            Select City:
            <select onChange={handleCityChange} value={selectedCity}>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </label>
          <br />
        </>
      {selectedCity && (
        <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>
      )}
    </div>
  );
}

export default Xstates;
