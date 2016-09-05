// Convert float to 32 bit fixed point with 16 bit fraction.
// Must be done after each operation.
// Example: fix(fix(fix(a*b)/3)+14.3)
function fix(a) {
    return (Math.floor(a*0x10000)%0x100000000)/0x10000);
}

function isFix(a) {
    return (fix(a) == a);
}

function fixAdd(a, b) { return fix(a+b); }
function fixSub(a, b) {  return fix(a-b); }
function fixMul(a, b) {  return fix(a*b); }
function fixDiv(a, b) { return fix(a/b); }


function fixExp(a) { return fix(Math.exp(a)); }
function fixLog(a) { return fix(Math.log(a)); }
function fixPow(a, b) { return fix(Math.pow(a, b)); }
function fixSqrt(a) { return fix(Math.sqrt(a)); }

function fixSin(a) { return fix(Math.sin(a)); }
function fixCos(a) { return fix(Math.cos(a)); }
function fixTan(a) { return fix(Math.tan(a)); }
function fixAsin(a) { return fix(Math.asin(a)); }
function fixAcos(a) { return fix(Math.acos(a)); }
function fixAtan(a) { return fix(Math.atan(a)); }
function fixAtan2(a, b) { return fix(Math.atan2(a, b)); }
