
var GameMode = null;
var NextGameMode = null;
var ChangeGameMode = false;
var GameModeRegister = [];

var gameModeChange = function(gameMode) {
    NextGameMode = gameMode;
    ChangeGameMode = true;
    console.log("Changing gameMode to: " + gameMode.name);
}

var gameModeTick = function(dt) {
    if (ChangeGameMode) {
        ChangeGameMode = false;

        worldDestroy();
        worldInit();
        if (!isServer) {
            worldRendererDestroy();
            worldRendererInit();
        }

        if (GameMode) GameMode.destroy();
        GameMode = NextGameMode;
        NextGameMode = null;
        if (GameMode) GameMode.init();
        if (isServer) new MessageChangeGameMode().send(Server.io.sockets);
        return;
    }

    if (GameMode)
        GameMode.tick(dt);
}
