import React, { useContext } from "react";
import styles from './AppBar.module.css';
import { CityContext } from "../store/WeatherProvider"

function AppBar() {
    const cityContext = useContext(CityContext);
    const name = cityContext.newCity.name;
    return (
        <div className={styles.header}>
            <div className={styles.content}>
                <h1>Weather React</h1>
                <a href={name ? `https://www.google.com/search?q=${name}` : "#"} className={styles.explore} target="_blank">Explore {name ? name : "city"}</a>
            </div>
        </div>
    );
}

export default AppBar;