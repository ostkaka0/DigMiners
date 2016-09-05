#version 100

attribute vec2 aPosition;
attribute vec2 aUV;

uniform mat3 vpMatrix;
uniform mat3 modelMatrix;

varying highp vec2 fragUV;

void main() {
	gl_Position = vec4(vec3(aPosition, 1.0)*modelMatrix*vpMatrix, 1.0);
	fragUV = aUV;//aPosition/30.0/32.0;
}