
var Item = {};
global.Item = Item;

Item.Flags = {
    Positive: 1,
    TargetSelf: 2,
    TargetEnemies: 4,
    TargetFriends: 8,
    Destructive: 16,
    //Constructive: 32,
};

Item.interact = function(itemType, entity) {
    if (!isServer) return;
    var physicsWorld = World.physics;
    var range = itemType.range || 1.0;
    var radius = itemType.radius || 0.5;
    var damage = (itemType.damage || 10.0) * ((itemType & Item.Flags.Positive)? -1 : 1);
    var bodies = [];
    var entityBodyId = entity.physicsBody.bodyId;
    var entityPos = entity.physicsBody.getPos();
    var angle = entity.physicsBody.angle;
    var dir = [Math.cos(angle), Math.sin(angle)];
    var hitPos = [0, 0];
    v2.mul(range, dir, hitPos);
    v2.add(entityPos, hitPos, hitPos);
    physicsWorld.getBodiesInRadius(bodies, hitPos, radius);

    var hitEntities = [];

    // Validate melee "collision"
    for (var i = 0; i < bodies.length; i++) {
        var bodyId = bodies[i];
        if (bodyId == entityBodyId && !(itemType.flags & Item.Flags.TargetSelf)) continue;
        var targetEntity = World.physicsEntityMap[bodyId];
        if (!targetEntity) continue;
        hitEntities.push(targetEntity);
    }

    // Do interaction
    for (var i = 0; i < hitEntities.length; i++) {
        var targetEntity = hitEntities[i];
        if (targetEntity.health && damage)
            Entity.hurt(targetEntity, entity, damage, 1.0);
    }

    // TODO: CommandEntityHit
    //if (isServer) {
    //    World.commands.push(new CommandEntityHit(entity, hitEntities));
    //}

    // Digging
    if (itemType.flags & Item.Flags.Destructive) {
        // Break block
        var chunkPos = [0, 0];
        var localPos = [0, 0];
        BlockChunk.fromV2World(hitPos, chunkPos, localPos);
        var blockChunk = World.blocks.get(chunkPos);
        if (blockChunk) {
            var blockId = blockChunk.getForeground(localPos[0], localPos[1]);
            if (blockId) {
                var blockType = Game.blockRegister[blockId];
                var strength = blockChunk.getStrength(localPos[0], localPos[1]);
                // TODO: 16 magic value
                strength -= 16 * (Entity.getBlockBreakSpeed(entity) / blockType.hardness);
                var x = chunkPos[0] * BlockChunk.dim + localPos[0];
                var y = chunkPos[1] * BlockChunk.dim + localPos[1];
                sendCommand(new CommandBlockStrength(x, y, Math.max(strength, 0)));
                return;
            }// Crete explosion
            //ExplosionFunctions.createExplosion(entityPos, 3.0, 50.0, 250.0, 1.0, entity);
        }
        // Dig terrain
        World.commands.push(new CommandEntityDig(entity.id, entityPos, dir, 1.5, Entity.getDigSpeed(entity), Entity.getMaxDigHardness(entity)));
    }
}
