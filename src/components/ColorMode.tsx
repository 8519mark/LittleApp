import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useState} from 'react'
import '../App.css';

type props_ColorMode = {
    image : IconDefinition; // link image
}


export const ColorMode = (props : props_ColorMode) => {

    const lightMode = true;
    const darkMode = false;

    const [mode, setMode] = useState(lightMode);

    const handleColor = () => {
        if (mode === lightMode) {
            setMode(darkMode);
            console.log("to DARK");
            document.querySelector("body")?.setAttribute('mode', 'dark-mode');
        } else {
            setMode(lightMode);
            console.log("to LIGHT");
            document.querySelector("body")?.setAttribute('mode', 'light-mode');
        }
    }

    const iconColor = 'var(--item-text-color)';

    return (
        <div className = "navigation-icon">
            <button onClick={handleColor} style={{ background : 'transparent', border : 'none', fontSize: '1.1em'}}>
                <FontAwesomeIcon icon = {props.image} style={{ color : iconColor, transition: 'color 600ms ease-in-out'}}/>
            </button>
        </div>
    )
}