import { CityContext } from "../store/WeatherProvider.js"
import styles from "./Weather.module.css";
import Card from "./Card.js";
import React, { useState, useEffect, useRef, useContext } from "react";
import { fetchAPI, formatResponse } from "../constants";


function CurrentCity() {
    const [city, setCity] = useState({});
    const context = useContext(CityContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const name = context.currentLocation;
    //console.log(city)

    const locationEvents = async(fetchcity)=>{
        //console.log(fetchcity)
        const result = await fetchAPI(fetchcity);
        const newCity =await formatResponse(result);
        //console.log("formatted",city)
        setCity(newCity)
        setIsLoaded(true);

    }
    useEffect(()=>{
       // console.log("DEBUG::",city)
       locationEvents(name)

    },[]);
    return (
        <div className={styles["location-container"]}>
            <p className={styles.title}>Weather at Current City: {name}</p>
            {isLoaded && <Card city={city}/>}
        </div>

    );
}
export default CurrentCity;