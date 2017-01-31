var Serialize = require("Engine/Serialization.js").Serialize
var Deserialize = require("Engine/Serialization.js").Deserialize

var Config = require("Game/Config.js")
var Global = require("Game/Global.js")
var Command = require("Game/Command/Command.js")
var PopupMessage = require("Game/GUI/PopupMessage.js")

var CommandPopupMessage = function(text, timeout) {
    this.text = text;
    this.timeout = timeout;
    if (!timeout)
        this.timeout = 3000;
}
module.exports = CommandPopupMessage
Command.Register.push(module.exports)

CommandPopupMessage.prototype.execute = function() {
    if (!isServer)
        new PopupMessage(this.text, this.timeout).show();
    else
        console.log(this.text);
}

CommandPopupMessage.prototype.serialize = function(byteArray, index) {
    Serialize.utf8(byteArray, index, this.text);
    Serialize.int32(byteArray, index, this.timeout);
}

CommandPopupMessage.prototype.deserialize = function(byteArray, index) {
    this.text = Deserialize.utf8(byteArray, index);
    this.timeout = Deserialize.int32(byteArray, index);
}

CommandPopupMessage.prototype.getSerializationSize = function() {
    return Serialize.utf8Size(this.text) + 4;
}
