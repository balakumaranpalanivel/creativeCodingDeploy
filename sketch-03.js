//const canvasSketch = require('canvas-sketch');
//const math = require('canvas-sketch-util/math');
//const random = require('canvas-sketch-util/random');


import canvasSketch from 'canvas-sketch';
import * as math from 'canvas-sketch-util/math.js';  // Add .js extension
import * as random from 'canvas-sketch-util/random.js';  // Add .js extension

const settings = {
  dimensions: [1080, 1080],
  animate: true
};

const getRandomColor = () => {
  const getRandomNumber = () => Math.floor(Math.random() * 256);
  return 'rgb(' + getRandomNumber() + ',' + getRandomNumber() + ',' + getRandomNumber() + ')';
}

const sketch = ({ context, width, height }) => {

  const agents = []

  for (let i = 0; i < 100; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x, y));
  }

  const lineColor = []

  for (let i = 0; i < agents.length; i++) {
    lineColor.push(getRandomColor());
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white ';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const fromAgent = agents[i]

      for (let j = i + 1; j < agents.length; j++) {
        const toAgent = agents[j];

        context.strokeStyle = lineColor[i];

        const dist = fromAgent.point.getDistance(toAgent.point);
        if (dist > 200) continue;

        context.lineWidth = math.mapRange(dist, 0, 200, 12, 1);

        context.beginPath();
        context.moveTo(fromAgent.point.x, fromAgent.point.y);
        context.lineTo(toAgent.point.x, toAgent.point.y);
        context.stroke();
      }
    }

    agents.forEach(agent => {
      agent.draw(context);
      agent.update();
      agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y) {
    this.radius = random.range(4, 12);
    this.point = new Vector(x, y)
    this.velocity = new Vector(random.range(-0.5, 0.5), random.range(-0.5, 0.5))
  }

  update() {
    this.point.x += this.velocity.x;
    this.point.y += this.velocity.y;
  }

  bounce(width, height) {
    if (this.point.x <= 0 || this.point.x >= width) this.velocity.x *= -1;
    if (this.point.y <= 0 || this.point.y >= height) this.velocity.y *= -1;
  }

  draw(context) {
    context.save();

    context.translate(this.point.x, this.point.y);

    context.lineWidth = 4;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }
}

