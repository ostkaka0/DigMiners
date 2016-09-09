var DATA_PATH = "../data/";

var canvas;
var gl;
var shaderProgram;
var attribPos;

function start() {
    canvas = document.getElementById("canvas");

    // Initialize the GL context
    gl = canvasInitGL(canvas);

    // Only continue if WebGL is available and working
    if (!gl) {
        return;
    }

    // Set clear color to black, fully opaque
    gl.clearColor(0.2, 0.9, 0.0, 1.0);
    // Enable depth testing
    gl.enable(gl.DEPTH_TEST);
    // Near things obscure far things
    gl.depthFunc(gl.LEQUAL);
    // Clear the color as well as the depth buffer.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    initShaders();
    initBuffers();

    setInterval(render, 1000.0/60.0);
}

/*function initShaders() {
    var shaderVert = getShader(gl, "data/shaders/tests/basic_vert.glsl", gl.VERTEX_SHADER);
    var shaderFrag = getShader(gl, "data/shaders/tests/basic_frag.glsl", gl.FRAGMENT_SHADER);
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, shaderVert);
    gl.attachShader(shaderProgram, shaderFrag);
    gl.linkProgram(shaderProgram);
    // TODO: Detach shaders
      
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert("Unable to initialize the shader program: " + gl.getProgramInfoLog(shader));
    }

    gl.useProgram(shaderProgram);

    attribPos = gl.getAttribLocation(shaderProgram, "aPos");
    gl.enableVertexAttribArray(attribPos);
}

function getShader(gl, id, type) {
    var shaderScript, theSource, currentChild, shader;

    shaderScript = document.getElementById(id);

    if (!shaderScript)
        return null;

    source = shaderScript.src;

    console.log(source);

    if (!type)
          return null;

    shader = gl.createShader(type);

    gl.shaderSource(shader, source);

    // Compile the shader program
    gl.compileShader(shader);  

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {  
        console.log("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader)) + gl.get;  
        gl.deleteShader(shader);
        return null;  
    }
    
  return shader;
}*/

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
    canvasUpdateSize(canvas);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //perspectiveMatrix = makePerspective(45, canvas.width/canvas.height, 0.1, 100.0);

    //loadIdentity();
    //mvTranslate([-0.0, 0.0, -6.0]);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vboSquare);
    gl.vertexAttribPointer(attribPos, 3, gl.FLOAT, false, 0, 0);
    //setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

start();
