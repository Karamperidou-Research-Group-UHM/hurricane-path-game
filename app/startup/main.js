import Hurricane from '../gameobjects/hurricane.js';
import HurricaneMovement from '../components/hurricaneMovement.js';
import WindArrows from '../components/windArrows.js';
import PressureSystem from '../gameobjects/pressureSystem.js';

let screenPressed = false;
let x = 0;
let y = 0;

/** The game area of the game. */
const gameArea = {
  // Creates a canvas html element in main.html.
  canvas: document.createElement("canvas"),

  // Sets up the canvas properties and refreshes game area every 20 ms.
  start : function () {
    this.canvas.width = 825;
    this.canvas.height = 526;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    // Calls updateGame every 20 milliseconds (refreshes game area every 20 ms).
    this.interval = setInterval(updateGame, 20);

    // Mouse down event.
    this.canvas.addEventListener('mousedown', function (event) {
      x = event.clientX;
      y = event.clientY;
      screenPressed = true;
    });

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
let hurricaneMovement;
let windArrows;
let index = 0;

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
    x = event.clientX;
    y = event.clientY;
  }
};

/** Loads all objects and starts the game. */
const startGame = () => {
  /** Create all objects in this area. */
  // hurricane = new Hurricane(700, 450, 100, 100, 'https://scied.ucar.edu/sites/default/files/interactives/predict-hurricane/assets/images/hurricane.png', gameArea, true);
  hurricane = new Hurricane(700, 450, 50, 50, 'red', gameArea, false);
  hurricaneMovement = new HurricaneMovement(hurricane, { x: 0, y: 450 });
  windArrows = new WindArrows(gameArea);
  windArrows.createWindArrows();
  // highPressureSys = new PressureSystem(500, 0, 350, 270, '../images/HighPressureSystem.png', gameArea, true, 'high');
  // lowPressureSys = new PressureSystem(20, 300, 350, 270, '../images/LowPressureSystem.png', gameArea, true, 'low');
  highPressureSys = new PressureSystem(600, 100, 50, 50, 'blue', gameArea, false, 'high');
  lowPressureSys = new PressureSystem(100, 400, 50, 50, 'red', gameArea, false, 'low');
  // Starts the game area.
  gameArea.start();
};

/** Updates the game area of the game. */
const updateGame = () => {
  // Clears the game area every refresh.
  gameArea.clear();
  windArrows.updateWindArrows();
  hurricaneMovement.moveHurricane();
  hurricaneMovement.addNewTarget({ x: -1 * index, y: 450 - index })
  index += 10;

  /** Update all objects in this area. */
  hurricane.update();
  highPressureSys.update();
  lowPressureSys.update();
};

// Starts the game when the window loads.
window.addEventListener('load', startGame);

