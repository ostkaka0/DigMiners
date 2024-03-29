var Canvas = {};
global.Canvas = Canvas;

Canvas.initGL = function(canvas) {
    var gl = null;

    // Try to grab the standard context. If it fails, fallback to experimental.
    gl = canvas.getContext("webgl", { antialias: false }) || canvas.getContext("experimental-webgl", { antialias: false });

    // If we don't have a GL context, give up now
    if (!gl)
        document.write("<h1 style = 'position: fixed; left:24px;top:24px;'>Unable to initialize WebGL. Your browser may not support it.</h1>");

    // Blending disabled because it makes blocks ugly
    //gl.enable(gl.BLEND);
    //gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_COLOR);

    return gl;
}

Canvas.updateSize = function(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
