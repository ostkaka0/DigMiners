import TypeRegister from "Engine/TypeRegister.js";

var Register = [];
export default Register;
Register.init = function() {
    TypeRegister.sort(Register);
}
