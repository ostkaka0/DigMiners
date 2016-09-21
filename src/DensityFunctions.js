getDensity = function(terrainWorld, x, y) {
    var localX = x%CHUNK_DIM;
    var localY = y%CHUNK_DIM;
    var chunkX = (x-localX)/CHUNK_DIM;
    var chunkY = (y-localY)/CHUNK_DIM;
    
    // Fix indexing of negative values:
    if (x < 0) {
        chunkX--;
        localX = (x-chunkX*CHUNK_DIM)%CHUNK_DIM;
    }
    if (y < 0) {
        chunkY--;
        localY = (y-chunkY*CHUNK_DIM)%CHUNK_DIM;
    }
    
    var chunk = terrainWorld.get(chunkX, chunkY);
    if (!chunk) {
        return 255;
    }
    
    return chunk.getDensity(localX, localY);
}

calcDensity = function(terrainWorld, x, y) {
    var x1 = Math.floor(x-0.5);
    var y1 = Math.floor(y-0.5);
    var x2 = x1 + 1;
    var y2 = y1 + 1;
        
    var fractX = x - 0.5 - x1;
    var fractY = y - 0.5 - y1;
    
    var a = [
        1.0 - fractX,
        1.0 - fractY,
        fractX,
        fractY
    ];
    var b = [
        getDensity(terrainWorld, x1, y1),
        getDensity(terrainWorld, x2, y1),
        getDensity(terrainWorld, x1, y2),
        getDensity(terrainWorld, x2, y2)
    ];
    
    return a[0] * a[1] * b [0] +
           a[2] * a[1] * b [1] +
           a[0] * a[3] * b [2] +
           a[2] * a[3] * b [3];
}

calcDir = function(terrainWorld, x, y) {
    var epsilon = 0.1;
    var a = -calcDensity(terrainWorld, x+epsilon, y+epsilon);
    var b = -calcDensity(terrainWorld, x-epsilon, y+epsilon);
    var c = -calcDensity(terrainWorld, x-epsilon, y-epsilon);
    var d = -calcDensity(terrainWorld, x+epsilon, y-epsilon);
    
    var f = v2.create(+a, +a);
    var g = v2.create(-b, +b);
    var h = v2.create(-c, -c);
    var i = v2.create(+d, -d);
    
    var vec = v2.create(0, 0);
    v2.add(vec, f, vec);
    v2.add(vec, g, vec);
    v2.add(vec, h, vec);
    v2.add(vec, i, vec);
    v2.div(vec, 255.0, vec);
    
    return vec;
}

calcNormal = function(terrainWorld, x, y) {
    var vec = calcDir(terrainWorld, x, y)
    if (v2.lengthSquared(vec) > 0.0)
        v2.normalize(vec, vec);
    
    return vec;
}