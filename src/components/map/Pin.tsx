import './PinStyle.css'
import { Marker } from '@react-google-maps/api';

import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


type latLng = google.maps.LatLngLiteral;
type PinType = {
    id : number
    center : latLng,
    selected : boolean,
}

type props_Pin = {
    pin : PinType
    doSelect : (id : number) => void
}

const selectedColor = '#ff0000'
const notSelectedColor = '#ced4da'



export const Pin = (props : props_Pin) => {
    const [color, setColor] = useState(props.pin.selected? '#007bff' : '#ced4da');

    const handleSelect = () =>{
        props.doSelect(props.pin.id)
        // change to select/notSelect color here
        const newColor = props.pin.selected ? selectedColor : notSelectedColor;
        setColor(newColor);
        // console.log(newColor)
    }

    return (
        <Marker position = {props.pin.center} key = {props.pin.id} icon = {{path : faLocationDot.icon[4] as string, 
            fillColor: color, 
            fillOpacity: 1, anchor: new google.maps.Point(faLocationDot.icon[0] / 2, faLocationDot.icon[1]), strokeWeight: 1,
            strokeColor: "#000000", scale: 0.080
        }}
            onClick={handleSelect}/>
    );
};