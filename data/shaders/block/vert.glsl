#version 100

attribute vec2 aPos;
attribute vec2 aUV;
attribute vec2 aBreakUV;

uniform mat3 matVP;
uniform mat3 matM;

varying highp vec2 fragPos;
varying highp vec2 fragUV;
varying highp vec2 breakUV;

void main() {
	gl_Position = vec4(vec3(aPos, 1.0)*matM*matVP, 1.0);
	fragPos = (vec3(aPos, 1.0)*matM).xy;
	fragUV = aUV;
	breakUV = aBreakUV;
}
