
var Particles = {};
global.Particles = Particles;

Particles.Bullet = {
    size: 1,
    alphaStart: 1.0,
    alphaEnd: 0.0,
    angleStart: 0.0,
    angleEnd: 10.0,
    scaleStart: [1.0, 1.0],
    scaleEnd: [3.4, 3.4],
    colorStart: [255, 247, 143],
    colorEnd: [0, 0, 0],
    accelerationStart: 1.0,
    accelerationEnd: 1.0,
    lifeTime: 100,
}

Particles.Blood = {
    size: 2,
    alphaStart: 1.0,
    alphaEnd: 0.0,
    angleStart: 0.0,
    angleEnd: 10.0,
    scaleStart: [1.0, 1.0],
    scaleEnd: [3.4, 3.4],
    colorStart: [138, 7, 7],
    colorEnd: [138, 7, 7],
    accelerationStart: 1.0,
    accelerationEnd: 1.0,
    lifeTime: 300,
}

Particles.Smoke = {
    size: 15,
    alphaStart: 1.0,
    alphaEnd: 0.0,
    angleStart: 0.0,
    angleEnd: 10.0,
    scaleStart: [1.0, 1.0],
    scaleEnd: [0.4, 0.4],
    colorStart: [227, 140, 45],
    colorEnd: [0,0,0],
    accelerationStart: 1.2,
    accelerationEnd: 1.0,
    lifeTime: 400,
}
