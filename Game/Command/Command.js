var TypeRegister = require("Engine/TypeRegister.js")

exports.Register = [];
exports.init = function() {
    TypeRegister.sort(exports.Register);
}
