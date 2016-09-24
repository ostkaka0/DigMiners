
Player = function (playerId, entityId, name) {
    this.playerId = playerId;
    this.entityId = entityId;
    this.name = name;
}

Player.prototype.setName = function (name, gameData) {
    var entity = gameData.entityWorld.objects[this.entityId];
    if (player.text)
        entity.drawable.removeSprite("username");
    this.text = new PIXI.Text(name, { fill: '#ffffff' });
    entity.drawable.addSprite("username", this.text, v2.create(- this.text.width / 2, -80), false);
}