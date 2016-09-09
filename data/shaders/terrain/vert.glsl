#version 100

attribute vec2 aPos;
attribute vec2 aUV;

uniform mat3 matVP;
uniform mat3 matM;

varying highp vec2 fragUv;
varying highp vec2 fragPos;

void main() {
	gl_Position = vec4(vec3(aPos, 1.0)*matM*matVP, 1.0);
	fragUv = aUV;
	fragPos = (vec3(aPos, 1.0)*matM).xy/32.0/30.0;
}
