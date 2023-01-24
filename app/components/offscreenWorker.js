onmessage = (event) => {
  const canvas = event.data.canvas;
  const ctx = canvas.getContext("2d");

  for (let i = 0; i < 100000; i++) {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(50, 50, 50, 50);
    ctx.closePath();
  }
};
