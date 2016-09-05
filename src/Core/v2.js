v2 = {};

v2.create = function(x, y) {
	var v = [x, y];
	
	// Temporary properties
	Object.defineProperties(v, {
		x: {
			get: function () { return v[0]; },
			set: function (value) { v[0] = value; }
		},
		y: {
			get: function () { return v[1]; },
			set: function (value) { v[1] = value; }
		},
	});
	
	return v;
}

v2.clone = function(a) {
	return [a[0], a[1]];
}

v2.add = function(a, b, out) {
	out[0] = a[0]+b[0];
	out[1] = a[1]+b[1];
}

v2.subtract = function(a, b, out) {
	out[0] = a[0]-b[0];
	out[1] = a[1]-b[1];
}

/* c: constant - float
 * a: v2     - float[2]
 */
v2.multiply = function(c, a, out) {
	out[0] = c*a[0];
	out[1] = c*a[1];
}

/* c: constant - float
 * a: v2     - float[2]
 */
v2.divide = function(a, c, out) {
	out[0] = a[0]/c;
	out[1] = a[1]/c;
}

/* c: constant - float
 * a: v2     - float[2]
 */
v2.mod = function (a, c, out) {
	out[0] = a[0]%c;
	out[1] = a[1]%c;
}


v2.normalize = function(a, out) {
	var length = v2.length(a);
	out[0] = a[0]/length;
	out[1] = a[1]/length;
}


/*****************************************
 * Float output functions:
 *****************************************/
v2.length = function(a) {
	return Math.sqrt(a[0]*a[0] + a[1]*a[1]);
}

v2.lengthSquared = function(a) {
	return a[0]*a[0] + a[1]*a[1];
}

v2.dot = function(a, b) {
	return a[0]*b[0] + a[1]*b[1];
}

v2.clampF = function(a, min, max) {
	if (min <= max) {
		return Math.max(Math.min(a, max), min);
	}
	else {
		return Math.max(Math.min(a, min), max);
	}
	
}