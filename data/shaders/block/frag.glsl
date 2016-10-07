#version 100

uniform sampler2D textureTiles;

varying highp vec2 fragPos;
varying highp vec2 fragUV;

#define TILE_DIM 4
#define TILE_DIM_F 4.0

void main() {
    highp vec3 color = texture2D(textureTiles, fragUV).rgb;
	gl_FragColor = vec4(color, 1.0);
}
