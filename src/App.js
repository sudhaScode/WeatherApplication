import "./styles.css";
import AppBar from "./components/AppBar";
import SearchBar from "./components/SearchBar";
import Weather from "./components/Weather"
import React, { useContext } from "react";
import { CityContext } from "./store/WeatherProvider"
import NavBar from "./components/NavBar";
import CurrentCity from "./components/CurrentCity";

export default function App() {
  const cityContext = useContext(CityContext);
  const check = cityContext.req;
  const location = cityContext.currentLocation;
  console.log("Fectching::", location)
  return (
    <div className="App">
      <AppBar />
      <main>
        <SearchBar name="Enter city" />
        <NavBar/>
        {check && <Weather />}
        
        {location &&<> 
        <CurrentCity/></>}
      </main>
    </div>
  );
}
