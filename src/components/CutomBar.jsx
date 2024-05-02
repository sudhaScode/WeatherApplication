import { Fragment } from "react";
import NavBar from "./NavBar";


function CustomBar({customCities}){
    console.log(customCities)

    return(
        <Fragment>
            { customCities && customCities.map((_,index)=>(
                
                <button key={`city${index}`}>{customCities[index]}</button>
            ))}
        </Fragment>
    );

}

export default CustomBar;