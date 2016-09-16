canvasInitGL = function(canvas) {
    gl = null;
    
    // Try to grab the standard context. If it fails, fallback to experimental.
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    // If we don't have a GL context, give up now
    if (!gl)
        document.write("<h1 style = 'position: fixed; left:24px;top:24px;'>Unable to initialize WebGL. Your browser may not support it.</h1>");

    return gl;
}

canvasUpdateSize = function(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
