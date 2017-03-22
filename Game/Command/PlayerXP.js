
class CommandPlayerXP {
    constructor(playerId, xp) {
        this.playerId = playerId;
        this.xp = xp;
    }

    execute() {
        var player = global.gameData.playerWorld.objects[this.playerId];
        if (!player) return;
        player.addXP(this.xp);
    }

    serialize(byteArray, index) {
        Serialize.int32(byteArray, index, this.playerId);
        Serialize.int32(byteArray, index, this.xp);
    }

    deserialize(byteArray, index) {
        this.playerId = Deserialize.int32(byteArray, index);
        this.xp = Deserialize.int32(byteArray, index);
    }

    getSerializationSize() {
        return 8;
    }
}
RegisterCommand.push(CommandPlayerXP)
