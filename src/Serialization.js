
serializeInt32 = function (byteArray, index, value) {
    console.log(byteArray);
    byteArray[index] = (value >> 24) & 0xFF;
    byteArray[index + 1] = (value >> 16) & 0xFF;
    byteArray[index + 2] = (value >> 8) & 0xFF;
    byteArray[index + 3] = (value) & 0xFF;
}

deserializeInt32 = function (byteArray, index) {
    var value = (byteArray[index++] << 24)
        | (byteArray[index++] << 16)
        | (byteArray[index++] << 8)
        | (byteArray[index++]);
    return value;
}

serializeFix = function (byteArray, index, value) {
    return serializeInt32(byteArray, index, value * 65536)
}

deserializeFix = function (byteArray, index) {
    return deserializeInt32(byteArray, index, value) / 65536.0;
}