import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";

var DisField = {};
export default DisField;

DisField.pageDim = 8;

DisField.getPageAndIndex = function(disField, pos) {
	var pageX = Math.floor(pos[0] / DisField.pageDim);
	var pageY = Math.floor(pos[1] / DisField.pageDim);
	var localX = Math.floor(pos[0]) - pageX * DisField.pageDim;
	var localY = Math.floor(pos[1]) - pageY * DisField.pageDim;
	var page = disField.get(pageX, pageY);
	if (!page) {
		page = new Uint16Array(DisField.pageDim * DisField.pageDim);
		page.fill(65535);
		disField.set(pageX, pageY, page);
	}
	return [page, localX + localY * DisField.pageDim];
}

DisField.getTileDis = function(disField, tilePos) {
	var pageAndIndex = DisField.getPageAndIndex(disField, tilePos)
	var page = pageAndIndex[0];
	var index = pageAndIndex[1];
	return Math.min(1024, page[index]);
}

DisField.calcDis = function(disField, pos) {
	var x1 = Math.floor(pos[0] - 0.5);
	var y1 = Math.floor(pos[1] - 0.5);
	var x2 = x1 + 1;
	var y2 = y1 + 1;

	var fractX = pos[0] - 0.5 - x1;
	var fractY = pos[1] - 0.5 - y1;

	var a = [
		1.0 - fractX,
		1.0 - fractY,
		fractX,
		fractY
	];
	var b = [
		fix.div(DisField.getTileDis(disField, [x1, y1]), 10),
		fix.div(DisField.getTileDis(disField, [x2, y1]), 10),
		fix.div(DisField.getTileDis(disField, [x1, y2]), 10),
		fix.div(DisField.getTileDis(disField, [x2, y2]), 10)
	];

	return a[0] * a[1] * b[0] +
		a[2] * a[1] * b[1] +
		a[0] * a[3] * b[2] +
		a[2] * a[3] * b[3];
}

DisField.calcDir = function(disField, pos) {
	var epsilon = fix.toFix(0.5);
	var a = -DisField.calcDis(disField, v2.create(pos[0] + epsilon, pos[1]));
	var b = -DisField.calcDis(disField, v2.create(pos[0] - epsilon, pos[1]));
	var c = -DisField.calcDis(disField, v2.create(pos[0], pos[1] + epsilon));
	var d = -DisField.calcDis(disField, v2.create(pos[0], pos[1] - epsilon));

	var f = [Math.max(-1, Math.min(1, +a - b)), 0];
	var g = [0, 0];
	var h = [0, Math.max(-1, Math.min(1, +c - d))];
	var i = [0, 0];

	var vec = v2.create(0, 0);
	v2.add(vec, f, vec);
	v2.add(vec, g, vec);
	v2.add(vec, h, vec);
	v2.add(vec, i, vec);
	v2.normalize(vec, vec);

	return vec;
}

DisField.calcTileDir = function(disField, pos) {
	var dis = DisField.getTileDis(disField, [pos[0], pos[1]]);
	var a = DisField.getTileDis(disField, [pos[0] + 1, pos[1]]);
	var b = DisField.getTileDis(disField, [pos[0] - 1, pos[1]]);
	var c = DisField.getTileDis(disField, [pos[0], pos[1] + 1]);
	var d = DisField.getTileDis(disField, [pos[0], pos[1] - 1]);

	var dir = [0, 0];
	if (a < dis && b > dis)
		dir[0] = 1;
	else if (b < dis && a > dis)
		dir[0] = -1;
	if (c < dis && d > dis)
		dir[1] = 1;
	else if (d < dis && c > dis)
		dir[1] = -1;

	return dir;
}
