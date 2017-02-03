import {Serialize} from "Engine/Serialization.js";
import {Deserialize} from "Engine/Serialization.js";

import Config from "Game/Config.js";
import Global from "Game/Global.js";
import Command from "Game/Command/Command.js";
import PopupMessage from "Game/GUI/PopupMessage.js";

var CommandPopupMessage = function(text, timeout) {
    this.text = text;
    this.timeout = timeout;
    if (!timeout)
        this.timeout = 3000;
}
export default CommandPopupMessage;
Command.Register.push(CommandPopupMessage);

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
