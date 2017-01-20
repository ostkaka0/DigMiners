
DrawTransform = function(pos, angle, scale, midPoint) {
    this.pos = pos || [0, 0];
    this.angle = angle || 0;
    this.scale = scale || [1.0, 1.0];
    this.midPoint = midPoint || [0.5, 0.5];
}

DrawTransform.prototype.begin = function(context) {
    context.translate(this.pos[0], this.pos[1]);
    context.rotate(this.angle);
    context.scale(this.scale[0], this.scale[1]);
    context.translate(-this.midPoint[0], -this.midPoint[1]);
}

DrawTransform.prototype.end = function(context) {
    context.translate(this.midPoint[0], this.midPoint[1]);
    context.scale(1.0 / this.scale[0], 1.0 / this.scale[1]);
    context.rotate(-this.angle);
    context.translate(-this.pos[0], -this.pos[1]);
}

DrawTransform.prototype.clone = function() {
    return new DrawTransform(this.pos, this.angle, this.scale, this.midPoint);
}
