import './NavigationSectionStyle.css'
import { faSun, faHeart } from '@fortawesome/free-regular-svg-icons';
import {faEarthAmerica} from '@fortawesome/free-solid-svg-icons';
import { faShield} from '@fortawesome/free-solid-svg-icons';

import { Navigation } from './Navigation';
import { ColorMode } from './home/ColorMode';

export const NavigationSection = () => {

    return (
        <div className = "navigation-grid">
            <div className = "navigation-left">
                <ColorMode image = {faSun}/>
            </div>
            <div className = "navigation-right">
                <Navigation image = {faHeart} text = "About" link = "/"/>
                <Navigation image = {faEarthAmerica} text = "Map" link = "Map"/>
                <Navigation image = {faShield} text = "Security" link = "Test"/>
            </div>
        </div>
    );
}