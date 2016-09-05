var DATA_PATH = "../data/";

var canvas;
var gl;
var shaderProgram;
var attribPos;

function start() {
    canvas = document.getElementById("canvas");

    // Initialize the GL context
    gl = initWebGL(canvas);

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

function initWebGL(canvas) {
    gl = null;

    // Try to grab the standard context. If it fails, fallback to experimental.
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    // If we don't have a GL context, give up now
    if (!gl)
        alert("Unable to initialize WebGL. Your browser may not support it.");

    return gl;
}

function initShaders() {
    var shaderVert = getShader(gl, "shader-vert");
    var shaderFrag = getShader(gl, "shader-frag");
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

    if (!shaderScript) {
        return null;
    }

    theSource = shaderScript.text;

    if (!type) {
        if (shaderScript.type == "x-shader/x-fragment") {
            type = gl.FRAGMENT_SHADER;
        } else if (shaderScript.type == "x-shader/x-vertex") {
            type = gl.VERTEX_SHADER;
        } else {
          // Unknown shader type
          return null;
        }
    }
    shader = gl.createShader(type);

    gl.shaderSource(shader, theSource);

    // Compile the shader program
    gl.compileShader(shader);  

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {  
        alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));  
        gl.deleteShader(shader);
        return null;  
    }
    
  return shader;
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
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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
