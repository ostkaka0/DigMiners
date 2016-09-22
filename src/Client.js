
Client = function (ip, port) {
    console.log("Connecting to " + ip + ":" + port + "...");
    socket = io(ip + ":" + port);

    socket.on('connect', function () {
        console.log("Connected.");
    });

    socket.on('message', function (msg, data) {
        console.log("Message from server: " + msg);
    });

    socket.on('command', function (data) {
        if (data[0] == "CommandPlayerMove")
            commands.push(new CommandPlayerMove(data[1]["playerId"], data[1]["playerMoveDirection"]));
        console.log("Received " + data[0] + " and " + JSON.stringify(data[1]));
    });

    socket.on('error', function (error) {
        console.log("Connection failed. " + error);
    });
}

Client.prototype.sendCommand = function (command) {
    socket.emit("command", [command.getName(), command.getData()]);
    console.log("Sent " + command.getName() + " and " + JSON.stringify(command.getData()));
}