g_unitTests.testMap2D = function() {
	var map = new Map2D();
	for (var x = -10; x <= 10; ++x) {
		for (var y = -10; y <= 10; ++y) {
			map.set(x, y, x*y);
		}
	}
	for (var x = -10; x <= 10; ++x) {
		for (var y = -10; y <= 10; ++y) {
			if (map.get(x, y) != x*y) {
				console.log("map["+x + ", " + y + "] = " + map.get(x, y) + ". Expected " + x*y + ".");
				return false;
			}
		}
	}
	return true;
}