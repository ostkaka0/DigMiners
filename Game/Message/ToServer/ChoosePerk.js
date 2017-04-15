
class MessageChoosePerk {
    constructor(level, perkId) {
        this.level = level;
        this.perkId = perkId;
    }
    execute(gameData, player) {
        if (this.level != player.perkLevel + 1) return;
        if (player.perkLevel >= player.level) return;
        sendCommand(new CommandChoosePerk(player.id, this.perkId));
    }
    send(socket) {
        socket.emit(this.idString, [this.level, this.perkId]);
    }
    receive(gameData, data) {
        this.level = data[0];
        this.perkId = data[1];
    }
}
TypeRegister.add(RegisterMessage.ToServer, MessageChoosePerk);
