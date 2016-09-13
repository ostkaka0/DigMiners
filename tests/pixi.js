var canvas = document.getElementById("canvas");
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {'transparent':true});
renderer.view.style.position = 'absolute';
renderer.view.style.left = '0%';
renderer.view.style.top = '0%';
document.body.appendChild(renderer.view);
window.requestAnimationFrame(render);

var texture = PIXI.Texture.fromImage("data/textures/cheese.png");
var cheese = new PIXI.Sprite(texture);
cheese.anchor.x = 0.5;
cheese.anchor.y = 0.5;
cheese.position.x = 200;
cheese.position.y = 150;

function render() {
    window.requestAnimationFrame(render);
    cheese.rotation += 0.1;
    renderer.render(cheese);
}
