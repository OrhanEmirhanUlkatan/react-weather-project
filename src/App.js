/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

function App() {
  const [place, setPlace] = useState("Ankara");
  const [placeInfo, setPlaceInfo] = useState({});

  const [data, setData] = useState([]);
  const [getCountry, setCountry] = useState();
  const [getState, setState] = useState([]);
  const [selectedState, setSelectedState] = useState();
  // const URL = api_url
  // const FETCH_URL = api_url
  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const country = [...new Set(data.map((item) => item.country))];
  country.sort();

  const handleCountry = (e) => {
    let states = data.filter((state) => state.country === e.target.value);
    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();
    setState(states);
  };

  const handleState = (e) => {
    let cities = data.filter((city) => city.subcountry === e.target.value);
  };

  const handleFetch = () => {
    fetch(FETCH_URL)
      .then((response) => response.json())
      .then((data) =>
        setPlaceInfo({
          name: data.location.name,
          country: data.location.country,
          celsius: {
            current: data.current.temp_c,
            high: data.forecast.forecastday[0].day.maxtemp_c,
            low: data.forecast.forecastday[0].day.mintemp_c,
          },
          condition: data.current.condition.text,
        })
      );

    setPlace("");
  };

  return (
    <>
      <div className="app-container">
        <div className="search-input">
          <div className="cards">
            <div className="card card-1">
              <div className="input-icon">
                <div>
                  <label className="label-1">Country: </label>
                  <select onChange={(e) => handleCountry(e)}>
                    {country.map((items) => (
                      <option key={items} value={getCountry}>
                        {items}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label-1">City: </label>
                  <select
                    onChange={(e) => {
                      handleState(e);
                      setPlace(e.target.value);
                    }}
                  >
                    {getState.map((items) => (
                      <option key={items} value={selectedState}>
                        {items}
                      </option>
                    ))}
                  </select>
                </div>

                <SearchIcon
                  onClick={handleFetch}
                  fontSize="large"
                  className="search-button"
                />
              </div>
              <div className="weather-container">
                <label className="label">Temperature:</label>
                <h1>{placeInfo.celsius?.current}° C</h1>
                <div className="condition-high-low">
                  <label className="label"> Condition: </label>
                  <h1>{placeInfo.condition}</h1>
                  <label className="label"> Max Temperature: </label>
                  <h1>{placeInfo.celsius?.high}° C</h1>
                  <label className="label"> Min Temperature: </label>
                  <h1>{placeInfo.celsius?.low}° C</h1>
                </div>
                <label className="label"> Country: </label>
                <h1>
                  {placeInfo.name}, {placeInfo.country}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
