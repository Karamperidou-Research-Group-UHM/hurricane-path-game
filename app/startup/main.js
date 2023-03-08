import Hurricane from '../gameobjects/hurricane.js';
import WindArrows from '../components/windArrows.js';
import PressureSystem from '../gameobjects/pressureSystem.js';
import GameControls from '../components/gameControls.js';
import HeatMap from '../components/heatmap.js';
import Pins from '../components/pins.js';
import TestData from '../components/testData.js';
import GameObject from '../gameobjects/gameObject.js';
import { getWindData, getWindDataPoint, testAPI } from '../api/noaaWeatherAPI.js';
import { latLongToCoordinates } from '../components/coodinateConversion.js';

let gameControls = new GameControls();
let testData = new TestData();
let heatMap;
let screenPressed = false;
let x = 0;
let y = 0;
let initialLoad = true;
let loaded = false;
let gameStart = false;

/** The game area of the game. */
const gameArea = {
  // Creates a canvas html element in main.html.
  canvas: document.createElement("canvas"),

  // Creates offscreen canvas for off loading.
  offCanvas: document.createElement("canvas"),

  // Sets up the canvas properties and refreshes game area every 20 ms.
  start : function () {
    this.canvas.width = 825;
    this.canvas.height = 526;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    this.offCanvas.width = 825;
    this.offCanvas.height = 526;
    this.context2 = this.offCanvas.getContext("2d");

    // Calls updateGame every 20 milliseconds (refreshes game area every 20 ms).
    this.interval = setInterval(updateGame, 20);

    // Mouse down event.
    this.canvas.addEventListener('mousedown', (event) => mouseDownEvents(event));

    // Mouse move event.
    this.canvas.addEventListener('mousemove', (event) => mouseMoveEvents(event));

    // Mouse up event.
    this.canvas.addEventListener('mouseup', (event) => mouseEndEvents(event));
  },

  // Clears the game area.
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};

let hurricane;
let highPressureSys;
let lowPressureSys;
let windArrows;
let equator;
let pins;
let sst = 1;
let category = [1, 2, 3, 4, 5];
let coordinates = [];
let windArrowData = [];
const cities = ["honolulu", "mexico-city", "los-angeles", "tokyo", "manila", "vancouver"];

/** All mouse down events. */
const mouseDownEvents = (event) => {
  x = event.clientX;
  y = event.clientY;
  screenPressed = true;
};

/** All mouse up events. */
const mouseEndEvents = (event) => {
  // Checks if screen was pressed.
  if (screenPressed) {
    // Resets moveable objects and screenPressed to false.
    highPressureSys.setInBounds(false);
    lowPressureSys.setInBounds(false);
    screenPressed = false;
    x = 0;
    y = 0;
  }
};

/** All mouse move events. */
const mouseMoveEvents = (event) => {
  // Checks if screen was pressed.
  if (screenPressed) {
      // Moves objects to mouse coordinates if they are within the bounds.
      highPressureSys.move(x, y);
      lowPressureSys.move(x, y);
      gameStart ? loaded = true : loaded = false;
      x = event.clientX;
      y = event.clientY;

      // If high pressure system and low pressure system are in the exact same location, relocate them back to initial position.
      if (highPressureSys.x === lowPressureSys.x && highPressureSys.y === lowPressureSys.y) {
        highPressureSys.x = 500;
        highPressureSys.y = 120;
        lowPressureSys.x = 120;
        lowPressureSys.y = 300;
      }
  }
};

/** Loads offscreen canvas to main canvas (Improves performance). */
const loadToMainCanvas = () => {
  const destCtx = gameArea.canvas.getContext("2d");
  destCtx.drawImage(gameArea.offCanvas, 0, 0);
};

const startGame = (windData) => {
  /** Create all objects in this area. */
  const hurricaneStartPos = latLongToCoordinates(-125, 30);
  hurricane = new Hurricane(hurricaneStartPos.x, hurricaneStartPos.y, 5, 5, 'grey', gameArea, false, category[0], sst);
  const windDataCoordinates = []

  for (let i = 0; i < windData.length; i++) {
    const xycoordinates = latLongToCoordinates(windData[i].long, windData[i].lat);
    windDataCoordinates.push({
      x: xycoordinates.x,
      y: xycoordinates.y,
      windDir: windData[i].windDir,
    })
  }

  // Loads the seasons label and pressure systems
  pins = new Pins(gameArea, '../images/red-pin.png', 13, 16);
  pins.createPins();
  highPressureSys = new PressureSystem(500, 120, 80, 80, '../images/HighPressure.png', gameArea, true, 'high');
  lowPressureSys = new PressureSystem(120, 300, 80, 80, '../images/LowPressure.png', gameArea, true, 'low');

  equator = new GameObject(0, 266, 850, 2, 'black', gameArea, false);

  // Loads wind arrows.
  testData.windTestData(windArrowData);
  windArrows = new WindArrows(windDataCoordinates, gameArea, highPressureSys, lowPressureSys, hurricane);
  windArrows.createWindArrows();

  // Loads heat map.
  testData.heatMapTestData(coordinates);
  heatMap = new HeatMap(coordinates, gameArea);
  loadToMainCanvas();

  // Loads the major city/country markers
  pins = new Pins(gameArea, 13, 16);
  pins.createPins();
  //testAPI();

  // Starts the game area.
  gameArea.start();
}

/** Loads all objects and starts the game. */
const loadData = async () => {
  let season = 'Fall';

  let startDate = '';
  let endDate = '';
  // Sets the start and end date based on the season.
  if (season === 'Spring') {
    // NEEDS TO BE CHANGED ONCE THE SPRING EQUINOX IN 2023 HAPPENS!
    startDate = '2023-03-01';
    endDate = '2022-03-02';
  } else if (season === 'Summer') {
    startDate = '2022-06-21';
    endDate = '2022-06-22';
  } else if (season === 'Fall') {
    startDate = '2022-09-22';
    endDate = '2022-09-23';
  } else {
    startDate = '2022-12-21';
    endDate = '2022-12-22';
  }
  const startLat = 50;
  const startLong = 100;
  const windData = [];

  // Longitude points.
  for (let i = 0; i < 15; i++) {
    let long = (i * 20) + startLong;
    // Checks if longitude is at 180 and needs to be decreased.
    if (long > 180) {
      long = (((i * 20)) + startLong - 180) - 180;
    }
    // Latitude points.
    for (let j = 0; j < 7; j++) {
      const lat = -1 * (j * 15) + startLat;
      let allData = [];
      // Fetches stations in lat: 120E - 80W and log: 60N - 45S.
      await fetch(`https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${long}&start_date=${startDate}&end_date=${endDate}&hourly=winddirection_10m`)
        .then(data => data.json())
        .then(dataJson => allData = dataJson)
        .then(() => windData.push({
          lat: lat,
          long: long,
          windDir: allData.hourly.winddirection_10m[0],
        }))
        .then(() => {
          if (windData.length === 70) {
            console.log(`Loading... 100%`);
            console.log('Complete!!');
            startGame(windData);
          } else {
            console.log(`Loading... ${((i * 7) / 70) * 100}%`);
          }
        })
        .catch(error => console.log(error));
    }
  }
};

/** Updates all game object on the canvas. */
const updateObjects = () => {
  // Loads offscreen canvas draws to main canvas.
  loadToMainCanvas();
  windArrows.updateWindArrows();

  pins.updatePins();
  hurricane.moveHurricane(gameStart);
  pins.hurricaneCollision(hurricane);

  highPressureSys.changeSize(gameControls.highPressureSize);
  lowPressureSys.changeSize(gameControls.lowPressureSize);
  gameControls.changeHighSize(0);
  gameControls.changeLowSize(0);

  /** Update all objects in this area. */
  hurricane.update();
  highPressureSys.update();
  lowPressureSys.update();
  equator.update();
  hurricane.checkSST(coordinates);
  hurricane.checkPos(equator);
}

/** Updates the game area of the game. */
const updateGame = () => {
  if (gameStart) {
    // Clears the game area every refresh.
    gameArea.clear();
  }

  // Loads heatmap once, before everything else.
  if (initialLoad) {
    // Draws the heat map.
    heatMap.updateHeatPoints();
    initialLoad = false;
  }

  // If not loaded, load all objects first.
  if (!loaded) {
    gameArea.clear();
    updateObjects();
    loaded = true;
  }

  // Redraws objects only if game has started.
  if (gameStart) {
    updateObjects();
    // hurricaneMovement.moveHurricane();
    pins.changeMarker();
  }

  // Enables/Disables controls based on game circumstances.
  gameControls.enableControls(highPressureSys, lowPressureSys, gameStart);
  document.getElementById("high-pressure-size").innerText = gameControls.convertObjectSizeData(highPressureSys.getSize()).toString() + "x";
  document.getElementById("low-pressure-size").innerText = gameControls.convertObjectSizeData(lowPressureSys.getSize()).toString() + "x";
  document.getElementById("temp-text").innerText = gameControls.tempChange >= 0 ? `+ ${(gameControls.tempChange).toString()}` : `- ${(Math.abs(gameControls.tempChange)).toString()}`;

  // Initializes city locations
  let city_index = 0;
  for (city_index; city_index < cities.length; city_index++) {
    document.getElementById(cities[city_index]).innerText = "SAFE";
  }
  city_index = 0;
  for (city_index; city_index < cities.length; city_index++) {
    document.getElementById(cities[city_index]).style.color = "green";
  }

  // Updates hurricane information section with it's corresponding id
  document.getElementById("x-coord").innerText = (parseInt(hurricane.x)) + '';
  document.getElementById("y-coord").innerText = (parseInt(hurricane.y)) + '';
  document.getElementById("hurr-category").innerText = hurricane.category;
  document.getElementById("hurr-size").innerText = parseInt(hurricane.width * Math.PI) + '';
  document.getElementById("hurr-speed").innerText = parseInt(hurricane.windSpeed) + '';
  document.getElementById("hurr-sst").innerText = hurricane.sst + '';

  hurricane.getHitCity(pins.hurricaneCollision(hurricane));
  gameControls.changeCityStatus(pins.hurricaneCollision(hurricane), cities);
};

/** Resets the game */
const resetGame = () => {
  gameArea.clear();
  initialLoad = true;
  loaded = false;
  gameStart = false;
  gameControls.resetGameControls();
  heatMap.resetTemp();
  hurricane.resetHurricane();
  highPressureSys.resetPressureSystem();
  lowPressureSys.resetPressureSystem();
  pins.resetPins();
}

// Game Control Button Listeners.
const high1 = document.getElementById("high+");
const high2 = document.getElementById("high-");

const low1 = document.getElementById("low+");
const low2 = document.getElementById("low-");

const temp1 = document.getElementById("temp+");
const temp2 = document.getElementById("temp-");

const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");

// Display panel of sizes and temperature
high1.addEventListener("click", () => {
  gameControls.changeHighSize(5);
  // If game has not started, reload the screen.
  gameStart ? loaded = true : loaded = false;
});

high2.addEventListener("click", () => {
  gameControls.changeHighSize(-5)
  // If game has not started, reload the screen.
  gameStart ? loaded = true : loaded = false;
});

low1.addEventListener("click", () => {
  gameControls.changeLowSize(5)
  // If game has not started, reload the screen.
  gameStart ? loaded = true : loaded = false;
});
low2.addEventListener("click", () => {
  gameControls.changeLowSize(-5)
  // If game has not started, reload the screen.
  gameStart ? loaded = true : loaded = false;
});

temp1.addEventListener("click", () => {
  // Changes temp and updates heatmap.
  gameControls.changeTemp(5, heatMap)
  // If game has not started, reload the screen.
  gameStart ? loaded = true : loaded = false;
});

temp2.addEventListener("click", () => {
  // Changes temp and updates heatmap.
  gameControls.changeTemp(-5, heatMap)
  // If game has not started, reload the screen.
  gameStart ? loaded = true : loaded = false;
});

startButton.addEventListener("click", () => gameStart = true);
resetButton.addEventListener("click", () => resetGame());

// Starts the game when the window loads.
window.addEventListener('load', loadData);

