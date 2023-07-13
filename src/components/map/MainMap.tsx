import React, { useState, useRef, useCallback, useMemo } from 'react'
import { GoogleMap } from '@react-google-maps/api';

import { Search } from './Search';
import { Pin } from './Pin';


type latLng = google.maps.LatLngLiteral;

type PinType = {
    id : number
    center : latLng,
    selected : boolean,
}


export const MainMap = () => {
    const curMap = useRef<GoogleMap>();
    const center = useMemo<latLng>(()=>{return { lat : 49.2606, lng : -123.2460}}, [])

    // current searching place
    const [search, setSearch] = useState<latLng>();
    // arbitrary number of pins
    const [pins, setPins] = useState<PinType[]>([]);

    // record map refernce, return, not called, when rendered
    const onLoad = useCallback((map : any) => {
        // console.log('new load', map);
        return curMap.current = map
    }, []);

    const onPinSelect = (id : number) : void => {
        const newPins = [...pins]
        const selectedPin = newPins.find((pin) => {
            return id === pin.id
        })
        if (selectedPin === undefined) {
            return;
        }
        selectedPin.selected = !selectedPin?.selected
        setPins(newPins)
        if (selectedPin.selected) {
            console.log('Pin' + id + " selected")
        } else {
            console.log('Pin' + id + " not selected")
        }
        // curMap.current?.panTo(selectedPin.center)
    }


    // DO NOT MAKE IT SO THAT ANYTHING I "DO NOT WANT TO RENDER", IS THE CHILD OF THE CHANGING PARENT
    //  => anything changed in MainMap, will CASCADE to all its child : previously : map

    // another solution --> passing map as props -- 'Lift Content Up'

    pins.map((pin) => {
        console.log(pin);
        return null;
    })

    return (
        <div style={{ display : 'flex', flexDirection: 'row'}}>
            <div style={{ width : '10%'}}> 
                <Search doSearch = {(position : latLng) : void => {
                    setSearch(position)
                    curMap.current?.panTo(position)
                    }}
                    pins = {pins}
                    addPin = {setPins}/>
            </div>
            <div style={{ height : '85vh', width : '90%', marginRight: '10px',}}>
            <GoogleMap zoom = {15} center = {center} mapContainerClassName='map-container' onLoad = {onLoad}>
                {pins.map((pin) => (
                    <Pin pin = {pin} doSelect={onPinSelect}/>
                ))}
            </GoogleMap>
            </div>
        </div>
    );
}