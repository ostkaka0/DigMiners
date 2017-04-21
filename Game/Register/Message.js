;

var RegisterMessage = [];
global.RegisterMessage = RegisterMessage;

RegisterMessage.ToClient = [];
RegisterMessage.ToServer = [];

RegisterMessage.init = function() {
    TypeRegister.addByArray(RegisterMessage, RegisterMessage.ToClient);
    TypeRegister.addByArray(RegisterMessage, RegisterMessage.ToServer);
    TypeRegister.sort(RegisterMessage);
}
