import { createContext, useState } from "react";

export const CityContext = createContext();
const request = false;
const city = {
    name: "",
    country: "",
    timezone: "",
    weather: {
        temparature: {
            celcius: "",
            fahrenheit: ""
        },
        weatherConditions: "",
        windSpeed: "",
        humidity: "",
        cloudCoverage: "",
        lastUpdated: ""
    }
}
function WeatherProvider({ children }) {
    const [newCity, setXcity] = useState(city);
    const [req, setReq] = useState(request);
    const [currentLocation, setCurrentLocation]=useState('')
    const updateCity = (newcity) => {
        // console.log("UPDATE CITY::", "triggred")
        setXcity(newcity);
    }
    const updateReq =(onReq)=>{
    setReq(onReq);
    }
    const updateLocation=(location)=>{
        setCurrentLocation(location);
    }
    return (
        <CityContext.Provider value={{ newCity, updateCity, req, updateReq, currentLocation, updateLocation }}>
            {children}
        </ CityContext.Provider>
    );

}
export default WeatherProvider;