#version 100

attribute vec2 aPosition;
attribute vec2 aUV;

uniform mat3 vpMatrix;
uniform mat3 modelMatrix;

varying highp vec2 fragUv;
varying highp vec2 fragPos;

void main() {
	gl_Position = vec4(vec3(aPosition, 1.0)*modelMatrix*vpMatrix, 1.0);
	fragUv = aUV;
	fragPos = (vec3(aPosition, 1.0)*modelMatrix).xy/32.0/30.0;
}