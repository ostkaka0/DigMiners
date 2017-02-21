import TypeRegister from "Engine/Core/TypeRegister.js";

var Register = [];
export default Register;
Register.init = function() {
    TypeRegister.sort(Register);
}
