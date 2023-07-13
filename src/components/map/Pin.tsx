import './PinStyle.css'
import { MarkerF } from '@react-google-maps/api';

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

const selectedColor = '#007bff'
const notSelectedColor = '#ced4da'

const selectedIcon = {
    path : faLocationDot.icon[4] as string, fillColor: selectedColor, 
    fillOpacity: 1, anchor: new google.maps.Point(faLocationDot.icon[0] / 2, faLocationDot.icon[1]), strokeWeight: 1,
    strokeColor: "#000000", scale: 0.080
}
const notSelectedIcon = {
    path : faLocationDot.icon[4] as string, fillColor: notSelectedColor, 
    fillOpacity: 1, anchor: new google.maps.Point(faLocationDot.icon[0] / 2, faLocationDot.icon[1]), strokeWeight: 1,
    strokeColor: "#000000", scale: 0.080
}



export const Pin = (props : props_Pin) => {
    const [icon, setIcon] = useState(props.pin.selected? selectedIcon : notSelectedIcon);

    const handleSelect = () =>{
        props.doSelect(props.pin.id)
        // change to select/notSelect color here
        const newIcon = props.pin.selected ? selectedIcon : notSelectedIcon;
        setIcon(newIcon);
        console.log(newIcon.fillColor)
    }

    return (
        <MarkerF position = {props.pin.center} key = {props.pin.id} icon = {icon}
            onClick={handleSelect}/>
    );
};