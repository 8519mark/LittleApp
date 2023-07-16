import DirectionFacade from "./DirectionFacade";
import { useState } from "react";


type latLng = google.maps.LatLngLiteral;
type PinType = {
    id : number,
    center : latLng,
    selected : boolean,
}

type props_Directions = {
    pins : PinType[],
    doMST : (directions : google.maps.DirectionsResult[]) => void,
}

export const Directions = (props : props_Directions) => {
    const [loading, setLoading] = useState(false);
    const directionFacade = new DirectionFacade();


    const handleClick = async () => {
        try {
            setLoading(true);
            const results = await directionFacade.addVertices(props.pins, google.maps.TravelMode.DRIVING);
            props.doMST(results);
            console.log('Directions Clicked');
            console.log(results.length);
          } catch (error) {
            console.error('addVertices Error : ', error);
          } finally {
            setLoading(false);
          }
    }

    return (
        <button onClick = {handleClick}>Get Directions</button>
    )
}