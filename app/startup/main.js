import Hurricane from '../gameobjects/hurricane.js';
import HurricaneMovement from '../components/hurricaneMovement.js';
import WindArrows from '../components/windArrows.js';
import PressureSystem from '../gameobjects/pressureSystem.js';
import CollisionDetection from '../components/collisionDetection.js';
import SeasonLabel from '../gameobjects/seasonLabel.js';
import GameControls from '../components/gameControls.js';
import HeatMap from '../components/heatmap.js';
import Pins from '../components/pins.js';

let gameControls = new GameControls();
let colDetect = new CollisionDetection();
let heatMap;
let screenPressed = false;
let x = 0;
let y = 0;
let loaded = false;

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
let seasonLabel;
let windArrows;
let hurricaneMovement;
let pins;
let sst = 1;
let category = [1, 2, 3, 4, 5];
let coordinates = [];

/** All mouse down events. */
const mouseDownEvents = (event) => {
  x = event.clientX;
  y = event.clientY;
  screenPressed = true;
  seasonLabel.changeSeason(x, y);
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

let highMove = false;
let lowMove = false;

/** All mouse move events. */
const mouseMoveEvents = (event) => {
  // Checks if screen was pressed.
  if (screenPressed) {
    if (!colDetect.detectCollision(highPressureSys, lowPressureSys, 'ellipse')) {
      // Moves objects to mouse coordinates if they are within the bounds.
      highMove = highPressureSys.move(x, y, false);
      lowMove = lowPressureSys.move(x, y, false);
      x = event.clientX;
      y = event.clientY;
    } else {
      screenPressed = false;
      // Checks where each system is relative to each other on the x axis when collided and adjusts their position accordingly.
      if (highPressureSys.x <= lowPressureSys.x) {
        if (highMove) {
          lowMove = lowPressureSys.move(10, 0, true);
        } else if (lowMove) {
          highMove = highPressureSys.move(-10, 0, true);
        }
      } else {
        if (highMove) {
          lowMove = lowPressureSys.move(-10, 0, true);
        } else if (lowMove) {
          highMove = highPressureSys.move(10, 0, true);
        }
      }
      // Checks where each system is relative to each other on the y axis when collided and adjusts their position accordingly.
      if (highPressureSys.y <= lowPressureSys.y) {
        if (highMove) {
          lowMove = lowPressureSys.move(0, 10, true);
        } else if (lowMove) {
          highMove = highPressureSys.move(0, -10, true);
        }
      } else {
        if (highMove) {
          lowMove = lowPressureSys.move(0, -10, true);
        } else if (lowMove) {
          highMove = highPressureSys.move(0, 10, true);
        }
      }
      x = event.clientX;
      y = event.clientY;
    }
  }
};


/** Detects if a hurricane has been hit by a high pressure system object. */
const hurricaneCollisionDetect = () => {
  // Detects if a hurricane and high pressure system collide and add a new target point to the hurricane accordingly.
  if (colDetect.detectCollision(highPressureSys, hurricane, 'ellipse')) {
    // Checks where each object is relative to each other on the x axis when collided and adjusts their position accordingly.
    if (highPressureSys.x <= hurricane.x) {
      // Checks if the hurricane hit the high pressure system or if the high pressure system hit the hurricane.
      screenPressed ? hurricane.updateX(5) : hurricane.updateX(1);
    } else {
      screenPressed ? hurricane.updateX(-5) : hurricane.updateX(-1);
    }
    // Checks where each object is relative to each other on the y axis when collided and adjusts their position accordingly.
    if (highPressureSys.y <= hurricane.y) {
      screenPressed ? hurricane.updateY(5) : hurricane.updateY(1);
    } else {
      screenPressed ? hurricane.updateY(-5) : hurricane.updateY(-1);
    }
  }
};

/** Creates test data for heat map. */
const heatMapTestData = () => {
  for (let i = 0; i < 825; i++) {
    for (let j = 0; j < 526; j++) {
      const randomTemp = Math.floor(Math.random() * (j - 128));
      coordinates.push({x: i, y: j, temp: randomTemp});
    }
  }
}

/** Converts the given data into 1x-5x to display on the control panel
 *  Guide:
 *    1x: 6400
 *    2x: 7225
 *    3x: 8100
 *    4x: 9025
 *    5x: 10000
 * */
const convertHurricaneSizeData = (size) => {
  if (size === 6400) {
    return 1;
  } else if (size === 7225) {
    return 2;
  } else if (size === 8100) {
    return 3;
  } else if (size === 9025) {
    return 4;
  } else if (size === 10000) {
    return 5;
  } else {
    return 1;
  }
}

const controlPressureSystemSizes = () => {
  if ((convertHurricaneSizeData(highPressureSys.getSize()) === 1)) {
    document.getElementById("high-").disabled = true;
  } else if ((convertHurricaneSizeData(highPressureSys.getSize()) === 5)) {
    document.getElementById("high+").disabled = true;
  } else {
    document.getElementById("high-").disabled = false;
    document.getElementById("high+").disabled = false;
  }

  if ((convertHurricaneSizeData(lowPressureSys.getSize()) === 1)) {
    document.getElementById("low-").disabled = true;
  } else if ((convertHurricaneSizeData(lowPressureSys.getSize()) === 5)) {
    document.getElementById("low+").disabled = true;
  } else {
    document.getElementById("low-").disabled = false;
    document.getElementById("low+").disabled = false;
  }
}

/** Loads all objects and starts the game. */
const startGame = () => {
  /** Create all objects in this area. */
  // hurricane = new Hurricane(700, 450, 100, 100, 'https://scied.ucar.edu/sites/default/files/interactives/predict-hurricane/assets/images/hurricane.png', gameArea, true);
  hurricane = new Hurricane(700, 350, 30, 30, 'grey', gameArea, false, category[0], sst);
  hurricaneMovement = new HurricaneMovement(hurricane, { x: 0, y: 350 });
  windArrows = new WindArrows(gameArea);
  windArrows.createWindArrows();
  pins = new Pins(gameArea, '../images/red-pin.png', 13, 16);
  pins.createPins();
  seasonLabel = new SeasonLabel(gameArea);
  highPressureSys = new PressureSystem(500, 120, 80, 80, '../images/HighPressureSystem.png', gameArea, true, 'high');
  lowPressureSys = new PressureSystem(120, 300, 80, 80, '../images/LowPressureSystem.png', gameArea, true, 'low');

  // Loads heat map.
  heatMapTestData();
  heatMap = new HeatMap(coordinates, gameArea);
  loadToMainCanvas();
  
  // Starts the game area.
  gameArea.start();
};

/** Loads offscreen canvas to main canvas (Improves performance). */
const loadToMainCanvas = () => {
  const destCtx = gameArea.canvas.getContext("2d");
  destCtx.drawImage(gameArea.offCanvas, 0, 0);
};

/** Updates the game area of the game. */
const updateGame = () => {
  // Clears the game area every refresh.
  gameArea.clear();

  // If not loaded, load heat map.
  if (!loaded) {
    // Draws the heat map.
    heatMap.updateHeatPoints();
    loaded = true;
  }

  // Loads offscreen canvas draws to main canvas.
  loadToMainCanvas();
  seasonLabel.update();
  hurricaneCollisionDetect();
  windArrows.updateWindArrows();
  pins.updatePins();
  hurricaneMovement.moveHurricane();
  controlPressureSystemSizes();

  highPressureSys.changeSize(gameControls.highPressureSize);
  lowPressureSys.changeSize(gameControls.lowPressureSize);
  gameControls.changeHighSize(0);
  gameControls.changeLowSize(0);

  document.getElementById("high-pressure-size").innerText = convertHurricaneSizeData(highPressureSys.getSize()).toString() + "x";
  document.getElementById("low-pressure-size").innerText = convertHurricaneSizeData(lowPressureSys.getSize()).toString() + "x";
  document.getElementById("temp-text").innerText = (gameControls.tempChange / 5).toString();

  /** Update all objects in this area. */
  hurricane.update();
  highPressureSys.update();
  lowPressureSys.update();

};

// Game Control Button Listeners.
const high1 = document.getElementById("high+");
const high2 = document.getElementById("high-");

const low1 = document.getElementById("low+");
const low2 = document.getElementById("low-");

const temp1 = document.getElementById("temp+");
const temp2 = document.getElementById("temp-");

// Display panel of sizes and temperature
high1.addEventListener("click", () => gameControls.changeHighSize(5));
high2.addEventListener("click", () => gameControls.changeHighSize(-5));

low1.addEventListener("click", () => gameControls.changeLowSize(5));
low2.addEventListener("click", () => gameControls.changeLowSize(-5));

temp1.addEventListener("click", () => gameControls.changeTemp(5));
temp2.addEventListener("click", () => gameControls.changeTemp(-5));

// Starts the game when the window loads.
window.addEventListener('load', startGame);

