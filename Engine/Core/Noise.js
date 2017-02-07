

var Noise = {};
export default Noise;

Noise.rand = function(value) {
    value ^= 0xE773;
    value += (value << 5);
    value ^= (value >> 3);
    value += (value << 2);
    value ^= (value >> 7);
    value += (value << 15);
    value ^= (value >> 11);
    return value;
}

Noise.nextInt = function(seed) {
    return Noise.rand(seed[0]++);
}

/*noiseNextFix = function(seed) {
    return fix.div(noiseNextInt(seed)%32768, 32768);
}

noiseNextV2 = function(seed) {
    return [noiseNextFix(seed), noiseNextFix(seed)];
}
*/
