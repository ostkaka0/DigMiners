




var CommandWorldSpawnStatus = function(spawns = null, spawnAllowed = true) {
    this.spawns = spawns;
    this.spawnAllowed = spawnAllowed;
}
global.CommandWorldSpawnStatus = CommandWorldSpawnStatus;
RegisterCommand.push(CommandWorldSpawnStatus);

CommandWorldSpawnStatus.prototype.execute = function() {
    World.playerSpawnAllowed = this.spawnAllowed;
    if (this.spawns) World.playerSpawns = this.spawns;
}

CommandWorldSpawnStatus.prototype.serialize = function(byteArray, index) {
    Serialize.booleans(byteArray, index, [this.spawnAllowed]);
    /*if (this.spawns == null) {
        // Don't update spawn-list
        Serialize.int32(byteArray, index, -1);
        return;
    }
    Serialize.int32(byteArray, index, Object.keys(this.spawns).length);

    Object.keys(this.spawns).forEach(teamId => {
        var spawnArray = this.spawns[teamId];
        Serialize.int32(byteArray, index, teamId);
        Serialize.int32(byteArray, index, spawnArray.length);
        for (var i = 0; i < spawnArray.length; i++) {
            Serialize.v2(byteArray, index, spawnArray[i]);
        }
    });*/
}

CommandWorldSpawnStatus.prototype.deserialize = function(byteArray, index) {
    this.spawnAllowed = Deserialize.booleans(byteArray, index)[0];
    /*this.spawns = {};
    var numTeams = Deserialize.int32(byteArray, index);
    if (numTeams == -1) return; // Don't update spawn-list

    this.spawns = {};
    for (var i = 0; i < numTeams; i++) {
        var spawnArray = [];
        var teamId = Deserialize.int32(byteArray, index);
        var numSpawns = Deserialize.int32(byteArray, index);
        for (var i = 0; i < numSpawns; i++) {
            spawnArray.push(Deserialize.v2(byteArray, index));
        }
        this.spawns[teamId] = spawnArray;
    }*/
}

CommandWorldSpawnStatus.prototype.getSerializationSize = function() {
    return 1;
}
