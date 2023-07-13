import React, { useState, useRef, useCallback, useMemo } from 'react'
import { GoogleMap } from '@react-google-maps/api';
import { MarkerF } from '@react-google-maps/api';

import { Search } from './Search';


type latLng = google.maps.LatLngLiteral;

export const MainMap = () => {
    const [search, setSearch] = useState<latLng>();
    const curMap = useRef<GoogleMap>();
    const center = useMemo<latLng>(()=>{return { lat : 49.2606, lng : -123.2460}}, [])

    // arbitrary number of pins
    const [pins, setPins] = useState<latLng[]>([]);

    // record map refernce, return, not called, when rendered
    const onLoad = useCallback((map : any) => {
        console.log('new load', map);
        return curMap.current = map
    }, []);


    //console.log(search);

    // DO NOT MAKE IT SO THAT ANYTHING I "DO NOT WANT TO RENDER", IS THE CHILD OF THE CHANGING PARENT
    //  => anything changed in MainMap, will CASCADE to all its child : previously : map

    // another solution --> passing map as props -- 'Lift Content Up'

    return (
        <div style={{ display : 'flex', flexDirection: 'row'}}>
            <div style={{ width : '10%'}}> 
                <Search search = {(position : latLng) : void => {
                    setSearch(position)
                    curMap.current?.panTo(position)
                    }}
                    pins = {pins}
                    addPin = {setPins}/>
            </div>
            <div style={{ height : '85vh', width : '90%', marginRight: '10px',}}>
            <GoogleMap zoom = {15} center = {center} mapContainerClassName='map-container' onLoad = {onLoad}>
                {pins.map((pin) => (
                    <MarkerF position={{lat : pin.lat, lng : pin.lng}} label={'New Pin'}/>
                ))}
            </GoogleMap>
            </div>
        </div>
    );
}