import React, { useState, useEffect } from 'react';
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import './App.css';
import InfoBox from './InfoBox';
import Table from './Table';
// import LineGraph from './LineGraph';
import { sortData } from './util.js';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  // This will show the worldwide cases by default when the page loads
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data)
      });
  }, []);

  // This will fetch all the list of the countries
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  /* This function will grab the country onClick and will show all 
     the relevant data or will show worldwide statistics by default */
  const onCountryChange = async (event) => {
    let countryCode = event.target.value;

    const url = countryCode === 'worldwide' ?
      'https://disease.sh/v3/covid-19/all' :
      `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);

        setCountryInfo(data);
      });
  };

  return (
    <div className="App">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }

            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox className="infoBox__cases cases" title="CoronaVirus cases" total={countryInfo.cases} cases={countryInfo.todayCases} />
          <InfoBox className="recovered" title="Recoveries" total={countryInfo.recovered} cases={countryInfo.todayRecovered} />
          <InfoBox className="deaths" title="Deaths" total={countryInfo.deaths} cases={countryInfo.todayDeaths} />
        </div>

      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
          {/* Table */}

        </CardContent>
      </Card>
    </div>
  );
}

export default App;
