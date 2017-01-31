var PointWorld = require("Engine/PointWorld.js")
var fix = require("Engine/Core/Fix.js")
var v2 = require("Engine/Core/v2.js")

var PhysicsWorld = function(size) {
    this.pointWorld = new PointWorld(size || 1024);
    this.posOld = [];
    this.velocity = [];
    this.mass = [];
    this.onCollision = [];
}
module.exports = PhysicsWorld;

PhysicsWorld.prototype.update = function(dt) {
    // Update pos, velocity, posOld and pages
    this.forEach(this, function(id) {
        if (this.getMass(id) == 0) return;

        var pos = this.getPos(id);
        var velocity = this.getVelocity(id);
        var posOld = this.getPosOld(id);

        // Update pos, velocity
        pos[0] += dt * velocity[0];
        pos[1] += dt * velocity[1];
        v2.mul(fix.pow(0.01, dt), velocity, velocity);

        // Update data
        this.setPos(id, pos);
        this.setVelocity(id, velocity);
        this._setPosOld(id, pos);
    });

    var collisions = [];

    var velocityEpsilon = fix.toFix(0.01);
    // Collision:
    this.forEach(this, function(id) {
        var radius = this.getRadius(id);
        var mass = this.getMass(id);
        var velocity = this.getVelocity(id);
        if (v2.length(velocity) < velocityEpsilon || mass == 0)
            return;
        var pos = this.getPos(id);
        var posOld = this.getPosOld(id);
        var bodies = [];
        this.getBodiesInRadius(bodies, posOld, radius);
        bodies.forEach(function(otherId) {
            // No self collision
            if (otherId == id) return;

            var otherRadius = this.getRadius(otherId);
            var otherMass = this.getMass(otherId);
            var otherVelocity = this.getVelocity(otherId);

            // Only do collision once
            if (otherId > id && v2.length(otherVelocity) >= velocityEpsilon && otherMass != 0) return;

            var otherPos = this.getPos(otherId);
            var otherPosOld = this.getPosOld(otherId);

            // Calc position
            var dir = [0, 0];
            v2.sub(otherPosOld, posOld, dir);
            var dis = v2.length(dir);
            v2.normalize(dir, dir);
            if (dis == 0)
                dir = [1, 0];
            var deltaPos = [0, 0];
            v2.mul(((radius + otherRadius) - dis) / 2.0, dir, deltaPos);
            if (otherMass / mass > 0.1)
                pos = [pos[0] - deltaPos[0] * Math.min(2.0, otherMass / mass), pos[1] - deltaPos[1] * Math.min(2.0, otherMass / mass)];
            if (mass / otherMass > 0.1)
                otherPos = [otherPos[0] + deltaPos[0] * Math.min(2.0, mass / otherMass), otherPos[1] + deltaPos[1] * Math.min(2.0, mass / otherMass)];

            // Calc velocity
            var velocityX = fix.mul(velocity[0], Math.min(1.0, Math.max(-1.0, fix.sub(mass, otherMass)))) + fix.div(fix.mul(2, fix.mul(otherMass, otherVelocity[0])), fix.add(mass, otherMass));
            var velocityY = fix.mul(velocity[1], Math.min(1.0, Math.max(-1.0, fix.sub(mass, otherMass)))) + fix.div(fix.mul(2, fix.mul(otherMass, otherVelocity[1])), fix.add(mass, otherMass))
            var otherVelocityX = fix.mul(otherVelocity[0], Math.min(1.0, Math.max(-1.0, fix.sub(otherMass, mass)))) + fix.div(fix.mul(2, fix.mul(mass, velocity[0])), fix.add(mass, otherMass));
            var otherVelocityY = fix.mul(otherVelocity[1], Math.min(1.0, Math.max(-1.0, fix.sub(otherMass, mass)))) + fix.div(fix.mul(2, fix.mul(mass, velocity[1])), fix.add(mass, otherMass));
            var collisionVelocityFactor = 0.0; //Math.min(8, 80 * (1.0 - dis));
            velocity = [velocityX - collisionVelocityFactor * Math.min(2.0, otherMass / mass) * deltaPos[0], velocityY - collisionVelocityFactor * Math.min(2.0, otherMass / mass) * deltaPos[1]];
            otherVelocity = [otherVelocityX + collisionVelocityFactor * Math.min(2.0, mass / otherMass) * deltaPos[0], otherVelocityY + collisionVelocityFactor * Math.min(2.0, mass / otherMass) * deltaPos[1]];

            this.setPos(otherId, otherPos);
            this.setVelocity(otherId, otherVelocity);

            collisions.push([id, otherId]);
        }.bind(this));

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

PhysicsWorld.prototype.add = function(pos, velocity, mass, radius) {
    if (pos == undefined) pos = [0, 0];
    if (velocity == undefined) velocity = [0, 0];
    if (mass == undefined) mass = 1.0;
    if (radius == undefined) radius = 0.5;

    var id = this.pointWorld.add(pos, radius);

    while(id >= this.mass.length) {
        this.posOld.push(0.0);
        this.posOld.push(0.0);
        this.velocity.push(0.0);
        this.velocity.push(0.0);
        this.mass.push(0.0);
    }

    this._setPosOld(id, pos);
    this.setVelocity(id, velocity);
    this.setMass(id, mass);

    return id;
}

PhysicsWorld.prototype.remove = function(id) {
    this.pointWorld.remove(id);
}

PhysicsWorld.prototype.getBodiesInRadius = function(bodies, point, radius) {
    this.pointWorld.findInRadius(bodies, point, radius);

    /*if (radius == undefined) radius = 0.0;
    var pagePos = [Math.floor(point[0] / pageDim - 0.5), Math.floor(point[1] / pageDim - 0.5)];
    for (var i = 0; i < 4; i++) {
        var page = this.pages.get(pagePos[0] + i % 2, pagePos[1] + (i / 2 >> 0));
        if (!page) continue;
        for (var j = 0; j < page.length; j++) {
            var id = page[j];
            var pos = [fixFromInt32(this.posOld[2 * id]), fixFromInt32(this.posOld[2 * id + 1])];
            var delta = [pos[0] - point[0], pos[1] - point[1]];
            var lengthSquared = delta[0] * delta[0] + delta[1] * delta[1];
            var otherRadius = this.getRadius(id);
            if (lengthSquared < (radius + otherRadius) * (radius + otherRadius))
                bodies.push(id);
        }
    }
    return null;*/
}

PhysicsWorld.prototype.getBodiesInRadiusSorted = function(bodies, bodyDistances, point, radius) {
    this.pointWorld.findInRadius(bodies, point, radius);
    /*if (radius == undefined) radius = 0.0;
    var pagePos = [Math.floor(point[0] / pageDim - 0.5), Math.floor(point[1] / pageDim - 0.5)];
    for (var i = 0; i < 4; i++) {
        var page = this.pages.get(pagePos[0] + i % 2, pagePos[1] + (i / 2 >> 0));
        if (!page) continue;
        for (var j = 0; j < page.length; j++) {
            var id = page[j];
            var pos = [fixFromInt32(this.posOld[2 * id]), fixFromInt32(this.posOld[2 * id + 1])];
            var delta = [fix.sub(pos[0], point[0]), fix.sub(pos[1], point[1])];
            var lengthSquared = fix.add(fix.mul(delta[0], delta[0]), fix.mul(delta[1], delta[1]));
            var otherRadius = this.getRadius(id);
            if (lengthSquared < (radius + otherRadius) * (radius + otherRadius)) {
                var dis = fix.sqrt(lengthSquared);
                var index = binarySearch(bodyDistances, dis);
                bodies.splice(index, 0, id);
                bodyDistances.splice(index, 0, dis);
            }
        }
    }
    return null;*/
}

PhysicsWorld.prototype.forEach = function(thisRef, callback) {
    this.pointWorld.forEach(callback.bind(thisRef));
}

PhysicsWorld.prototype.getPos = function(id) {
    return this.pointWorld.getPos(id);
}

PhysicsWorld.prototype.setPos = function(id, pos) {
    this.pointWorld.movePoint(id, pos, this.getRadius(id));
}

PhysicsWorld.prototype.getPosOld = function(id) {
    return [this.posOld[2 * id], this.posOld[2 * id + 1]];
}

PhysicsWorld.prototype._setPosOld = function(id, posOld) {
    this.posOld[2* id] = posOld[0];
    this.posOld[2 * id + 1] = posOld[1];
}

PhysicsWorld.prototype.getVelocity = function(id) {
    return [this.velocity[2 * id], this.velocity[2 * id + 1]];
}

PhysicsWorld.prototype.setVelocity = function(id, velocity) {
    this.velocity[2 * id] = velocity[0];
    this.velocity[2 * id + 1] = velocity[1];
}

PhysicsWorld.prototype.getMass = function(id) {
    return this.mass[id];
}

PhysicsWorld.prototype.setMass = function(id, mass) {
    this.mass[id] = mass;
}

PhysicsWorld.prototype.getRadius = function(id) {
    return this.pointWorld.getRadius(id);
}

PhysicsWorld.prototype.setRadius = function(id, radius) {
    this.pointWorld.movePoint(id, this.getPos(id), radius);
}
