const socket = io();

const ball = document.querySelector('.ball');
const body = document.querySelector('body');

const maxX = body.clientWidth - ball.clientWidth;
const maxY = body.clientHeight - ball.clientHeight;
const ballWidth = ball.clientWidth;
const ballHeight = ball.clientheight;

function deviceOrientation (event) {
  const absolute = event.absolute;
  const zAsse    = event.alpha;
  let xAsse    = event.beta;   // range [-180,180]
  let yAsse    = event.gamma; // range [-90,90]
  const halfBall = 100;

  // not have device upside down
  if (xAsse > 90) { xAsse = 90 };
  if (yAsse > 90) { yAsse = 90 };

  // shift x and y range to 0,180
  xAsse = xAsse + 90;
  yAsse = yAsse + 90;


  ball.style.top = (maxX * xAsse / 180 - halfBall) + 'px';
  ball.style.left = (maxY * yAsse / 180 - halfBall) + 'px';

  let direction;
  // TODO: find the direction of the slide!
  if (xAsse >= 0 && xAsse <= 90 && yAsse >= 0 && yAsse <= 180) {
    direction = 'right'
  }
  if (xAsse >= 90 && xAsse <= 180 && yAsse >= 0 && yAsse <= 180) {
    direction = 'left'
  }
  if (yAsse >= 0 && yAsse <= 90 && xAsse >= 0 && xAsse <= 180) {
    direction = 'bottom'
  }
  if (yAsse >= 90 && yAsse <= 180 && xAsse >= 0 && xAsse <= 180) {
    direction = 'top'
  }
  console.log('direction', direction)

  socket.emit('orientationEvent', direction);
  // TODO: change color of the slide of the square (which is now a ball)
  // ball.style.background = 'blue';
}


if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', deviceOrientation, true)
} else {
  window.addEventListener('ondeviceorientation', deviceOrientation)
}

