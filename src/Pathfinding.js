var PATH_PAGE_DIM = 8;


// Generate flowfield using backward a-star(from goal to start)
aStarFlowField = function(disField, expandList, tileWorld, blockWorld, start, goal) {
    expandList = expandList || [];
    
    var childDirs = [ [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
    var childDirWeights = [10, 14, 10, 14, 10, 14, 10, 14];
    
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
    
    var calcPathCost = function(pos) {
        var pageAndIndex = getPageAndIndex(pos);
        var page = pageAndIndex[0];
        var index = pageAndIndex[1];
        return page[index] + v2.distance(pos, start);
    }
    var expandListCompare = function(a, b) {
        return calcPathCost([a & 0xFFFF, a >> 16]) - calcPathCost([b & 0xFFFF, b >> 16]);
    }
    expandList.sort(expandListCompare);
    

    
    if (expandList.length == 0) {
        expandList.push(goal[0] & 0xFFFF) | ((goal[1] & 0xFFFF) << 16);
        var basePageAndIndex = getPageAndIndex(goal);
        var basePage = basePageAndIndex[0];
        var baseIndex = basePageAndIndex[1]
        basePage[baseIndex] = 0;
    }
    
    while(expandList.length != 0) {
        var basePos = [expandList[0] & 0xFFFF, expandList[0] >> 16];
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
            var dis = baseDis + childDirWeights[i];
            if (page[index] > dis) {
                page[index] = dis;
                var insertIndex = binarySearch(expandList, dis + v2.distance(pos, start), function(a, b) { return calcPathCost([a & 0xFFFF, a >> 16]) - b; } );
                expandList.splice(insertIndex, 0, (pos[0] & 0xFFFF) | ((pos[1] & 0xFFFF) << 16));
            }
        }
        if (basePos[0] == start[0] && basePos[1] == start[1])
            break;
    }
    
}

/*genFlowField = function(tileWorld, blockWorld, flowfield, start, goal) {
    aStar(tileWorld, blockWorld, goal, start);
    // TODO: Gen flowfield
}*/
