
var Game = null;

var gameInit = function() {
    Game = {
        playerWorld: new ObjectWorld(true),
        playerIdList: (isServer)? new IdList() : null,
    };
}

var gameTick = function() {
    Game.playerWorld.update();
}
