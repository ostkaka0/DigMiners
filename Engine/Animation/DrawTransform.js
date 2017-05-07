

var DrawTransform = function(pos, angle, scale) {
    this.pos = pos || [0, 0];
    this.angle = angle || 0;
    this.scale = scale || [1.0, 1.0];
}
global.DrawTransform = DrawTransform;

DrawTransform.prototype.begin = function(context) {
    context.translate(this.pos[0], this.pos[1]);
    context.rotate(this.angle);
    context.scale(this.scale[0], this.scale[1]);
}

DrawTransform.prototype.end = function(context) {
    context.translate(this.pivot[0], this.pivot[1]);
    context.scale(1.0 / this.scale[0], 1.0 / this.scale[1]);
    context.rotate(-this.angle);
}

DrawTransform.prototype.toMat3 = function(mat = Mat3.create()) {
    return Mat3.translate(this.pos, Mat3.scale(this.scale, Mat3.rotate(this.angle, mat)));
}

DrawTransform.prototype.clone = function() {
    return new DrawTransform(this.pos, this.angle, this.scale, this.pivot);
}
