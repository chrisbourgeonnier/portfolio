const canvas= document.querySelector('#draw');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');

canvas.width = window.innerWidth;
canvas.heigth = window.innerHeight;

ctx.strokeStyle = '#COOL';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;
ctx.globalCompositeOperation = 'screen';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return;
  console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
  ctx.beginPath();
  // start from
  ctx.moveTo(lastX, lastY);
  //go to
  ctx.lineTo(e.offsetX, e.offsetY)
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  if (ctx.lineWidth >= 80 || ctx.lineWidth <= 5) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

function saveCanvas() {
  // take the data out of the canvas
  const data = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = data;
  link.download = 'canvas';
  link.setAttribute('download', 'canvas');
  link.innerHTML = `<img src="${data}" alt="cool canvas" />`;
  strip.insertBefore(link, strip.firstChild);
}
