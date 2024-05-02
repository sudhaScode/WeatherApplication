import React, { useState, useContext, useRef } from "react";
import styles from "./AppBar.module.css";
import { CityContext } from "../store/WeatherProvider";

import {fetchAPI} from "../constants"

function SearchBar(props) {
    const [timerId, setTimerId] = useState("");
    const cityContext = useContext(CityContext);

    const onSubmitHandler = async (event) => {
        
        event.preventDefault();
        const result = await fetchAPI(event.target.xcity.value);
        //console.log("FECTH DEBUG", typeof (result))
        cityContext.updateReq(true);
        if (typeof (result) === "object") {
            console.log("succes")
            const { current, location } = await result;
            const { condition, humidity, last_updated, wind_kph, temp_c, temp_f } = current;
            const { name, country, tz_id } = location
            // console.log(tz_id);
            const city = {
                name: name,
                country: country,
                timezone: tz_id,
                weather: {
                    temperature: {
                        celsius: temp_c,
                        fahrenheit: temp_f,
                    },
                    weatherCondition: condition.text,
                    windSpeed: wind_kph,
                    humidity: humidity,
                    cloudCoverage: condition.icon,
                    lastUpdated: last_updated
                }
            }
            cityContext.updateCity(city);
        }
        else {
            console.log("error")
            cityContext.updateCity(result);

        }
    }
    const debounce = (timerId, event) => {
        if (timerId) {
            clearTimeout(timerId);
        }
        let currentId = setTimeout(() => {
            fetchAPI(event.target.value);
            // cityContext.updateCity()
            //console.log("Debounce INPUT::", event.target.value)
        }, 500);
        setTimerId(currentId);
    }
    return (
        <div className={styles["input-container"]}>
            <form onSubmit={(event) => onSubmitHandler(event)}>
                <label htmlFor="xcity">Search</label>
                <input id ="xcity"placeholder={`${props.name}...`} name="xcity" type="text" required onChange={()=>cityContext.updateReq(false)} />
                
            </form>
        </div>
    );
}
export default SearchBar;