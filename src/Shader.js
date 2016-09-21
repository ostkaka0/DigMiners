/* Loads and compiles a shader.
 * filePath: a path relative to /shaders/.
 * type: a shader type.
 */
ShaderRequest = function(filePath, type) {
    
    this.shader = null;
    this.source = null;
    this.type = type;
    
    var client = new XMLHttpRequest();
    client.open('GET', filePath);
    client.onreadystatechange = (function() {
        this.source = client.responseText;
    }).bind(this);
    client.send();
}

/* Compiles the shader, but only if the source has been loaded from the server.
 */
ShaderRequest.prototype.tryCompile = function(gl) {
    
    if (this.shader == null && this.source != null) {
        var shader = gl.createShader(this.type);
        gl.shaderSource(shader, this.source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.log("ERROR IN "+ " SHADER : " + gl.getShaderInfoLog(shader));
          return false;
        }
        this.shader = shader;
        return true;
    }
    return false;
}

/* Links the shaders to create a useable shader program, but only if all shaders are loaded! The shaderprogram will attempt to compile any uncompiled shader.
 */
function tryLinkShaderProgram(gl, shaderRequests) {
    // Check all the shaders. Compile them if needed.
    var ready = true;
    //for (shader in shaders) {
    for (var i = 0; i < shaderRequests.length; ++i) {
        if (!shaderRequests[i].shader) {
            ready &= shaderRequests[i].tryCompile(gl);
        }
    }
    if (!ready)
        return null;
    
    var shaderProgram = gl.createProgram();
    // Attach shaders:
    for (var i = 0; i < shaderRequests.length; ++i) {
        gl.attachShader(shaderProgram, shaderRequests[i].shader);
    }
    
    gl.linkProgram(shaderProgram);
    return shaderProgram;
}

