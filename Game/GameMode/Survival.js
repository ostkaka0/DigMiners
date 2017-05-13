
var GameModeSurvival = function() {

}

GameModeSurvival.prototype.init = function() {
    this.initRecipes();

    if (!isServer) {
        Event.subscribe(HUD.Events.onInit, this, function(HUDInstance) {
            HUDInstance.chat = new Chat();
            HUDInstance.ammo = new AmmoHUD();
            HUDInstance.level = new HUDLevel();
            HUDInstance.levelPicker = new HUDLevelPicker();
            HUDInstance.skills = new HUDSkills();
            HUDInstance.crafting = new CraftingHUD();
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
    World.width = 6;
    World.height = 6;
    worldGenerate();

    EntityHealth.Events.onDeath.set(this, function(entity, killer) {
        if (entity.resource) {
            if (entity.resource.type == ResourceType.TREE) {
                // Spawn tree stump
                var treeStumpEntityId = World.idList.next();
                var treeStumpEntity = entityTemplateTreeStump(treeStumpEntityId, entity.physicsBody.getPos(), Math.random() * Math.PI * 2);
                sendCommand(new CommandEntitySpawn(treeStumpEntity, treeStumpEntityId));

                // Spawn logs on the ground
                var pos = v2.clone(entity.physicsBody.getPos());
                var angle = (killer && killer.physicsBody ? killer.physicsBody.angle : (Math.random() * Math.PI * 2));
                angle += Math.random() / 5 - 0.1;
                var vec = v2.create(Math.cos(angle), -Math.sin(angle));
                v2.mul(1.4, vec, vec);

                for (var i = 0; i < 3 + Math.random() * 5; ++i) {
                    v2.add(pos, vec, pos);
                    var logEntityId = World.idList.next();
                    var logEntity = entityTemplateLog(logEntityId, pos, angle + Math.random() / 2 - 0.25);
                    sendCommand(new CommandEntitySpawn(logEntity, logEntityId));
                }

                // Spawn sticks on the ground
                for (var i = 0; i < 5 + Math.random() * 3; ++i) {
                    var angle = Math.random() * Math.PI * 2;
                    var vec = v2.create(Math.cos(angle), -Math.sin(angle));
                    v2.mul(1.8, vec, vec);
                    var pos = v2.clone(logEntity.physicsBody.getPos());
                    v2.add(pos, vec, pos);
                    var itemEntity = entityTemplateItem(Items.Types.Stick.id, 1);
                    itemEntity.physicsBody.setPos(pos);
                    itemEntity.physicsBody.angle = entity.physicsBody.angle;
                    itemEntity.physicsBody.angleOld = entity.physicsBody.angle;
                    sendCommand(new CommandEntitySpawn(itemEntity, World.idList.next()));
                }
            } else if (entity.resource.type == ResourceType.LOG) {
                sendCommand(new CommandEntityInventory(killer.id, CommandEntityInventory.Actions.ADD_ITEM, Items.Types.Log.id, 1));
            }
        }
    }.bind(this));
}

GameModeSurvival.prototype.initRecipes = function() {
    Recipes = [];

    Recipes.push({
        item: [[Items.Types.Dynamite, 1]],
        requiredOres: [],
        requiredItems: [[Items.Types.Log, 1], [Items.Types.Stick, 2]],
    });
}

GameModeSurvival.prototype.name = "Survival";
