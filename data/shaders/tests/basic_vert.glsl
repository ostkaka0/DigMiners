#version 100

attribute vec3 aPos;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

void main(void) {
    gl_Position = vec4(0.5*aPos, 1.0);//uPMatrix * uMVMatrix * vec4(aPos, 1.0);            
}
