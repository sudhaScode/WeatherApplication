import "./styles.css";
import AppBar from "./components/AppBar";
import SearchBar from "./components/SearchBar";
import Weather from "./components/Weather"
import React, { useContext } from "react";
import { CityContext } from "./store/WeatherProvider"
import NavBar from "./components/NavBar";

export default function App() {
  const cityContext = useContext(CityContext);
  const check = cityContext.req;
  //console.log("Fectching::", check)
  return (
    <div className="App">
      <AppBar />
      <main>
        <SearchBar name="Enter city" />
        <NavBar/>
        {check && <Weather />}
      </main>
    </div>
  );
}
