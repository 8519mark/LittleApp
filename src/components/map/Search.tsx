import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from '@reach/combobox'
import "@reach/combobox/styles.css";

import { useState } from 'react'
import { MarkerF } from "@react-google-maps/api";

type latLng = google.maps.LatLngLiteral;

type props_Search = {
    search : (position : latLng) => void,
    pins : latLng[],
    addPin : (pins : latLng[]) => void
}
// interface autoData {
//     description : string,   // name, text of such place
//     // match_substrings : Array<PredictionSubstring>    PredictionSubstring = {length : number, offset : number}
//     place_id : string       // id used to retrieve such place
//     // ...
// }

export const Search = (props : props_Search) => {
    // keep track of the pin to add, avoid double click redundancy with previous state
    const [current, setCurrent] = useState<latLng | undefined>(undefined);
    const [previous, setPrevious] = useState<latLng | undefined>(undefined);

    const {
        ready,              // data ready or not
        value,              // USER input
        setValue,           // set value of the USER input
        suggestions : {     // 
            status,         // status of the API in 'string' :  'OK', 'NOT_FOUND', 'INVALID_REQUEST' ... etc.
            data},          // a data array with type : google.maps.places.AutocompletePrediction[], see type above
        clearSuggestions    // clear all suggestions when called 
    } = usePlacesAutocomplete();

    // console.log(status, data);

    const handleInput = (e : any) => {
        setValue(e.target.value);
    };

    const handleSelect = async (val : string) => {
        // async since data need to be fetched -> lat,lng
        setValue(val, false);
        clearSuggestions(); // no longer need 
        const geocode = await getGeocode({address : val});
        const coord : latLng = await getLatLng(geocode[0]);
        props.search(coord);
        setCurrent(coord);
    };


    const addPin = () => {
        if (current === undefined) {
            console.log('nothing to log');
        } else if (current === previous) {
            console.log('same location');
        } else {
            setPrevious(current);
            console.log(current);
            props.addPin([...props.pins, current])
        }
    }
    
    // similar structure as : https://reach.tech/combobox/
    return (
        <div>
        <Combobox onSelect={handleSelect}>
            <ComboboxInput value = {value} onChange={handleInput} disabled = {!ready} placeholder= 'Search' />
            <ComboboxPopover>
                <ComboboxList>
                    {status === 'OK' && data.map(({place_id, description}) => (
                        <ComboboxOption key = {place_id} value = {description}/>
                    ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
        <button onClick={addPin}>Add pin</button>
        </div>
    )
};