import HeatMap from './heatmap';

onmessage = (event) => {
  // const heatMap = new HeatMap()
  const canvas = event.data.canvas;
  const context = canvas.getContext("2d");
  let sum = 0;
  for (let i = 0; i < 500; i++) {
    sum += i;
  }
  console.log(`From Worker: ${sum}`);
};
