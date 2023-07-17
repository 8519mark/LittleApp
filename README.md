# LittleApp with little map

## A google map that make the user to find the "Good" routes between arbitrary number of points

## Intro
This is a project on understanding react, public api, and popular libraries and tools. The main focus of this practices are :

* Understand *React* components structure and create a team friendly design approach.
* Study the inner working of the states in *React*.
* Utilize the *Google Map API*, a learning expereince for efficient docs reading, and handling popular APIs.
* Review simple *HTML* and *CSS*, also practice on creating better user experience.
* Analyze the graph provlem that arise from this map project - *Traveling Salesman Problem*

## Enviroment Setup and Run
Some neccessary configuration to execute the code properly.

1. clone the repo : place it on a desired folder, and all the further command should best run on that location (terminal).

2. [Install Node LTS](https://nodejs.org/en/download/) :
this will also install NPM, helpful for version controllong.

3. [Install Yarn](https://yarnpkg.com/en/docs/install) : 
Same as Above, but better.

4. run `yarn install` on terminal : this will install all neccssary dependency

5. create enviroment varaible : go to `\src\`, and make a file named `.env.local`.

6. add Google API key : include your Google API key in this format : `REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_API_KEY`. Note : do not put it as `"YOUR_API_KEY"`, just include the key right after the equal sign.

7. run `yarn start`  on terminal : this will boot up the web page in localhost.