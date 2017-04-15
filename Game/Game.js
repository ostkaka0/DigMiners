
var Game = null;

var gameInit = function() {
    Game = {
        playerWorld: new ObjectWorld(true),
        playerIdList: (isServer)? new IdList() : null,
        tileRegister: ObjectRegister.addByObject([], Tiles),
        blockRegister: ObjectRegister.addByObject([], Blocks),
        projectileRegister: ObjectRegister.addByObject([], Projectiles),
        particleRegister: ObjectRegister.addByObject([], Particles),
        particleFunctionRegister: ObjectRegister.addByObject([], ParticleFunctions),
        potionEffectTypeRegister: ObjectRegister.addByObject([], PotionEffectTypes),
        gameModeRegister: TypeRegister.addByArray([], [/*GameModeBaseWar,*/ GameModeZombieInvasion/*, GameModeSurvivalWar*/]),
        defaultgameMode: GameModeZombieInvasion,
    };
}

var gameTick = function() {
    Game.playerWorld.update();
}
