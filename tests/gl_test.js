var canvas;
var gl;
var attribPos;
var shaderProgram = null;
var shaders = null;
var lazyInitInterval = null;

function start() {
    canvas = document.getElementById("canvas");
    gl = canvasInitGL(canvas);

    if (!gl) {
        return;
    }

    gl.clearColor(0.2, 0.9, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    // Near things obscure far things
    gl.depthFunc(gl.LEQUAL);

    initShaders();
    initBuffers();
}

function initShaders() {
    shaderProgram = null;
    shaders = [
       new ShaderRequest("tests/data/shaders/basic_vert.glsl", gl.VERTEX_SHADER),
       new ShaderRequest("tests/data/shaders/basic_frag.glsl", gl.FRAGMENT_SHADER)
    ];

    lazyInitInterval = setInterval(lazyInit, 100.0);
}

function lazyInit() {
    shaderProgram = tryLinkShaderProgram(gl, shaders);
    if (!shaderProgram)
        return;

    clearInterval(lazyInitInterval);
    setInterval(render, 1000.0/60.0);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.log("Unable to initialize the shader program: " + gl.getProgramInfoLog(shaderProgram));
    }

    gl.useProgram(shaderProgram);

    attribPos = gl.getAttribLocation(shaderProgram, "aPos");
    gl.enableVertexAttribArray(attribPos);
}

function initBuffers() {
    vboSquare = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vboSquare);

    var vertices = [
    1.0,  1.0,  0.0,
    -1.0, 1.0,  0.0,
    1.0,  -1.0, 0.0,
    -1.0, -1.0, 0.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

function render() {
    Canvas.updateSize(canvas);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, vboSquare);
    gl.vertexAttribPointer(attribPos, 3, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

start();
