import Hurricane from '../gameobjects/hurricane.js';
import HurricaneMovement from '../components/hurricaneMovement.js';
import WindArrows from '../components/windArrows.js';
import PressureSystem from '../gameobjects/pressureSystem.js';
import CollisionDetection from '../components/collisionDetection.js';
import GameControls from '../components/gameControls.js';
import HeatMap from '../components/heatmap.js';
import Pins from '../components/pins.js';
import TestData from '../components/testData.js';
import { hurricaneCollisionDetect } from '../components/hurricaneCollisonCheck.js';


let gameControls = new GameControls();
let testData = new TestData();
let colDetect = new CollisionDetection();
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
let hurricaneMovement;
let pins;
let sst = 1;
let category = [1, 2, 3, 4, 5];
let coordinates = [];
let windArrowData = [];

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

/** Loads all objects and starts the game. */
const startGame = () => {
  /** Create all objects in this area. */
  // hurricane = new Hurricane(700, 450, 100, 100, 'https://scied.ucar.edu/sites/default/files/interactives/predict-hurricane/assets/images/hurricane.png', gameArea, true);
  hurricane = new Hurricane(700, 350, 30, 30, 'grey', gameArea, false, category[0], sst);
  hurricaneMovement = new HurricaneMovement(hurricane, { x: 0, y: 350 });

  // Loads the wind arrows
  windArrows = new WindArrows(gameArea);
  windArrows.createWindArrows();

  // Loads the seasons label and pressure systems
  pins = new Pins(gameArea, '../images/red-pin.png', 13, 16);
  pins.createPins();
  highPressureSys = new PressureSystem(500, 120, 80, 80, '../images/HighPressureSystem.png', gameArea, true, 'high');
  lowPressureSys = new PressureSystem(120, 300, 80, 80, '../images/LowPressureSystem.png', gameArea, true, 'low');

  // Loads wind arrows.
  testData.windTestData(windArrowData);
  windArrows = new WindArrows(windArrowData, gameArea, highPressureSys, lowPressureSys);
  windArrows.createWindArrows();

  // Loads heat map.
  testData.heatMapTestData(coordinates);
  heatMap = new HeatMap(coordinates, gameArea);
  loadToMainCanvas();

  // Loads the major city/country markers
  pins = new Pins(gameArea, 13, 16);
  pins.createPins();

  // Starts the game area.
  gameArea.start();
};

/** Updates all game object on the canvas. */
const updateObjects = () => {
  // Loads offscreen canvas draws to main canvas.
  loadToMainCanvas();
  windArrows.updateWindArrows();

  hurricaneCollisionDetect(colDetect, highPressureSys, hurricane, screenPressed);
  pins.updatePins();
  // hurricaneMovement.moveHurricane(gameStart);
  pins.hurricaneCollision(hurricane);

  highPressureSys.changeSize(gameControls.highPressureSize);
  lowPressureSys.changeSize(gameControls.lowPressureSize);
  gameControls.changeHighSize(0);
  gameControls.changeLowSize(0);

  /** Update all objects in this area. */
  hurricane.moveHurricane(gameStart);
  hurricane.update();
  highPressureSys.update();
  lowPressureSys.update();
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
    hurricaneMovement.moveHurricane();
    pins.changeMarker();
  }

  // Enables/Disables controls based on game circumstances.
  gameControls.enableControls(highPressureSys, lowPressureSys, gameStart);
  document.getElementById("high-pressure-size").innerText = gameControls.convertObjectSizeData(highPressureSys.getSize()).toString() + "x";
  document.getElementById("low-pressure-size").innerText = gameControls.convertObjectSizeData(lowPressureSys.getSize()).toString() + "x";
  document.getElementById("temp-text").innerText = gameControls.tempChange >= 0 ? `+ ${(gameControls.tempChange).toString()}` : `- ${(Math.abs(gameControls.tempChange)).toString()}`;

  document.getElementById("honolulu").innerText = "SAFE";
  document.getElementById("los-angeles").innerText = "SAFE";
  document.getElementById("mexico-city").innerText = "SAFE";
  document.getElementById("vancouver").innerText = "SAFE";
  document.getElementById("png").innerText = "SAFE";
  document.getElementById("manila").innerText = "SAFE";
  document.getElementById("tokyo").innerText = "SAFE";
  document.getElementById("sydney").innerText = "SAFE";
  document.getElementById("fiji").innerText = "SAFE";

  document.getElementById("honolulu").style.color = "green";
  document.getElementById("los-angeles").style.color = "green";
  document.getElementById("mexico-city").style.color = "green";
  document.getElementById("vancouver").style.color = "green";
  document.getElementById("png").style.color = "green";
  document.getElementById("manila").style.color = "green";
  document.getElementById("tokyo").style.color = "green";
  document.getElementById("sydney").style.color = "green";
  document.getElementById("fiji").style.color = "green";

  gameControls.changeCityStatus(pins.hurricaneCollision(hurricane));
};

// Game Control Button Listeners.
const high1 = document.getElementById("high+");
const high2 = document.getElementById("high-");

const low1 = document.getElementById("low+");
const low2 = document.getElementById("low-");

const temp1 = document.getElementById("temp+");
const temp2 = document.getElementById("temp-");

const startButton = document.getElementById("start");

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

// Starts the game when the window loads.
window.addEventListener('load', startGame);

