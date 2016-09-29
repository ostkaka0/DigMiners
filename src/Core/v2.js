v2 = {};

v2.create = function(x, y) {
    var v = [toFix(x), toFix(y)];

    //  // Temporary properties
    //  Object.defineProperties(v, {
    //      x: {
    //          get: function () { return v[0]; },
    //          set: function (value) { v[0] = value; }
    //      },
    //      y: {
    //          get: function () { return v[1]; },
    //          set: function (value) { v[1] = value; }
    //      },
    //  });

    return v;
}

v2.clone = function(a) {
    return [a[0], a[1]];
}

v2.copy = function(a, out) {
    out[0] = a[0];
    out[1] = a[1];
}

v2.add = function(a, b, out) {
    out[0] = fix.add(a[0], b[0]);
    out[1] = fix.add(a[1], b[1]);
}

v2.sub = function(a, b, out) {
    out[0] = fix.sub(a[0], b[0]);
    out[1] = fix.sub(a[1], b[1]);
}

/* c: constant - float
 * a: v2     - float[2]
 */
v2.mul = function(c, a, out) {
    out[0] = fix.mul(c, a[0]);
    out[1] = fix.mul(c, a[1]);
}

/* c: constant - float
 * a: v2     - float[2]
 */
v2.div = function(a, c, out) {
    out[0] = fix.div(a[0], c);
    out[1] = fix.div(a[1], c);
}

/* c: constant - float
 * a: v2     - float[2]
 */
v2.mod = function(a, c, out) {
    out[0] = a[0] % toFix(c);
    out[1] = a[1] % toFix(c);
}


v2.normalize = function(a, out) {
    var length = v2.length(a);
    if(length == 0)
        return;
    out[0] = fix.div(a[0], length);
    out[1] = fix.div(a[1], length);
}


/*****************************************
 * Float output functions:
 *****************************************/
v2.length = function(a) {
    return fix.sqrt(fix.add(fix.mul(a[0], a[0]), fix.mul(a[1], a[1])));
}

v2.lengthSquared = function(a) {
    return fix.add(fix.mul(a[0], a[0]), fix.mul(a[1], a[1]));
}

v2.distance = function(a, b) {
    var diff = {};
    v2.sub(a, b, diff);
    return v2.length(diff);
}

v2.distanceSquared = function(a, b) {
    var diff = {};
    v2.sub(a, b, diff);
    return v2.lengthSquared(diff);
}

v2.dot = function(a, b) {
    return fix.add(fix.mul(a[0], b[0]), fix.mul(a[1], b[1]));
}

v2.clampF = function(a, min, max) {
    min = toFix(min);
    max = toFix(max);
    if(min <= max) {
        return Math.max(Math.min(a, max), min);
    }
    else {
        return Math.max(Math.min(a, min), max);
    }
}
