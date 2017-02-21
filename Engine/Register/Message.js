import TypeRegister from "Engine/Core/TypeRegister.js";;

var Register = [];
export default Register;

Register.ToClient = [];
Register.ToServer = [];

Register.init = function() {
    TypeRegister.addByArray(Register, Register.ToClient);
    TypeRegister.addByArray(Register, Register.ToServer);
    TypeRegister.sort(Register);
}
