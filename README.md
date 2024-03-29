# Pacific Hurricane Simulator
**Sponsored by the University of Hawaii at Manoa - Department of Atmospheric Sciences**

---------------------------------------

## Table of Contents
#### General 
* [Deployment Instructions](#Deployment Instructions)
* [Introduction](#Introduction)
* [Purpose](#Purpose)
* [Setup](#setup)
* [Launch](#Launch)

#### Technical Details
* [Technologies Used](#Technologies Used)
* [Inspiration](#Inspiration)

#### Visuals
* [Illustrations](#Illustrations)
* [Screenshots](#Screenshots)

---------------------------------------

## General
### Deployment Instructions
In order to use this application please follow the steps below:
1. Clone the repo on to your local machine.
2. Download Docker onto your machine if you do not have it already.
3. Navigate to the root folder and run the command: ```docker-compose build``` to build the docker images.
4. Then run ```docker-compose up``` to create the docker containers from the images.
5. Go to localhost:8080 to view the page.
6. Run ```docker-compose down``` when finished to destroy the existing docker containers.
### Introduction
This game is brought to you by the Department of Atmospheric Sciences at the University of Hawaii at Manoa.

### Purpose
The purpose of this simulation is to act as an e-learning outreach activity to give users an interactive activity to 
learn more about hurricanes and climate changes. 

### Setup
**Download Github Desktop if needed**
1. Click the "Code" dropdown button and Clone the repository.
2. Select "Open with Github Desktop".
3. Once the repository is done cloning, open Github Desktop.
4. In Github Desktop, select the project hurricane-path-game and fetch origin.
5. Once the main branch has been fetched, open the game using any IDE of your choice.

### Launch
In the "app" folder, open the "startup" folder. Open the main.html file and click the play button to run it, 
or select a browser of your choice for the application to run from.

---------------------------------------

## Technical Details

### Technologies Used
Listed below is a list of the languages and tools utilized:

+ Development tools:
  + Github
  + Github Desktop
  + IntelliJ IDEA
  + Google Drive
  
+ Programming Languages:
  + JavaScript
  + CSS
  + HTML
  + Bootstrap UI

### Inspiration
The Department of Atmospheric Sciences wanted a hurricane simulation designed for the Pacific Ocean. There were examples of 
such games with different ideas and features that the department wanted the implement for the Pacific.
+ [UCAR][1]

[1]: https://scied.ucar.edu/interactive/forecast-hurricane
+ [The Hurricane Applet - Atlantic][2]

[2]: http://profhorn.meteor.wisc.edu/wxwise/hurr/h5/hurricane.html

---------------------------------------

## Visuals
### Illustrations
Some of the game's visual elements were found on the internet, below are the sourced links of all the illustrations included in the game. Others that weren't from the internet were hand drawn by our team and then implemented into the game.
+ [Pacific Ocean Map][1]

[1]: https://www.researchgate.net/profile/Eleanor-Sterling-2/publication/275607188/figure/fig1/AS:369365624082432@1465075035023/Map-of-Pacific-Ocean-showing-location-of-Palmyra-Atoll.png
+ [Pin][2]

[2]: https://www.pngitem.com/pimgs/m/236-2361239_location-pin-white-maps-marker-png-transparent-png.png

### Screenshots
**1st Iteration:** Foundational initialization, added visuals, first draft of hurricane movement and interaction with pressure systems.

**2nd Iteration:** Fixed bugs, consulted with advisor for suggestions, added foundation for feature development.

**3rd Iteration:** Adjusted game to only operate in the Northern Pacific Ocean due to the Coriolis Effect to make it more realistic. Began to add real data through APIs.
