import React, { useState, useRef, useCallback, useMemo } from 'react'
import { GoogleMap } from '@react-google-maps/api';

import { Search } from './Search';
// import { Pin } from './Pin';


type latLng = google.maps.LatLngLiteral;


export const MainMap = () => {
    const [search, setSearch] = useState<latLng>();
    const curMap = useRef<GoogleMap>();
    const center = useMemo<latLng>(()=>{return { lat : 49.2606, lng : -123.2460}}, [])

    // record map refernce, return, not called, when rendered
    const onLoad = useCallback((map : any) => {
        console.log('new load', map);
        return curMap.current = map
    }, []);


    //console.log(search);

    // DO NOT MAKE IT SO THAT ANYTHING I "DO NOT WANT TO RENDER", IS THE CHILD OF THE CHANGING PARENT
    //  => anything changed in MainMap, will CASCADE to all its child : previously : map

    return (
        <div style={{ display : 'flex', flexDirection: 'row'}}>
            <div style={{ width : '10%'}}> 
                <Search search = {(position : latLng) : void => {
                    setSearch(position)
                    curMap.current?.panTo(position)
                    }}/>
            </div>
            <div style={{ height : '85vh', width : '90%', marginRight: '10px',}}>
            <GoogleMap zoom = {15} center = {center} mapContainerClassName='map-container' onLoad = {onLoad}>
                {/* <Pin center = {locations.AMSProps.center} text = {locations.AMSProps.text}></Pin>
                <Pin center = {locations.ICCSProps.center} text = {locations.ICCSProps.text}></Pin> */}
            </GoogleMap>
            </div>
        </div>
    );
}