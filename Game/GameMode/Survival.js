
var GameModeSurvival = function() {

}

GameModeSurvival.prototype.init = function() {
    if (!isServer) {
        Event.subscribe(HUD.Events.onInit, this, function(HUDInstance) {
            HUDInstance.chat = new Chat();
            HUDInstance.ammo = new AmmoHUD();
            HUDInstance.level = new HUDLevel();
            HUDInstance.levelPicker = new HUDLevelPicker();
            HUDInstance.skills = new HUDSkills();
        }.bind(this));

        World.events.on("ownPlayerSpawned", function(entity, player) {
            if (Game.HUD.inventory)
                Game.HUD.inventory.remove();
            if (entity.inventory) {
                Game.HUD.inventory = new InventoryHUD(entity.inventory, "Inventory", 10);
                Game.HUD.inventory.update();
            }
        });
        return;
    }

    World.generator = new SurvivalGenerator(Math.random() * 10000);
    for (var x = -3; x < 3; ++x) {
        for (var y = -3; y < 3; ++y) {
            var chunk = new Chunk();
            World.generator.generate(chunk, x, y);
            World.tiles.set([x, y], chunk);
        }
    }

    EntityHealth.Events.onDeath.set(this, function(entity, killer) {
        if (entity.resource && entity.resource.type == ResourceType.TREE) {
            var pos = v2.clone(entity.physicsBody.getPos());
            var angle = (killer && killer.physicsBody ? killer.physicsBody.angle : (Math.random() * Math.PI * 2));
            angle += Math.random() / 5 - 0.1;
            var vec = v2.create(Math.cos(angle), -Math.sin(angle));
            var normalized = [0, 0];
            v2.normalize(vec, normalized);
            v2.mul(1.4, normalized, normalized);

            for (var i = 0; i < 3 + Math.random() * 5; ++i) {
                v2.add(pos, normalized, pos);
                var entityId = World.idList.next();
                var entity = entityTemplateLog(entityId, pos, angle + Math.random() / 2 - 0.25);
                sendCommand(new CommandEntitySpawn(entity, entityId));
            }
        }
    }.bind(this));
}

GameModeSurvival.prototype.name = "Survival";
