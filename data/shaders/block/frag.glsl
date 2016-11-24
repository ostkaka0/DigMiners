#version 100

uniform sampler2D textureTiles;
uniform sampler2D textureBlockBreak;

varying highp vec2 fragPos;
varying highp vec2 fragUV;
varying highp vec2 breakUV;

#define TILE_DIM 4
#define TILE_DIM_F 4.0

void main() {
    highp vec4 color = texture2D(textureTiles, fragUV - vec2(0., 1./16./64.));
    highp vec4 breakColor = texture2D(textureBlockBreak, breakUV);
	gl_FragColor = color;//mix(color, breakColor, breakColor.a);
}
