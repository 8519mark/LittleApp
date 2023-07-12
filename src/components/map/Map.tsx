import { NavigationSection } from '../NavigationSection';
import './Map.css'

import { MainMap } from './MainMap';
import { useLoadScript } from '@react-google-maps/api';

export const Map = () => {

    let KEY : string | undefined = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    if (KEY === undefined) {
        KEY = 'undefined_api_key';
    }
    // move the loading here, do not want to reload everytime map is changed
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey : KEY,
        libraries : ['places'],
    });

    if (loadError) {
        return (<div>Map cannot be loaded right now, sorry.</div>)
    } else if (!isLoaded) {
        return (<div>Loading ...</div>)
    }

    return (
        <div className="App">
            <div className = "top-content">
                <NavigationSection />
            </div>
            <div className = "mid-content">
                <MainMap />
            </div>
        </div>
    );
}