
class MessageChooseSkill {
    constructor(skillId) {
        this.skillId = skillId;
    }
    execute(gameData, player) {
        if (this.skillId >= PlayerSkillRegister.length || this.skillId < 0) return;
        if (player.skillPoints < 1) return;
        sendCommand(new CommandChooseSkill(player.id, this.skillId));
    }
    send(socket) {
        socket.emit(this.idString, [this.skillId]);
    }
    receive(gameData, data) {
        this.skillId = data[0] >> 0;
    }
}
RegisterMessage.ToServer.push(MessageChooseSkill);
