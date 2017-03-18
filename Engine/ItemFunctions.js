import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import TileWorld from "Engine/TileWorld.js";
import BlockWorld from "Engine/BlockWorld.js";
import BlockChunk from "Engine/BlockChunk.js";
import Sprite from "Engine/Animation/Sprite.js";
import BodyPart from "Engine/Animation/BodyPart.js";
import ObjectRegister from "Engine/Core/ObjectRegister.js";
import Item from "Engine/Item.js";

import Blocks from "Game/Blocks.js";
import Tiles from "Game/Tiles.js";
import Projectiles from "Game/Projectiles.js";
import Entity from "Game/Entity/Entity.js";
import EntityPhysicsBody from "Engine/Entity/PhysicsBody.js";
import EntityBodyparts from "Game/Entity/Bodyparts.js";
import EntityDrawable from "Engine/Entity/Drawable.js";
import ParticleFunctions from "Game/ParticleFunctions.js";
import ExplosionFunctions from "Game/ExplosionFunctions.js";

import Config from "Game/Config.js";

import RegisterItem from "Engine/Register/Item.js";

import CommandBlockStrength from "Game/Command/BlockStrength.js";
import CommandEntityDig from "Game/Command/EntityDig.js";
import CommandProjectileSpawn from "Game/Command/ProjectileSpawn.js";
import CommandEntityReloadWeapon from "Engine/Command/EntityReloadWeapon.js";
import CommandEntityInventory from "Engine/Command/EntityInventory.js";
import CommandEntitySpawn from "Engine/Command/EntitySpawn.js";
import CommandEntityAnimate from "Game/Command/EntityAnimate.js";
import CommandParticles from "Game/Command/Particles.js";
import CommandEntityDestroy from "Engine/Command/EntityDestroy.js";

var ItemFunctions = {};
export default ItemFunctions;

ItemFunctions.consumable = function(item, entity) {
    Item.interact(itemType, entity);
}

ItemFunctions.melee = function(itemType, entity) {
    Item.interact(itemType, entity);
}

ItemFunctions.projectile = function(itemType, entity) {
    if (!itemType || !entity.inventory) return;
    var stackId = entity.inventory.getEquippedStackId("tool");
    if (stackId == null) return;
    var item = entity.inventory.items[stackId];
    if (!item) return;
    if (!item.magazine || item.magazine <= 0) return;
    var numProjectiles = itemType.numProjectiles ? itemType.numProjectiles : 1;
    item.magazine -= 1;

    global.gameData.world.events.trigger("bulletFired", entity, item);

    if (isServer) {
        var maxDistance = (itemType.projectileType.hitAtCursor && entity.movement.deltaWorldCursorPos) ?
            v2.length(entity.movement.deltaWorldCursorPos) : itemType.projectileType.maxDistance;
        for (var i = 0; i < numProjectiles; i++) {

            entity.drawable.positionAll(0, 0, entity.physicsBody.angle, entity.bodyparts);
            var tool = entity.bodyparts.bodyparts["tool"];
            var toolUsePos = [0, 0];
            v2.add(toolUsePos, tool.finalPos, toolUsePos);
            toolUsePos = [toolUsePos[0], -toolUsePos[1]];
            v2.mul(1 / 32, toolUsePos, toolUsePos);
            v2.add(entity.physicsBody.getPos(), toolUsePos, toolUsePos);
            // Put your offsets here:
            v2.add(toolUsePos, [0, 0], toolUsePos);

            var scatter = itemType.projectileScatter;
            var projectileAngle = tool.finalAngle;
            var projectileSpeed = itemType.projectileType.speed;
            var projectileMaxDistance = maxDistance;
            if (scatter > 0) {
                projectileAngle += Math.random() * 2 * scatter - scatter;
                projectileSpeed *= 1.0 - 2 * scatter + 4 * scatter * Math.random();
                projectileMaxDistance *= 1.0 - 0.5 * scatter + scatter * Math.random();
            }

            global.gameData.world.commands.push(new CommandProjectileSpawn(global.gameData.world.idList.next(), toolUsePos, projectileAngle, projectileSpeed, projectileMaxDistance, itemType.projectileType, entity.id));
        }
    }
}

ItemFunctions.throwable = function(itemType, entity) {
    if (isServer) {
        if (!itemType || !entity.inventory) return;
        var stackId = entity.inventory.getEquippedStackId("tool");
        if (stackId == null) return;
        sendCommand(new CommandEntityInventory(entity.id, CommandEntityInventory.Actions.REMOVE_ITEM, itemType.id, 1));

        // Eject entity from playerEntity
        var physicsBody = entity.physicsBody;
        if (!physicsBody) return;
        var displacement1 = Math.random() / 5 - 0.1;
        var displacement2 = Math.random() / 5 - 0.1;
        var displacement3 = Math.random() / 5 - 0.1 + 1;
        var speed = v2.create(Math.cos(displacement1 + physicsBody.angle), -Math.sin(displacement2 + physicsBody.angle));
        var speed2 = {};
        v2.mul(10.0 * displacement3, speed, speed2);
        v2.mul(5, speed2, speed2);

        var itemEntityId = gameData.world.idList.next();
        var itemEntity = {};
        itemEntity.physicsBody = new EntityPhysicsBody(physicsBody.getPos(), 0.01, 0, 1, 0.3);
        itemEntity.physicsBody.setVelocity([speed2[0], speed2[1]]);
        itemEntity.physicsBody.speedOld = v2.create(speed2[0], speed2[1]);
        itemEntity.physicsBody.angle = physicsBody.angle;
        itemEntity.physicsBody.angleOld = physicsBody.angle;

        var bodySprite = new Sprite(itemType.throwEntityTexture);
        bodySprite.frame = [0, 0, 32, 32];
        var bodyparts = {
            "body": new BodyPart(bodySprite, 0, 0, 0),
        };
        itemEntity.bodyparts = new EntityBodyparts(bodyparts);
        itemEntity.drawable = new EntityDrawable(0);

        var timeout = 2000;

        sendCommand(new CommandEntitySpawn(gameData, itemEntity, itemEntityId));
        sendCommand(new CommandEntityAnimate(itemEntityId, "body", "dynamite", 64000.0 / timeout));

        gameData.setTimeout(function(attacker) {
            if (this.isActive && !this.isDead) {
                sendCommand(new CommandParticles(ParticleFunctions.ExplosionParticles.id, this.physicsBody.getPos(), 10.0));
                sendCommand(new CommandEntityDestroy(this.id));
                ExplosionFunctions.createExplosion(this.physicsBody.getPos(), 3.0, 50.0, 250.0, 1.0, attacker);
            }
        }.bind(itemEntity, entity), timeout);
    }
}

ItemFunctions.droppable = function(item, entity) {

}
