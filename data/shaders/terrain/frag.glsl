#version 100

uniform sampler2D textureDensity;
uniform sampler2D textureTiles;
uniform sampler2D textureTerrain;

varying highp vec2 fragUv;
varying highp vec2 fragPos;

#define TILE_DIM 4
#define TILE_DIM_F 4.0

struct Tile {
	highp float strength;
	highp float tileID;
};


/* Noise functions */
	highp float rand(highp vec2 co)
{
	return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}  
	
highp float noise(in highp vec2 pos)
{
	highp vec2 fpos = floor(pos);
	
	highp float r = 0.0;
	
	highp float x1 = abs(1.0-fract(pos.x));
	highp float y1 = abs(1.0-fract(pos.y));
	highp float x2 = abs(fract(pos.x));
	highp float y2 = abs(fract(pos.y));
	
	
	r += rand(fpos+vec2(0.0,0.0))*x1*y1;
	r += rand(fpos+vec2(0.0,1.0))*x1*y2;
	r += rand(fpos+vec2(1.0,0.0))*x2*y1;
	r += rand(fpos+vec2(1.0,1.0))*x2*y2;
	
	return 1.0-2.0*r;
}

highp vec3 getTileColor(Tile tile) {
	highp vec2 textureTerrainPos = mod(fragPos/TILE_DIM_F/1024.0, 1.0/TILE_DIM_F) + vec2(mod(tile.tileID/TILE_DIM_F, 1.0), mod(floor(tile.tileID/TILE_DIM_F)/TILE_DIM_F, 1.0));
	return texture2D(textureTerrain, textureTerrainPos).xyz;
}

highp float getDensity(highp vec2 pos) {
	
	highp float density = texture2D(textureDensity, (pos*30.0+1.0)/32.0).x;
	highp float scale = 1.0/16.0;
	for (int i = 0; i < 3; ++i) {
		
		density += 0.2*noise(fragPos*scale);
		scale *= 2.0;
	}
	return density;
	//return 0.5*(sin(pos.x)+sin(pos.y)+2.0);
}

Tile calcTile(highp vec2 tilePos, highp vec2 delta) {
	highp float density = texture2D(textureDensity, tilePos/32.0).x;
	highp float strength = 1.0*density+clamp((1.0-delta.x)*(1.0-delta.y), 0.0, 1.0);
	highp float tileID = texture2D(textureTiles, tilePos/32.0).x*255.0;
	
	strength -= 0.166*noise(128.0*fragUv+tileID);// + vec2(0.2*tileID, 0.2*mod(tileID, 4.0)));
	strength -= 0.166*noise(256.0*fragUv+tileID);// + vec2(0.2*tileID, 0.2*mod(tileID, 4.0)));
	strength -= 0.166*noise(512.0*fragUv+tileID);// + vec2(0.2*tileID, 0.2*mod(tileID, 4.0)));
	//strength += getDensity(fragUv);
	
	return Tile(strength, tileID);
}

void main() {
	
	highp vec4 tilePos = vec4(floor(fragUv*30.0+vec2(0.5)), vec2(0.0));
	tilePos = vec4(tilePos.xy, tilePos.xy+1.0);
	
	highp vec4 delta = abs(vec4(tilePos.xy - (fragUv*30.0+0.5), tilePos.zw - (fragUv*30.0+0.5)));
	
	Tile a = calcTile(tilePos.xy, delta.xy);
	Tile b = calcTile(tilePos.zy, delta.zy);
	Tile c = calcTile(tilePos.xw, delta.xw);
	Tile d = calcTile(tilePos.zw, delta.zw);
	
	highp vec3 aColor = getTileColor(a);
	highp vec3 bColor = getTileColor(b);
	highp vec3 cColor = getTileColor(c);
	highp vec3 dColor = getTileColor(d);
	
	highp float strongest = max(max(a.strength, b.strength), max(c.strength, d.strength));
	highp float strongest2nd = -1.0;
	highp float colorStrength = 0.0;
	
	highp vec3 tileColor = vec3(0);
	highp float hardness = 2.0;
	tileColor += clamp(1.0-hardness*abs(strongest - a.strength), 0.0, 1.0)*aColor;
	tileColor += clamp(1.0-hardness*abs(strongest - b.strength), 0.0, 1.0)*bColor;
	tileColor += clamp(1.0-hardness*abs(strongest - c.strength), 0.0, 1.0)*cColor;
	tileColor += clamp(1.0-hardness*abs(strongest - d.strength), 0.0, 1.0)*dColor;
	
	colorStrength += clamp(1.0-hardness*abs(strongest - a.strength), 0.0, 1.0);
	colorStrength += clamp(1.0-hardness*abs(strongest - b.strength), 0.0, 1.0);
	colorStrength += clamp(1.0-hardness*abs(strongest - c.strength), 0.0, 1.0);
	colorStrength += clamp(1.0-hardness*abs(strongest - d.strength), 0.0, 1.0);
	
	tileColor /= colorStrength;
	
	
	/*if (b.strength > tile.strength) {
		tile = b;
	}	
	if (c.strength > tile.strength) {
		tile = c;
	}
	if (d.strength > tile.strength) {
		tile = d;
	}
	
	if (a.strength > strongest2nd && a.strength < tile.strength) {
		strongest2nd = a.strength;
	}	
	if (b.strength > strongest2nd && b.strength < tile.strength) {
		strongest2nd = b.strength;
	}	
	if (b.strength > strongest2nd && b.strength < tile.strength) {
		strongest2nd = c.strength;
	}
	if (b.strength > strongest2nd && b.strength < tile.strength) {
		strongest2nd = d.strength;
	}*/
	
	highp float deltaStrength = 1.0;//clamp(tile.strength - strongest2nd, 0.0, 1.0);
	
	//highp float dis = 0.5+0.25*raymarch(vec3(fragUv*16.0, 0.0));
	highp float density = getDensity(fragUv);
	highp float alpha = 0.5+0.5*clamp(32.0*(density-0.5), 0.0, 1.0);
	
	
	
	
	//highp float tileID = 0.0;//tile.tileID;//texture2D(textureTiles, floor(fragUv*30.0+1.0)/32.0).x*255.0;
	//highp vec2 textureTerrainPos = mod(fragUv*2.0/TILE_DIM_F, 1.0/TILE_DIM_F) + vec2(mod(tileID/TILE_DIM_F, 1.0), mod(floor(tileID/TILE_DIM_F)/TILE_DIM_F, 1.0));
	highp vec3 textureTerrainColor = tileColor;//texture2D(textureTerrain, textureTerrainPos).xyz;
	highp vec3 colorA = textureTerrainColor*clamp(0.125+density+0.5*(deltaStrength-1.0), 0.5, 1.0);
	highp vec3 colorB = textureTerrainColor*clamp(0.5-0.25*density, 0.0, 1.0);
	
	gl_FragColor = vec4(mix(colorB, colorA, clamp(32.0*(density-0.5), 0.0, 1.0)), 1.0);
	//gl_FragColor = vec4(vec3(texture2D(textureTerrain, fragUv.xy/4.0).xyz), 1.0);
    //gl_FragColor = vec4(vec3(texture2D(textureDensity, fragUv.xy).xyz), 1.0);
    //gl_FragColor = vec4(texture2D(textureTiles, fragUv).xxx, 1.0);
	//gl_FragColor = vec4(fragUv.xyy, 1.0);
	//gl_FragColor = vec4(vec3(texture2D(textureTerrain, fragPos.xy/4.0/1024.0).xyz), 1.0);
	//if (density == 0.0)
	//	gl_FragColor = vec4(vec3(1.0), 1.0);
}
