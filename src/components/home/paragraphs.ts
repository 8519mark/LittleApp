import map_sample from '../../img/map_sample.png'
import map_addPin from '../../img/map_addPin.png'
import map_direction from '../../img/map_direction.png'
import map_NN from '../../img/map_NN.png'

export type ParagraphType = {
    head : string;
    body : string;
    image : string;
    imageOnRight : boolean;
    imagePercent : number;
    tryMap : boolean;
}

export const paragraphs : ParagraphType[] = [];

// intro
paragraphs.push({
    head : 'Finding the "Good" routes',
    body : `Although it might be useful to find the most optimal routes,<br/>
            it is known that this is a Travel Salesman Problem (TSP),<br/>
            which is known to be NP-hard.<br/>
            <br/>
            Can we do "better" than finding the "best"?`,
    image : map_sample,
    imageOnRight : true,
    imagePercent : 50,
    tryMap : true,
} );

// get all points
paragraphs.push({
    head : 'Step 1 : find all points you want',
    body : `typing on all the desired location to add pins on the map.<br/>
            <br/>
            Note : <br/>
            the first location "selected" will be your starting location.<br/>
            You can select the location by clicking on the added pin`,
    image : map_addPin,
    imageOnRight : false,
    imagePercent : 30,
    tryMap : false,
} );

// get directions
paragraphs.push({
    head : 'Step 2 : get the result',
    body : `Clicking the "direction" button,<br/>
            then receive the result!<br/>`,
    image : map_direction,
    imageOnRight : true,
    imagePercent : 70,
    tryMap : false,
} );

// get directions
paragraphs.push({
    head : 'Power of Nearest Neighbor Heuristic',
    body : `there is a optimal solution including Dynamic programing,<br/>
            but the solutions will take O(n^2 * 2^n),<br/>
            which can be very difficult for a normal computer on 30 pins or more.<br/>
            <br/>
            By using Nearest Neighbor Heuristic, the solution can be found on O(n^2),<br/>
            drammatically saved the time spent while still maintain a good performance!<br/>`,
    image : map_NN,
    imageOnRight : false,
    imagePercent : 20,
    tryMap : true,
} );
