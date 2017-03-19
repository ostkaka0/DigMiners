var fix = {};
global.fix = fix;
fix.denominator = 0x10000;
// Convert float to 32 bit fixed point with 16 bit fraction.
// Must be done after each operation.
// Example: fix.toFix(fix.toFix(fix.toFix(a*b)/3)+14.3)
fix.toFix = function(a) {
    return (a * 0x10000 >> 0) % 0x100000000 / 0x10000;
}

fix.fixToInt32 = function(a) {
    return a * 0x10000 >> 0;
}

fix.fixFromInt32 = function(a) {
    return a / 0x10000;
}

fix.isFix = function(a) {
    return (fix.toFix(a) == a);
}

fix.add = function(a, b) { return fix.toFix(a + b); }
fix.sub = function(a, b) { return fix.toFix(a - b); }
fix.mul = function(a, b) { return fix.toFix(a * b); }
fix.div = function(a, b) { return fix.toFix(a / b); }


fix.exp = function(a) { return fix.toFix(Math.exp(a)); }
fix.log = function(a) { return fix.toFix(Math.log(a)); }
fix.pow = function(a, b) { return fix.toFix(Math.pow(a, b)); }
fix.sqrt = function(a) { return fix.toFix(Math.sqrt(a)); }

fix.sin = function(a) { return fix.toFix(Math.sin(a)); }
fix.cos = function(a) { return fix.toFix(Math.cos(a)); }
fix.tan = function(a) { return fix.toFix(Math.tan(a)); }
fix.asin = function(a) { return fix.toFix(Math.asin(a)); }
fix.acos = function(a) { return fix.toFix(Math.acos(a)); }
fix.atan = function(a) { return fix.toFix(Math.atan(a)); }
fix.atan2 = function(a, b) { return fix.toFix(Math.atan2(a, b)); }
