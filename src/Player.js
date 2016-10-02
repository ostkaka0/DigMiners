
Player = function(playerId, entityId, name) {
    this.playerId = playerId;
    this.entityId = entityId;
    this.name = name;
    this.text = null;
    this.inventory = new Inventory();
    this.oreInventory = new Array();
}

Player.prototype.setName = function(name, gameData) {
    var entity = gameData.entityWorld.objects[this.entityId];
    if(this.text)
        entity.drawable.removeSprite("username");
    this.text = new PIXI.Text("entityId " + this.entityId + " playerId " + this.playerId, { fill: '#ffffff' });
    var sprite = new Sprite(null, this.text, true);
    console.log("set name " + name + " entityid " + this.entityId + " playerId " + this.playerId);
    entity.drawable.addSprite("username", sprite, v2.create(- this.text.width / 2, -80), false);
}

Player.prototype.getDigStrength = function() {
    return 1.0;
}