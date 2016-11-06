var pageDim = 8;

PhysicsWorld = function() {
    this.numBodies = 0;
    this.pos = [];
    this.velocity = [];
    this.freeIds = [];
    this.pages = new Map2D();
}

PhysicsWorld.prototype.update = function(dt) {
    var freeId = this.freeIds[0];
    var freeIdIndex = 0;
    for (var id = 0; id < this.numBodies; id++) {
        if (id == freeId) {
            freeIdIndex++;
            freeId = this.freeIds[freeIdIndex];
            continue;
        }
        
        var pagePosOld = [fixFromInt32(this.pos[2*id]) / pageDim >> 0, fixFromInt32(this.pos[2*id+1]) / pageDim >> 0];
        
        this.pos[2*id] += dt*this.velocity[2*id] >> 0;
        this.pos[2*id+1] += dt*this.velocity[2*id+1] >> 0;
        this.velocity[2*id] = fix.pow(0.25, dt) * this.velocity[2*id] >> 0;
        this.velocity[2*id+1] = fix.pow(0.25, dt) * this.velocity[2*id+1] >> 0;
        
        var pagePos = [fixFromInt32(this.pos[2*id]) / pageDim >> 0, fixFromInt32(this.pos[2*id+1]) / pageDim >> 0];
        // Update pages:
        if (pagePos[0] != pagePosOld[0] || pagePos[1] != pagePosOld[1]) {
            var pageOld = this.pages.get(pagePosOld[0], pagePosOld[1]);
            if (pageOld) {
                var index = binarySearch(pageOld, id, function(a, b) { return a-b; });
                if (pageOld[index] == id)
                    pageOld.splice(index, 1);
                if (pageOld.length == 0)
                    this.pages.set(pagePosOld[0], pagePosOld[1], undefined);
            }
                
            var page = this.pages.get(pagePos[0], pagePos[1]);
            if (!page) {
                this.pages.set(pagePos[0], pagePos[1], [id]);
            } else {
                index = binarySearch(page, id, function(a, b) { return a-b; });
                page.splice(index, 0, id);
            }
        }
    }
}

PhysicsWorld.prototype.add = function(pos, velocity) {
    if (pos == undefined) pos = [0,0];
    if (velocity == undefined) velocity = [0,0];
    
    var id;
    
    if (this.freeIds.length == 0) {
        this.pos.push(fixToInt32(pos[0]), fixToInt32(pos[1]));
        this.velocity.push(fixToInt32(velocity[0]), fixToInt32(velocity[1]));
        id = this.numBodies++;
    } else {
        id = this.freeIds.pop();
        this.pos[2*id] = fixToInt32(pos[0]);
        this.pos[2*id+1] = fixToInt32(pos[1]);
        this.velocity[2*id] = fixToInt32(velocity[0]);
        this.velocity[2*id+1] = fixToInt32(velocity[1]);
    }
    
    var pagePos = [fixFromInt32(this.pos[2*id]) / pageDim >> 0, fixFromInt32(this.pos[2*id+1]) / pageDim >> 0];
    var page = this.pages.get(pagePos[0], pagePos[1]);
    if (!page) {
        this.pages.set(pagePos[0], pagePos[1], [id]);
    } else {
        index = binarySearch(page, id, function(a, b) { return a-b; });
        page.splice(index, 0, id);
    }
    
    return id;
}

PhysicsWorld.prototype.remove = function(id) {
    var index = binarySearch(this.freeIds, id, function(a, b) { return a-b; });
    this.freeIds.splice(index, 0, id);
    
    var pagePos = [fixFromInt32(this.pos[2*id]) / pageDim >> 0, fixFromInt32(this.pos[2*id+1]) / pageDim >> 0];
    var page = this.pages.get(pagePos[0], pagePos[1]);
    if (page) {
        var index = binarySearch(page, id, function(a, b) { return a-b; });
        if (page[index] == id)
            page.splice(index, 1);
        if (page.length == 0)
            this.pages.set(pagePos[0], pagePos[1], undefined);
    }
}

PhysicsWorld.prototype.getBodyAtPoint = function(point) {
    var pagePos = [point[0] / pageDim - 0.5 >> 0, point[1] / pageDim - 0.5 >> 0];
    for (var i = 0; i < 4; i++) {
        var page = this.pages.get(pagePos[0] + i%2, pagePos[1] + i/2 >> 0);
        if (!page) continue;;
        for (var j = 0; j < page.length; j++) {
            var id = page[j];
            var pos = [fixFromInt32(this.pos[2*id]), fixFromInt32(this.pos[2*id+1])];
            var length = v2.distanceSquared(pos, point);
            if (length < 0.5)
                return id;
        }
    }
    return null;
}

PhysicsWorld.prototype.forEach = function(thisRef, userFunction) {
    var freeId = this.freeIds[0];
    var freeIdIndex = 0;
    for (var id = 0; id < this.numBodies; id++) {
        if (id == freeId) {
            freeIdIndex++;
            freeId = this.freeIds[freeIdIndex];
            continue;
        }
        (userFunction.bind(thisRef))(id);
    }
}

PhysicsWorld.prototype.getPos = function(id) {
    return [fixFromInt32(this.pos[2*id]), fixFromInt32(this.pos[2*id+1])];
}

PhysicsWorld.prototype.setPos = function(id, pos) {
    this.pos[2*id] = fixToInt32(pos[0]);
    this.pos[2*id+1] = fixToInt32(pos[1]);
}

PhysicsWorld.prototype.getVelocity = function(id) {
    return [fixFromInt32(this.velocity[2*id]), fixFromInt32(this.velocity[2*id+1])];
}

PhysicsWorld.prototype.setVelocity = function(id, velocity) {
    this.velocity[2*id] = fixToInt32(velocity[0]);
    this.velocity[2*id+1] = fixToInt32(velocity[1]);
}
