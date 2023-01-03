import Hurricane from '../gameobjects/hurricane.js';

// The game area of the game.
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
let testPoints = [
  { x: 0, y: 0 },
  { x: 100, y: 0 },
  { x: 100, y: 100 },
  { x: 200, y: 200 },
  { x: 0, y: 0 },
];
let index = 0;

// Loads all objects and starts the game.
const startGame = () => {
  /** Create all objects in this area. */
  hurricane = new Hurricane(100, 100, 50, 50, 'red', gameArea);

  // Starts the game area.
  gameArea.start();
};

// Updates the game area of the game.
const updateGame = () => {
  // Clears the game area every refresh.
  gameArea.clear();

  // Checks if the index is less than the points array.
  if (index < testPoints.length) {
    // Moves hurricane to the coordinates at index.
    const isAtPoint = hurricane.move(testPoints[index]);
    // Moves to the next index in the array if the hurricane is at the last point.
    if (isAtPoint) {
      index++;
    }
  }
  /** Update all objects in this area. */
  hurricane.update();
};

// Starts the game when the window loads.
window.addEventListener('load', startGame);

