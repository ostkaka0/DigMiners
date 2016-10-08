
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
    this.text = new PIXI.Text(name, { fontFamily: 'Monospace', fontSize: 15, fill: 0xffffff, align: 'center' });
    var sprite = new Sprite(null, this.text, true);
    entity.drawable.addSprite("username", sprite, v2.create(- this.text.width / 2, -60), false);
}

Player.prototype.getDigStrength = function() {
    return 1.0;
}