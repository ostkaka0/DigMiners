PATH_PAGE_DIM = 8;


// Generate flowfield using backward a-star(from goal to start)
aStarFlowField = function(disField, expandList, tileWorld, blockWorld, start, goal, maxDistance) {
    expandList = expandList || [];

    var childDirs = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
    var childDirWeights = [10, 15, 10, 15, 10, 15, 10, 15];

    var getPageAndIndex = function(pos) {
        var pageX = Math.floor(pos[0] / PATH_PAGE_DIM);
        var pageY = Math.floor(pos[1] / PATH_PAGE_DIM);
        var localX = Math.floor(pos[0]) - pageX * PATH_PAGE_DIM;
        var localY = Math.floor(pos[1]) - pageY * PATH_PAGE_DIM;
        var page = disField.get(pageX, pageY);
        if (!page) {
            page = new Uint16Array(PATH_PAGE_DIM * PATH_PAGE_DIM);
            page.fill(65535);
            disField.set(pageX, pageY, page);
        }
        return [page, localX + localY * PATH_PAGE_DIM];
    }

    var calcDis = function(a, b) {
        var deltaX = Math.abs(a[0] - b[0]);
        var deltaY = Math.abs(a[1] - b[1]);
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        return deltaX + deltaY - Math.abs(deltaX - deltaY);
    }

    var calcPathCost = function(pos) {
        var pageAndIndex = getPageAndIndex(pos);
        var page = pageAndIndex[0];
        var index = pageAndIndex[1];
        return page[index] / 12.0 + calcDis(pos, start);
    }
    var expandListCompare = function(a, b) {
        return calcPathCost([a << 16 >> 16, a >> 16]) - calcPathCost([b << 16 >> 16, b >> 16]);
    }
    expandList.sort(expandListCompare);

    // Check if path already exists!
    {
        var startPageAndIndex = getPageAndIndex(start);
        var startPage = startPageAndIndex[0];
        var startIndex = startPageAndIndex[1];
        if (startPage[startIndex] != 65535)
            return;
    }

    // Create first node at goal
    if (expandList.length == 0) {
        expandList.push((goal[0] & 0xFFFF) | ((goal[1] & 0xFFFF) << 16));
        var basePageAndIndex = getPageAndIndex(goal);
        var basePage = basePageAndIndex[0];
        var baseIndex = basePageAndIndex[1]
        basePage[baseIndex] = 0;
    }



    while (expandList.length != 0) {
        var basePos = [expandList[0] << 16 >> 16, expandList[0] >> 16];
        expandList.shift();
        var basePageAndIndex = getPageAndIndex(basePos);
        var basePage = basePageAndIndex[0];
        var baseIndex = basePageAndIndex[1]
        var baseDis = basePage[baseIndex];

        for (var i = 0; i < 8; i++) {
            var pos = [0, 0];
            v2.add(basePos, childDirs[i], pos);
            var pageAndIndex = getPageAndIndex(pos);
            var page = pageAndIndex[0];
            var index = pageAndIndex[1];
            var density = getDensity(tileWorld, pos[0], pos[1]);
            var dis = baseDis + childDirWeights[i] + 20 * density / 255;
            if (dis > maxDistance)
                continue;
            if (density > 127)
                continue;
            if (getForeground(blockWorld, pos[0], pos[1]) != 0)
                continue;
            if (page[index] > dis) {
                page[index] = dis;
                var insertIndex = binarySearch(expandList, dis / 12.0 + calcDis(pos, start), function(a, b) { return calcPathCost([a << 16 >> 16, a >> 16]) - b; });
                expandList.splice(insertIndex, 0, (pos[0] & 0xFFFF) | ((pos[1] & 0xFFFF) << 16));
            }
        }
        if (basePos[0] == start[0] && basePos[1] == start[1])
            break;
    }

}

genFlowField = function(flowField, worldRect, tileWorld, blockWorld, goal, maxDistance) {
    maxDistance = maxDistance | 0xF000;
    if (!flowField)
        flowField = new Uint16Array(worldRect[2] * worldRect[3]);
    flowField.fill(0xFFFF);

    // Init expandList with first node at goal
    var expandList = [(goal[0] & 0xFFFF) | ((goal[1] & 0xFFFF) << 16)];
    flowField[goal[0] - worldRect[0] + (goal[1] - worldRect[1]) * worldRect[2]] = 0;

    while (expandList.length != 0) {
        var basePos = [expandList[0] << 16 >> 16, expandList[0] >> 16];
        expandList.shift();
        var baseDis = flowField[basePos[0] - worldRect[0] + (basePos[1] - worldRect[1]) * worldRect[2]];

        for (var i = 0; i < 4; i++) {
            var pos = [basePos[0] + (i & 1) - (i >> 1), basePos[1] + (i & 1 ^ 1) - (i >> 1)];
            if (pos[0] < worldRect[0] || pos[1] < worldRect[0] || pos[0] >= worldRect[2] + worldRect[0] || pos[1] >= worldRect[3] + worldRect[1])
                continue;
            var index = pos[0] - worldRect[0] + (pos[1] - worldRect[1]) * worldRect[2];
            var dis = baseDis + 1;
            if (getDensity(tileWorld, pos[0], pos[1]) > 127)
                continue;
            if (getForeground(blockWorld, pos[0], pos[1]) != 0)
                continue;
            if (flowField[index] > dis && dis < maxDistance) {
                flowField[index] = dis;
                var insertIndex = binarySearch(expandList, dis, function(a, b) { return flowField[(a << 16 >> 16) - worldRect[0] + ((a >> 16) - worldRect[1]) * worldRect[2]] - b; });
                expandList.splice(insertIndex, 0, (pos[0] & 0xFFFF) | ((pos[1] & 0xFFFF) << 16));
            }
        }
    }
    return flowField;
}
