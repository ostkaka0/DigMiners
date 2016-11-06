fix = {};
fix.denominator = 0x10000;
// Convert float to 32 bit fixed point with 16 bit fraction.
// Must be done after each operation.
// Example: toFix(toFix(toFix(a*b)/3)+14.3)
toFix = function(a) {
    return (a * 0x10000 >> 0) % 0x100000000 / 0x10000;
}

fixToInt32 = function(a) {
    return a * 0x10000 >> 0;
}

fixFromInt32 = function(a) {
    return a / 0x10000;
}

isFix = function(a) {
    return (toFix(a) == a);
}

fix.add = function(a, b) { return toFix(a + b); }
fix.sub = function(a, b) { return toFix(a - b); }
fix.mul = function(a, b) { return toFix(a * b); }
fix.div = function(a, b) { return toFix(a / b); }


fix.exp = function(a) { return toFix(Math.exp(a)); }
fix.log = function(a) { return toFix(Math.log(a)); }
fix.pow = function(a, b) { return toFix(Math.pow(a, b)); }
fix.sqrt = function(a) { return toFix(Math.sqrt(a)); }

fix.sin = function(a) { return toFix(Math.sin(a)); }
fix.cos = function(a) { return toFix(Math.cos(a)); }
fix.tan = function(a) { return toFix(Math.tan(a)); }
fix.asin = function(a) { return toFix(Math.asin(a)); }
fix.acos = function(a) { return toFix(Math.acos(a)); }
fix.atan = function(a) { return toFix(Math.atan(a)); }
fix.atan2 = function(a, b) { return toFix(Math.atan2(a, b)); }
