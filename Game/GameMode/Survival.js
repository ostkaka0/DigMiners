
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

        gameData.world.events.on("ownPlayerSpawned", function(entity, player) {
            if (gameData.HUD.inventory)
                gameData.HUD.inventory.remove();
            if (entity.inventory) {
                gameData.HUD.inventory = new InventoryHUD(entity.inventory, "Inventory", 10);
                gameData.HUD.inventory.update();
            }
        });
        return;
    }

    gameData.world.generator = new Generator(1000);

    var loadChunk = function(world, x, y) {
        var chunk = new Chunk();
        global.gameData.world.generator.generate(chunk, x, y);
        world.set([x, y], chunk);
    }

    for (var x = -3; x < 3; ++x) {
        for (var y = -3; y < 3; ++y) {
            loadChunk(global.gameData.world.tileWorld, x, y);
        }
    }
}

GameModeSurvival.prototype.name = "Survival";
