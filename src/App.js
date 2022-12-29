import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const api_key = "YOUR-OWN-API-KEY";

function App() {
  const [searchTerm, setSearchTerm] = useState(''); // searchTerm is the value of the input
  const [results, setResults] = useState(null); // array of results

  function handleChange(event) {
    setSearchTerm(event.target.value); // set searchTerm to the value of the input
  }

  async function handleSubmit(event) {
    event.preventDefault(); // prevent page from refreshing
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${api_key}&units=metric`);

    const data = await response.json(); // get the data from the api
    setResults(data); // set the results to the data
  }

  return (
    <div className="container mt-5">
      <div className="mx-auto" style={{maxWidth: "500px"}}>
        <form onSubmit={handleSubmit} className="p-5">
          <div className="form-group">
            <label htmlFor="city" className="font-weight-bold">City:</label>
            <input type="text" className="form-control" id="city" value={searchTerm} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-3">Search</button>
        </form>
        {results ? (
          <div className="card mt-5 p-5">
            <div className="card-body">
              <h5 className="card-title font-weight-bold">The weather in {results.name} is currently:</h5>
              <p className="card-text">{results.main.temp} °C and {results.weather[0].description}</p>
            </div>
          </div>
        ) : (
          <p className="text-center mt-5">No results</p>
        )}
      </div>
    </div>
  );
}

export default App;
