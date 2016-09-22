
Client = function (ip, port) {
    console.log("Connecting to " + ip + ":" + port + "...");
    socket = io(ip + ":" + port);

    socket.on('connect', function () {

        setInterval(function () {
            startTime = Date.now();
            socket.emit('ping');
        }, 2000);

        console.log("Connected.");
    });

    socket.on('message', function (msg) {
        console.log("Message from server: " + msg);
    });

    socket.on('command', function (data) {
        if (data[0] == "CommandPlayerMove")
            commands.push(new CommandPlayerMove(data[1][0], data[1][1]));
        //console.log("Received " + data[0] + " and " + JSON.stringify(data[1]));
    });

    socket.on('error', function (error) {
        console.log("Connection failed. " + error);
    });

    socket.on('ping', function () {
        socket.emit('pong', Date.now());
    });

    socket.on('pong', function (time) {
        ping = 2 * (Date.now() - time);
    });
}

Client.prototype.sendCommand = function (command) {
    socket.emit("command", [command.getName(), command.getData()]);
    //console.log("Sent " + command.getName() + " and " + JSON.stringify(command.getData()));
}