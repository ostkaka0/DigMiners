
class CommandChooseSkill {
    constructor (playerId, skillId) {
        this.playerId = playerId;
        this.skillId = skillId;
    }
    execute() {
        var player = gameData.playerWorld.objects[this.playerId];
        if (!player) return;
        if (player.skillPoints < 1) return;
        player.chooseSkill(this.skillId);
    }
    serialize(byteArray, index) {
        Serialize.int32(byteArray, index, this.playerId);
        Serialize.int32(byteArray, index, this.skillId);
    }
    deserialize(byteArray, index) {
        this.playerId = Deserialize.int32(byteArray, index);
        this.skillId = Deserialize.int32(byteArray, index);
    }
    getSerializationSize() { return 8; }
}
RegisterCommand.push(CommandChooseSkill);
