var pageDim = 2;

PhysicsWorld = function() {
    this.numBodies = 0;
    this.pos = [];
    this.posOld = [];
    this.velocity = [];
    this.freeIds = [];
    this.pages = new Map2D();
    this.onCollision = [];
}

PhysicsWorld.prototype.update = function(dt) {
    // Update pos, velocity, posOld and pages
    this.forEach(this, function(id) {
        // Update pos, velocity
        this.pos[2 * id] += dt * this.velocity[2 * id] >> 0;
        this.pos[2 * id + 1] += dt * this.velocity[2 * id + 1] >> 0;
        this.velocity[2 * id] = fix.pow(0.01, dt) * this.velocity[2 * id] >> 0;
        this.velocity[2 * id + 1] = fix.pow(0.01, dt) * this.velocity[2 * id + 1] >> 0;

        var pos = this.getPos(id);
        var posOld = this.getPosOld(id);
        var pagePos = [Math.floor(pos[0] / pageDim), Math.floor(pos[1] / pageDim)];
        var pagePosOld = [Math.floor(posOld[0] / pageDim), Math.floor(posOld[1] / pageDim)];

        // Update pages:
        if (pagePos[0] != pagePosOld[0] || pagePos[1] != pagePosOld[1]) {
            var pageOld = this.pages.get(pagePosOld[0], pagePosOld[1]);
            if (pageOld) {
                var index = binarySearch(pageOld, id, function(a, b) { return a - b; });
                if (pageOld[index] == id)
                    pageOld.splice(index, 1);
                if (pageOld.length == 0)
                    this.pages.set(pagePosOld[0], pagePosOld[1], undefined);
            }

            var page = this.pages.get(pagePos[0], pagePos[1]);
            if (!page) {
                this.pages.set(pagePos[0], pagePos[1], [id]);
            } else {
                index = binarySearch(page, id, function(a, b) { return a - b; });
                page.splice(index, 0, id);
            }
        }

        // Update posOld
        this.posOld[2 * id] = this.pos[2 * id];
        this.posOld[2 * id + 1] = this.pos[2 * id + 1];
    });

    var collisions = [];

    // Collision:
    this.forEach(this, function(id) {
        var velocity = this.getVelocity(id);
        var pos = this.getPos(id);
        var posOld = this.getPosOld(id);
        var mass = 1.0;
        var bodies = [];
        this.getBodiesInRadius(bodies, posOld, 0.5);
        forOf(this, bodies, function(otherId) {
            // No self collision
            if (otherId == id) return;
            // Only do collision once
            if (otherId > id) return;

            var otherPos = this.getPos(otherId);
            var otherPosOld = this.getPosOld(otherId);
            var otherVelocity = this.getVelocity(otherId);
            var otherMass = 1.0;

            // Calc position
            var dir = [0, 0];
            v2.sub(otherPosOld, posOld, dir);
            var dis = v2.length(dir);
            v2.normalize(dir, dir);
            if (dis == 0)
                dir = [1, 0];
            var deltaPos = [0, 0];
            v2.mul((1.0 - dis) / 2, dir, deltaPos);
            v2.sub(pos, deltaPos, pos);
            v2.add(otherPos, deltaPos, otherPos);

            // Calc velocity
            var velocityX = fix.mul(velocity[0], fix.sub(mass, otherMass)) + fix.div(fix.mul(2, fix.mul(otherMass, otherVelocity[0])), fix.add(mass, otherMass));
            var velocityY = fix.mul(velocity[1], fix.sub(mass, otherMass)) + fix.div(fix.mul(2, fix.mul(otherMass, otherVelocity[1])), fix.add(mass, otherMass));
            var otherVelocityX = fix.mul(otherVelocity[1], fix.sub(otherMass, mass)) + fix.div(fix.mul(2, fix.mul(mass, velocity[0])), fix.add(mass, otherMass));
            var otherVelocityY = fix.mul(otherVelocity[1], fix.sub(otherMass, mass)) + fix.div(fix.mul(2, fix.mul(mass, velocity[1])), fix.add(mass, otherMass));
            velocity = [velocityX, velocityY];
            otherVelocity = [otherVelocityX, otherVelocityY];

            this.setPos(otherId, otherPos);
            this.setVelocity(otherId, otherVelocity);

            collisions.push([id, otherId]);
        });

        this.setPos(id, pos)
        this.setVelocity(id, velocity);
    });

    // Collision event
    if (collisions.length != 0) {
        this.onCollision.forEach(function(onCollision) {
            onCollision(collisions);
        });
    }
}

PhysicsWorld.prototype.add = function(pos, velocity) {
    if (pos == undefined) pos = [0, 0];
    if (velocity == undefined) velocity = [0, 0];

    var id;

    if (this.freeIds.length == 0) {
        this.pos.push(fixToInt32(pos[0]), fixToInt32(pos[1]));
        this.posOld.push(fixToInt32(pos[0]), fixToInt32(pos[1]));
        this.velocity.push(fixToInt32(velocity[0]), fixToInt32(velocity[1]));
        id = this.numBodies++;
    } else {
        id = this.freeIds.pop();
        this.pos[2 * id] = fixToInt32(pos[0]);
        this.pos[2 * id + 1] = fixToInt32(pos[1]);
        this.posOld[2 * id] = fixToInt32(pos[0]);
        this.posOld[2 * id + 1] = fixToInt32(pos[1]);
        this.velocity[2 * id] = fixToInt32(velocity[0]);
        this.velocity[2 * id + 1] = fixToInt32(velocity[1]);
    }

    var pagePos = [Math.floor(fixFromInt32(this.pos[2 * id]) / pageDim), Math.floor(fixFromInt32(this.pos[2 * id + 1]) / pageDim)];
    var page = this.pages.get(pagePos[0], pagePos[1]);
    if (!page) {
        this.pages.set(pagePos[0], pagePos[1], [id]);
    } else {
        index = binarySearch(page, id, function(a, b) { return a - b; });
        page.splice(index, 0, id);
    }

    return id;
}

PhysicsWorld.prototype.remove = function(id) {
    // Do not re-use IDs, causes bugs and glitches(FIX!)
    var index = binarySearch(this.freeIds, id, function(a, b) { return a - b; });
    this.freeIds.splice(index, 0, id);

    var pagePos = [Math.floor(fixFromInt32(this.posOld[2 * id]) / pageDim), Math.floor(fixFromInt32(this.posOld[2 * id + 1]) / pageDim)];
    var page = this.pages.get(pagePos[0], pagePos[1]);
    if (page) {
        var index = binarySearch(page, id, function(a, b) { return a - b; });
        if (page[index] == id)
            page.splice(index, 1);
        if (page.length == 0)
            this.pages.set(pagePos[0], pagePos[1], undefined);
    }
}

PhysicsWorld.prototype.getBodiesInRadius = function(bodies, point, radius) {
    if (radius == undefined) radius = 0.0;
    var pagePos = [Math.floor(point[0] / pageDim - 0.5), Math.floor(point[1] / pageDim - 0.5)];
    for (var i = 0; i < 4; i++) {
        var page = this.pages.get(pagePos[0] + i % 2, pagePos[1] + (i / 2 >> 0));
        if (!page) continue;
        for (var j = 0; j < page.length; j++) {
            var id = page[j];
            var pos = [fixFromInt32(this.posOld[2 * id]), fixFromInt32(this.posOld[2 * id + 1])];
            var delta = [pos[0] - point[0], pos[1] - point[1]];
            var lengthSquared = delta[0] * delta[0] + delta[1] * delta[1];
            if (lengthSquared < (radius + 0.5) * (radius + 0.5))
                bodies.push(id);
        }
    }
    return null;
}

PhysicsWorld.prototype.getBodiesInRadiusSorted = function(bodies, bodyDistances, point, radius) {
    if (radius == undefined) radius = 0.0;
    var pagePos = [Math.floor(point[0] / pageDim - 0.5), Math.floor(point[1] / pageDim - 0.5)];
    for (var i = 0; i < 4; i++) {
        var page = this.pages.get(pagePos[0] + i % 2, pagePos[1] + (i / 2 >> 0));
        if (!page) continue;
        for (var j = 0; j < page.length; j++) {
            var id = page[j];
            var pos = [fixFromInt32(this.posOld[2 * id]), fixFromInt32(this.posOld[2 * id + 1])];
            var delta = [fix.sub(pos[0], point[0]), fix.sub(pos[1], point[1])];
            var lengthSquared = fix.add(fix.mul(delta[0], delta[0]), fix.mul(delta[1], delta[1]));
            if (lengthSquared < (radius + 0.5) * (radius + 0.5)) {
                var dis = fix.sqrt(lengthSquared);
                var index = binarySearch(bodyDistances, dis);
                bodies.splice(index, 0, id);
                bodyDistances(index, 0, dis);
            }
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
    return [fixFromInt32(this.pos[2 * id]), fixFromInt32(this.pos[2 * id + 1])];
}

PhysicsWorld.prototype.setPos = function(id, pos) {
    this.pos[2 * id] = fixToInt32(pos[0]);
    this.pos[2 * id + 1] = fixToInt32(pos[1]);
}

PhysicsWorld.prototype.getPosOld = function(id) {
    return [fixFromInt32(this.posOld[2 * id]), fixFromInt32(this.posOld[2 * id + 1])];
}

PhysicsWorld.prototype.getVelocity = function(id) {
    return [fixFromInt32(this.velocity[2 * id]), fixFromInt32(this.velocity[2 * id + 1])];
}

PhysicsWorld.prototype.setVelocity = function(id, velocity) {
    this.velocity[2 * id] = fixToInt32(velocity[0]);
    this.velocity[2 * id + 1] = fixToInt32(velocity[1]);
}
