import React, { useState, useEffect, useRef, useContext } from "react";
import { cities, fetchAPI, formatResponse } from "../constants";
import styles from "./NavBar.module.css";
//import CustomBar from "./CutomBar";
import { CityContext } from "../store/WeatherProvider";
import { Fragment } from "react";

let start = [];
for (let i = 0; i < 10; i++) {
    //console.log("PUSHED", cities[i])
    start.push(cities[i]);
}

function NavBar() {
    const [customCities, setCutomCities] = useState([...start]);
    const prevRef = useRef(null);
    const context = useContext(CityContext);
    const [active, setActive] = useState(0);
    const[size, setSize] = useState(cities.length);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    function getCurrentCity() {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetch(`https://api.weatherapi.com/v1/current.json?key=dc27acb7394c462a8a6133905240105&q=${latitude},${longitude}`) // Replace with your OpenWeatherMap API key
                .then(response => response.json())
                .then(data => {
                    //console.log("Current nearby city:", data.location.name);
                    context.updateLocation(data.location.name);
                })
                .catch(error => console.error("Error fetching city:", error));
        }, (error) => {
            console.error("Error getting geolocation:", error);
        })
    }

    const fetchCityWeather = async () => {
        getCurrentCity()
        //console.log(context.currentLocation)
    } 

    //console.log(customCities)
    const nextHandler = async() => {
        context. updateReq(false);
        const cityname = customCities[active]
        //console.log("CURRENT CITIES:: ",cityname);
        console.log("ACTIVE::", active)
        if(active <=9){
            setActive((prevState)=>prevState+1);
            setSize((prevSize)=>prevSize-1);
        }
        if (active === 9 && size>1) {
            setActive(9);

            const firstElement = cities.findIndex((name) => name === customCities[0]);
            const lastElement = cities.findIndex((name) => name === customCities[customCities.length - 1]);
            //console.log("INDEX:: ",firstElement+1, lastElement+2);
            //let range = Math.floor(Math.random()*2);
            let newList = cities.slice(firstElement + 1, lastElement + 2)
            setCutomCities(newList);
        }
        
        //onClickHandler(active)

    }
    const prevHandler = async() => {
        context. updateReq(false);
        //console.log("ACTIVE::", active-1)
       //console.log("CURRENT CITIES:: ",customCities);
        //setActive((prevState)=>prevState-1);
        if(active >0){
            setActive((prevState)=>prevState-1);
        }
        setSize((prevSize)=>prevSize+1);
        if (active ===0 && size<=28) {
            setActive(0);
            const firstElement = cities.findIndex((name) => name === customCities[0]);
            const lastElement = cities.findIndex((name) => name === customCities[customCities.length - 1]);
           // console.log("INDEX:: ",firstElement+1, lastElement+2);
            //let range = Math.floor(Math.random()*2);
            let newList = cities.slice(firstElement-1, lastElement)
           // console.log("UPDATED::",newList)
            setCutomCities(newList);
            
        }
    }
    const onClickHandler = async (index) => {
        setActive(index);
        setIsLoading(true);
        const fetchcity = customCities[index];
        const result = await fetchAPI(fetchcity);
        const city=await formatResponse(result);
        //console.log("formatted",city)
        context.updateCity(city);
        context. updateReq(true);
        setIsLoading(false);
    }
    const userEvents = async(fetchcity)=>{
        console.log(fetchcity)
        setIsLoading(true);
        const result = await fetchAPI(fetchcity);
        const city=await formatResponse(result);
        //console.log("formatted",city)
        context.updateCity(city);
        context. updateReq(true);
        setIsLoading(false);

    }
    useEffect(()=>{
       setIsDisabled(active===0);
      // console.log("ACTIVE::", active)
       const fetchcity = customCities[active];
       userEvents(fetchcity)

    },[active,size]);

    useEffect(() => {
        //getCurrentCity();
        //fetchCityWeather();
        //console.log(customCities[active])
        onClickHandler(active);
    }, [])

    return (
        <Fragment>
            {isLoading && <h1 className={styles.loader}>Fetching...</h1>}
        {!isLoading &&<div className={styles["city-container"]}>
            <button key={"prev"}  onClick={prevHandler} ref={prevRef} disabled={size===29 && active==0}  className={styles.navigation}>{"<<"}</button>
            {customCities && customCities.map((name, index) => (

                <button key={`city${index}`} onClick={()=>onClickHandler(index)} className={index === active?styles["city-button-active"]:styles["city-button"]} name={name}>{name}</button>
            ))}
            <button name="spread" key="spread">...</button>
            <button key="size">{size}</button>
            <button onClick={nextHandler} key="next" disabled={size<2 && active===9} className={styles.navigation}>{">>"}</button>
        </div>}
        </Fragment>
    );

}
export default NavBar;