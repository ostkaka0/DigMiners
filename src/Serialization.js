
serializeInt32 = function (byteArray, index, value) {
    byteArray[index.value] = (value >> 24) & 0xFF;
    byteArray[index.value + 1] = (value >> 16) & 0xFF;
    byteArray[index.value + 2] = (value >> 8) & 0xFF;
    byteArray[index.value + 3] = (value) & 0xFF;
    index.add(4);
}

deserializeInt32 = function (byteArray, index) {
    var value = (byteArray[index.value] << 24)
        | (byteArray[index.value + 1] << 16)
        | (byteArray[index.value + 2] << 8)
        | (byteArray[index.value + 3]);
    index.add(4);
    return value;
}

serializeFix = function (byteArray, index, value) {
    serializeInt32(byteArray, index, value * 65536);
}

deserializeFix = function (byteArray, index) {
    var out = deserializeInt32(byteArray, index) / 65536.0;
    return out;
}

serializeV2 = function (byteArray, index, value) {
    serializeInt32(byteArray, index, value[0] * 65536);
    serializeInt32(byteArray, index, value[1] * 65536);
}

deserializeV2 = function (byteArray, index) {
    var out = v2.create(deserializeInt32(byteArray, index) / 65536.0, deserializeInt32(byteArray, index) / 65536.0);
    return out;
}

serializeUint8Array = function (byteArray, index, value) {
    byteArray.set(value, index.value);
    index.add(value.length);
}

deserializeUint8Array = function (byteArray, index, arrayLength) {
    console.dir(byteArray);
    var out = byteArray.slice(index.value, arrayLength);
    index.add(arrayLength);
    return out;
}