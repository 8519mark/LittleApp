import { NavigationSection } from '../NavigationSection';
import { ItemsSection } from './ItemsSection';
import { AboutSection } from './AboutSection';


export const Security = () => {
    return (
        <div className="App">
            <div className = "top-content">
                <NavigationSection />
            </div>
            <div className = "mid-content">
                <ItemsSection />
                <AboutSection />
            </div>
        </div>
    )
}