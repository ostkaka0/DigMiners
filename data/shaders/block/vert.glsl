#version 100

attribute vec2 aPos;
attribute vec2 aUV;

uniform mat3 matVP;
uniform mat3 matM;

varying highp vec2 fragPos;
varying highp vec2 fragUV;

void main() {
	gl_Position = vec4(vec3(aPos, 1.0)*matM*matVP, 1.0);
	fragUV = aUV;
	fragPos = (vec3(aPos, 1.0)*matM).xy;
}
