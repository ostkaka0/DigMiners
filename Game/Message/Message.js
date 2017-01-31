var TypeRegister = require("Engine/TypeRegister.js");

exports.Register = [];
exports.ToClient = [];
exports.ToServer = [];

exports.init = function() {
    TypeRegister.addByArray(exports.Register, exports.ToClient);
    TypeRegister.addByArray(exports.Register, exports.ToServer);
    TypeRegister.sort(exports.Register);
}
