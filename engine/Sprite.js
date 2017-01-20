
drawSprite = function(context, image, pos, angle, size, midPoint) {
    pos = pos || [0, 0];
    angle = angle || 0;
    size = size || [1.0, 1.0];
    midPoint = midPoint || [0.5, 0.5];
    
    context.translate(pos[0], pos[1]);
    context.rotate(angle);
    context.drawImage(image, -midPoint[0] * size[0], -midPoint[1] * size[1], size[0], size[1]);
    context.rotate(-angle);
    context.translate(-pos[0], -pos[1]);
}
