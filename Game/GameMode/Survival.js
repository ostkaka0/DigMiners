
var GameModeSurvival = function() {

}

GameModeSurvival.prototype.init = function() {
    if (!isServer) {
        Event.subscribe(HUD.Events.onInit, this, function(HUDInstance) {
            HUDInstance.dugItems = new DugItems();
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

    var loadChunk = function(world, x, y) {
        var chunk = new Chunk();
        World.generator.generate(chunk, x, y);
        world.set([x, y], chunk);
    }

    for (var x = -3; x < 3; ++x) {
        for (var y = -3; y < 3; ++y) {
            loadChunk(World.tiles, x, y);
        }
    }
}

GameModeSurvival.prototype.name = "Survival";
