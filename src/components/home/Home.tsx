import { NavigationSection } from '../NavigationSection';
import { FrontPage } from './FrontPage';

import { paragraphs } from './paragraphs';

export const Home = () => {
    return (
        <div className="App">
            <div className = "top-content">
                <NavigationSection />
            </div>
            <div className = "mid-content">
                {paragraphs.map((paragraph) => (
                    <FrontPage head = {paragraph.head} body = {paragraph.body} 
                    imageOnRight = {paragraph.imageOnRight} image = {paragraph.image} imagePercent={paragraph.imagePercent}
                    tryMap = {paragraph.tryMap}/>
                ))}
            </div>
        </div>
    )
}