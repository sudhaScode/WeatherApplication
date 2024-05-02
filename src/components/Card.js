import styles from "./Weather.module.css";

function Card({ city }) {
    const { lastUpdated, weatherCondition, cloudCoverage, temperature, windSpeed, humidity } = city.weather;
    const dateObject = new Date(lastUpdated);
    // Get the weekday name (full format)
    const weekday = dateObject.toLocaleDateString("en-US", { weekday: "long" });

    // Get hours in 12-hour format (1-12) with leading zero suppressed
    let hours = dateObject.toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
    hours = hours.split(" ");
    hours = hours[0];

    // Get minutes with leading zero
    const minutes = dateObject.getMinutes().toString().padStart(2, "0");

    // Get am/pm indicator
    const meridian = dateObject.toLocaleTimeString("en-US", { hour12: true }).slice(-2);


    // Format the output string
    const newDate = `${weekday}, ${hours}:${minutes} ${meridian}`;

    // console.log(output);
    return (
        <div className={styles.card}>
            <div className={styles.weather}>
                <div>Weather</div>
                <ul>
                    <li>{newDate}</li>
                    <li>{weatherCondition}</li>
                </ul>
            </div>
            <div className={styles.report}>
                <img src={cloudCoverage} />
                <div className={styles.temperature}>
                    <h5>{temperature.celsius}</h5>
                    <div className={styles.degree}>
                        <div></div>
                        <span>C</span>
                    </div>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.temperature}>
                    <h5>{temperature.fahrenheit}</h5>
                    <div className={styles.degree}>
                        <div></div>
                        <span>F</span>
                    </div>
                </div>
                <div className={styles.stats}>
                    <p>Humidity: {humidity}%</p>
                    <p>Wind: {windSpeed} km/h</p>
                </div>

            </div>
        </div>
    );
}

export default Card;
//  <h5>{temperature.fahrenheit}<span className={styles.degree}><div></div>F</span></h5>