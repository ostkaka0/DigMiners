
serializeInt32 = function (byteArray, index, value) {
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
    serializeInt32(byteArray, index, value * 65536);
}

deserializeFix = function (byteArray, index) {
    return deserializeInt32(byteArray, index) / 65536.0;
}

serializeV2 = function (byteArray, index, value) {
    serializeInt32(byteArray, index, value[0] * 65536);
    serializeInt32(byteArray, index + 4, value[1] * 65536);
}

deserializeV2 = function (byteArray, index) {
    return v2.create(deserializeInt32(byteArray, index) / 65536.0, deserializeInt32(byteArray, index + 4) / 65536.0);
}