/** Provides methods and properties for a season label. */
export default class SeasonLabel {
  /** Creates a new Season Label. */
  constructor(gameArea) {
    this.gameArea = gameArea;
    this.seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
    this.currentIndex = 0;
  }

  /** Changes the season the label will indicate. */
  changeSeason() {
    this.currentIndex++;

    // Cycles back to the first index of the seasons array if the current index is greater than the length of the array.
    if (this.currentIndex >= this.seasons.length) {
      this.currentIndex = 0;
    }
  }

  /** Updates the season label. */
  update() {
    const ctx = this.gameArea.context;
    ctx.fillStyle = 'black';
    ctx.font = '40px serif';
    ctx.fillText(this.seasons[this.currentIndex], 700, 50);
  }
}
