import TypeRegister from "Engine/TypeRegister.js";;

var Message = {};
export default Message;

Message.Register = [];
Message.ToClient = [];
Message.ToServer = [];

Message.init = function() {
    TypeRegister.addByArray(Message.Register, Message.ToClient);
    TypeRegister.addByArray(Message.Register, Message.ToServer);
    TypeRegister.sort(Message.Register);
}
