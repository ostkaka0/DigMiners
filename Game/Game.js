
var Game = null;

var gameInit = function() {
    Game = {
        playerWorld: new ObjectWorld(true),
    };
}

var gameTick = function() {
    Game.playerWorld.update();
}
