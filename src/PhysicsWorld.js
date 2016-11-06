
PhysicsWorld = function() {
    this.numBodies = 0;
    this.pos = [];
    this.velocity = [];
    this.freeIds = [];
}

PhysicsWorld.prototype.update = function(dt) {
    var freeId = this.freeIds[0];
    var freeIdIndex = 0;
    for (var i = 0; i < this.numBodies; i++) {
        if (i == freeId) {
            freeIdIndex++;
            freeId = this.freeIds[freeIdIndex];
            continue;
        }
        this.pos[2*i] += dt*this.velocity[2*i] >> 0;
        this.pos[2*i+1] += dt*this.velocity[2*i+1] >> 0;
        this.velocity[2*i] = fix.pow(0.25, dt) * this.velocity[2*i] >> 0;
        this.velocity[2*i+1] = fix.pow(0.25, dt) * this.velocity[2*i+1] >> 0;
    }
}

PhysicsWorld.prototype.add = function(pos, velocity) {
    if (pos == undefined) pos = [0,0];
    if (velocity == undefined) velocity = [0,0];
    if (this.freeIds.length == 0) {
        this.pos.push(fixToInt32(pos[0]), fixToInt32(pos[1]));
        this.velocity.push(fixToInt32(velocity[0]), fixToInt32(velocity[1]));
        return this.numBodies++;
    } else {
        var id = freeIds.pop();
        this.pos[2*id] = fixToInt32(pos[0]);
        this.pos[2*id+1] = fixToInt32(pos[1]);
        this.velocity[2*id] = fixToInt32(velocity[0]);
        this.velocity[2*id+1] = fixToInt32(velocity[1]);
        return id;
    }
}

PhysicsWorld.prototype.remove = function(id) {
    var index = binarySearch(this.freeIds, id);
    this.freeIds.splice(index, 0, id);
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
