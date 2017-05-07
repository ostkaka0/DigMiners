
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
        generatorRegister: TypeRegister.addByArray([], [EmptyGenerator, Generator, SurvivalGenerator]),
        gameModeRegister: TypeRegister.addByArray([], [/*GameModeBaseWar,*/ GameModeSurvival/*, GameModeSurvivalWar*/]),
        defaultgameMode: GameModeSurvival,
        HUD: null,
    };
}

var gameTick = function() {
    Game.playerWorld.update();
}
