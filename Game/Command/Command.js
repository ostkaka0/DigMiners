import TypeRegister from "Engine/TypeRegister.js";

var Command = {};
export default Command;
Command.Register = [];
Command.init = function() {
    TypeRegister.sort(Command.Register);
}
