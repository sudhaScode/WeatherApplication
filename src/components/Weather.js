import React, { useContext } from "react";
import { CityContext } from "../store/WeatherProvider.js"
import styles from "./Weather.module.css";
import Card from "./Card.js";


function Weather() {
    const context = useContext(CityContext);
    const city = context.newCity;
    //console.log(city)
    return (
        <div>
            {typeof (city) !== "object" ? <h1>{city}</h1> :
                <div className={styles["location-container"]}>
                    <p>Weather at {city.name} {city.country}</p>
                    <Card city={city} />
                </div>}
        </div>
    );
}
export default Weather;