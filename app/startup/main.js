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

// Loads all objects and starts the game.
const startGame = () => {
  /** Create all objects in this area. */

  // Starts the game area.
  gameArea.start();
};

// Updates the game area of the game.
const updateGame = () => {
  // Clears the game area every refresh.
  gameArea.clear();

  /** Update all objects in this area. */
};

// Starts the game when the window loads.
window.addEventListener('load', startGame);

