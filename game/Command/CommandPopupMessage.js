
CommandPopupMessage = function(text, timeout) {
    this.text = text;
    this.timeout = timeout;
    if (!timeout)
        this.timeout = 3000;
}

CommandPopupMessage.prototype.execute = function() {
    if (!isServer)
        new PopupMessage(this.text, this.timeout).show();
    else
        console.log(this.text);
}

CommandPopupMessage.prototype.serialize = function(byteArray, index) {
    serializeUTF8(byteArray, index, this.text);
    serializeInt32(byteArray, index, this.timeout);
}

CommandPopupMessage.prototype.deserialize = function(byteArray, index) {
    this.text = deserializeUTF8(byteArray, index);
    this.timeout = deserializeInt32(byteArray, index);
}

CommandPopupMessage.prototype.getSerializationSize = function() {
    return getUTF8SerializationSize(this.text) + 4;
}
