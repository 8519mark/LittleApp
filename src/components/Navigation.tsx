import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type props_Navigation = {
    image : IconDefinition; // link image
    text : string;  // text of link
    link : string;  // actual link
}



export const Navigation = (props : props_Navigation) => {

    const iconColor = 'var(--item-text-color)';

    return (
        <div className = "navigation">
            <li className = "navigation-item">
                <a href = {props.link} className = "navigation-link">
                    <span className = "navigation-link-text-placeholder">{props.text}</span>
                    <div className = "navigation-image">
                        <FontAwesomeIcon icon = {props.image} style={{ color: iconColor, transition: 'color 600ms ease-in-out' }}/>
                    </div>
                    <span className = "navigation-link-text">{props.text}</span>
                    <span className = "navigation-link-text-placeholder">{props.text}</span>
                </a>
            </li>
        </div>
    );
}