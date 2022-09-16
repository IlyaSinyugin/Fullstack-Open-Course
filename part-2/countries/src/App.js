import axios from "axios";
import { useState, useEffect } from "react";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise flfilled");
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toUpperCase().includes(filter.toUpperCase())
  );

  const CountriesToShow = () => {
    if (
      filter.length === 0 ||
      countries.filter((country) =>
        country.name.common.toUpperCase().includes(filter.toUpperCase())
      ).length > 10
    ) {
      return <div>Too many matches, specify another filter</div>;
    }
    if (filteredCountries.length === 1) {
      return (
        <div>
          <h3>{filteredCountries[0].name.common}</h3>
          <div>{filteredCountries[0].capital}</div>
          <div>area {filteredCountries[0].area}</div>
          <h3>Languages:</h3>
          {Object.values(filteredCountries[0].languages).map((language, id) => (
            <li key={id}>{language}</li>
          ))}
          <img src={filteredCountries[0].flags.png} alt="image not found" />
        </div>
      );
    } else {
      return filteredCountries.map((country) => (
        <div>{country.name.common}</div>
      ));
    }
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
    console.log(event.target.value);
  };

  // const personsToShow =
  // persons.length === 0
  //   ? persons
  //   : persons.filter((person) =>
  //       person.name.toUpperCase().includes(filter.toUpperCase())
  //     );

  return (
    <div>
      find countries <input onChange={handleFilter} />
      <CountriesToShow />
    </div>
  );
};

export default App;
