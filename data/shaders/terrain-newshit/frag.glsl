#version 100

//uniform sampler2D densityTexture;
uniform sampler2D texture;

varying highp vec2 fragUV;


void main() {
	//gl_FragColor = vec4(fragUV, 0.0, 1.0);
	gl_FragColor = vec4(texture2D(texture, fragUV).xyz, 1.0);
}