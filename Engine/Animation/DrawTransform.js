
var DrawTransform = function(pos, angle, scale, pivot) {
    this.pos = pos || [0, 0];
    this.angle = angle || 0;
    this.scale = scale || [1.0, 1.0];
    this.pivot = pivot || [0.5, 0.5];
}
global.DrawTransform = DrawTransform;

DrawTransform.prototype.begin = function(context) {
    context.translate(this.pos[0], this.pos[1]);
    context.rotate(this.angle);
    context.scale(this.scale[0], this.scale[1]);
    context.translate(-this.pivot[0], -this.pivot[1]);
}

DrawTransform.prototype.end = function(context) {
    context.translate(this.pivot[0], this.pivot[1]);
    context.scale(1.0 / this.scale[0], 1.0 / this.scale[1]);
    context.rotate(-this.angle);
    context.translate(-this.pos[0], -this.pos[1]);
}

DrawTransform.prototype.clone = function() {
    return new DrawTransform(this.pos, this.angle, this.scale, this.pivot);
} 
