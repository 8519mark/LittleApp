import './PinStyle.css'
import { MarkerF } from '@react-google-maps/api';

type props_Pin = {
    center : {
        // ubc
        lat : number,
        lng : number
    }
    text : string
}

export const Pin = (props : props_Pin) => {
    return (
        <MarkerF position={{lat : props.center.lat, lng : props.center.lng}} label={props.text}/>
    );
};