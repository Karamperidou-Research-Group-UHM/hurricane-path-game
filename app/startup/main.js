import Hurricane from '../gameobjects/hurricane.js';
import HurricaneMovement from '../components/hurricaneMovement.js';
import WindArrows from '../components/windArrows.js';
import PressureSystem from '../gameobjects/pressureSystem.js';

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

/** Loads all objects and starts the game. */
const startGame = () => {
  /** Create all objects in this area. */
  hurricane = new Hurricane(700, 450, 50, 50, 'red', gameArea, false);
  hurricaneMovement = new HurricaneMovement(hurricane, { x: 0, y: 450 });
  windArrows = new WindArrows(gameArea);
  windArrows.createWindArrows();
  highPressureSys = new PressureSystem(500, 0, 350, 270, '../images/HighPressureSystem.png', gameArea, true, 'high');
  lowPressureSys = new PressureSystem(100, 400, 50, 50, 'blue', gameArea, false, 'low');

  // Starts the game area.
  gameArea.start();
};

/** Updates the game area of the game. */
const updateGame = () => {
  // Clears the game area every refresh.
  gameArea.clear();

  hurricaneMovement.moveHurricane();
  hurricaneMovement.addNewTarget({ x: -1 * index, y: 450 - index })
  index += 10;

  /** Update all objects in this area. */
  hurricane.update();
  highPressureSys.update();
  lowPressureSys.update();
  windArrows.updateWindArrows();
};

// Starts the game when the window loads.
window.addEventListener('load', startGame);

