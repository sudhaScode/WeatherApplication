import axios from "axios";

export const cities = [
    "Itanagar",
    "Dispur",
    "Patna",
    "Raipur",
    "Panaji",
    "Gandhinagar",
    "Chandigarh",
    "Shimla",
    "Dharamshala",
    "Ranchi",
    "Bengaluru",
    "Thiruvananthapuram",
    "Tirupati",
    "Amaravati",
    "Bhopal",
    "Mumbai",
    "Imphal",
    "Shillong",
    "Aizawl",
    "Kohima",
    "Bhubaneswar",
    "Jaipur",
    "Gangtok",
    "Chennai",
    "Hyderabad",
    "Agartala",
    "Dehradun",
    "Gairsain",
    "Lucknow"
  ];

  export const fetchAPI = async (city) => {
    if (city.toLowerCase() === "banglore" || city.toLowerCase() === "bengluru") {
        city = "Bangalore";
    }
    let URL = `https://api.weatherapi.com/v1/current.json?key=dc27acb7394c462a8a6133905240105&q=${city}`;
    //console.log("CUSTOM URL::", URL)
    try {
        const response = await axios(URL);

        if (response.status === 200) {
            // console.log("RESPONSE::", response);
            
            const data = await response.data;
            //console.log(data);
            return data;
            //const { condition, humidity, last_updated, wind_kph, temp_c, temp_f } = current;
        }
    }
    catch (error) {
        if (error.code === "ERR_BAD_REQUEST") {
            return error.message;
        }

    }
}
export const formatResponse= async(result)=>{
   // console.log("succes", result)
    if (typeof (result) === "object") {
      
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
      return city;
    }
    else {
        console.log("error")
        return result;

    }

}