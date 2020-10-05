var canvas, ctx, walkers = [];
var colors = [
  "rgba(255, 0, 0, .025)",
  "rgba(255,127 ,0 , .025)",
  "rgba(255,255 ,0 , .025)",
  "rgba(0,255 ,0, .025)",
  "rgba(0,0,255 , .025)",
  "rgba(75,0,130,.025)",
  "rgba(143,0,255 , .025)"
];

var resized = false;

var Walker = function (x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
}


Walker.prototype.update = function (x, y) {
  this.x = x;
  this.y = y;
}


function rand(max) {
  return Math.floor((max) * Math.random());
}


window.onload = function () {

  canvas = document.querySelector('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var x = canvas.width / 2;
  var y = canvas.height / 2;

  ctx = canvas.getContext('2d');
  ctx.lineWidth = 2;

  for (var i = 0; i < 1000; i++) {
    walkers.push(new Walker(x, y, colors[rand(colors.length)]));
  }

  draw();
}


function drawEach(walker) {
  var x = walker.x, y = walker.y;

  switch (rand(4)) {
    case 0:
      if (walker.x < canvas.width) x += 5;
      break;

    case 1:
      if (walker.x > 0) x -= 5;
      break;

    case 2:
      if (walker.y < canvas.height) y += 5;
      break;

    case 3:
      if (walker.y > 0) y -= 5;
      break;
  }

  ctx.strokeStyle = walker.color;

  ctx.beginPath();
  ctx.moveTo(walker.x, walker.y);
  ctx.lineTo(x, y);
  ctx.stroke();

  walker.update(x, y);
}


function draw() {
  if (resized) {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var x = canvas.width / 2;
    var y = canvas.height / 2;


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    walkers = [];

    ctx.lineWidth = 2;

    for (var i = 0; i < 1000; i++) {
      walkers.push(new Walker(x, y, colors[rand(colors.length)]));
    }

    resized = false;
  }

  walkers.forEach(drawEach);
  requestAnimationFrame(draw);
}

window.addEventListener("resize", windowChanged);

function windowChanged() {
  resized = true;
}
