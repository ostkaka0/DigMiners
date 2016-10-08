
serializeBooleans = function(byteArray, index, booleans) {
    for(var i = 0; i < 8; ++i) {
        if(booleans[i] == null || booleans[i] == undefined)
            booleans[i] = false;
    }
    var bitField = (booleans[0] ? 1 : 0) |
        (booleans[1] ? 2 : 0) |
        (booleans[2] ? 4 : 0) |
        (booleans[3] ? 8 : 0) |
        (booleans[4] ? 16 : 0) |
        (booleans[5] ? 32 : 0) |
        (booleans[6] ? 64 : 0) |
        (booleans[7] ? 128 : 0);
    serializeInt8(byteArray, index, bitField);
}

deserializeBooleans = function(byteArray, index) {
    var bitField = deserializeInt8(byteArray, index);
    var booleans = [];
    booleans[0] = (bitField & 1 != 0);
    booleans[1] = (bitField & 2 != 0);
    booleans[2] = (bitField & 4 != 0);
    booleans[3] = (bitField & 8 != 0);
    booleans[4] = (bitField & 16 != 0);
    booleans[5] = (bitField & 32 != 0);
    booleans[6] = (bitField & 64 != 0);
    booleans[7] = (bitField & 128 != 0);
    return booleans;
}

serializeInt8 = function(byteArray, index, value) {
    byteArray[index.value] = value & 0XFF;
    index.add(1);
}

deserializeInt8 = function(byteArray, index) {
    var value = byteArray[index.value];
    index.add(1);
    return value;
}

serializeInt32 = function(byteArray, index, value) {
    byteArray[index.value] = (value >> 24) & 0xFF;
    byteArray[index.value + 1] = (value >> 16) & 0xFF;
    byteArray[index.value + 2] = (value >> 8) & 0xFF;
    byteArray[index.value + 3] = (value) & 0xFF;
    index.add(4);
}

deserializeInt32 = function(byteArray, index) {
    var value = (byteArray[index.value] << 24)
        | (byteArray[index.value + 1] << 16)
        | (byteArray[index.value + 2] << 8)
        | (byteArray[index.value + 3]);
    index.add(4);
    return value;
}

serializeFix = function(byteArray, index, value) {
    serializeInt32(byteArray, index, toFix(value) * fix.denominator);
}

deserializeFix = function(byteArray, index) {
    return toFix(deserializeInt32(byteArray, index) / fix.denominator);
}

serializeV2 = function(byteArray, index, value) {
    serializeFix(byteArray, index, value[0]);
    serializeFix(byteArray, index, value[1]);
}

deserializeV2 = function(byteArray, index) {
    return v2.create(deserializeFix(byteArray, index), deserializeFix(byteArray, index));
}

serializeUint8Array = function(byteArray, index, value) {
    for(var i = index.value; i < index.value + value.length; ++i)
        byteArray[i] = value[i - index.value];
    index.add(value.length);
}

deserializeUint8Array = function(byteArray, index, arrayLength) {
    var out = new Uint8Array(arrayLength);
    for(var i = index.value; i < index.value + arrayLength; ++i)
        out[i - index.value] = byteArray[i];
    index.add(arrayLength);
    return out;
}

getUTF8SerializationSize = function(value) {
    var out = [], p = 0;
    for(var i = 0; i < value.length; i++) {
        var c = value.charCodeAt(i);
        if(c < 128) {
            out[p++] = c;
        } else if(c < 2048) {
            out[p++] = (c >> 6) | 192;
            out[p++] = (c & 63) | 128;
        } else if(
            ((c & 0xFC00) == 0xD800) && (i + 1) < value.length &&
            ((value.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {
            c = 0x10000 + ((c & 0x03FF) << 10) + (value.charCodeAt(++i) & 0x03FF);
            out[p++] = (c >> 18) | 240;
            out[p++] = ((c >> 12) & 63) | 128;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        } else {
            out[p++] = (c >> 12) | 224;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
    }
    return out.length + 4; // 4 is length required to store string length in serialization functions
};


serializeUTF8 = function(byteArray, index, value) {
    var out = [], p = 0;
    for(var i = 0; i < value.length; i++) {
        var c = value.charCodeAt(i);
        if(c < 128) {
            out[p++] = c;
        } else if(c < 2048) {
            out[p++] = (c >> 6) | 192;
            out[p++] = (c & 63) | 128;
        } else if(
            ((c & 0xFC00) == 0xD800) && (i + 1) < value.length &&
            ((value.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {
            c = 0x10000 + ((c & 0x03FF) << 10) + (value.charCodeAt(++i) & 0x03FF);
            out[p++] = (c >> 18) | 240;
            out[p++] = ((c >> 12) & 63) | 128;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        } else {
            out[p++] = (c >> 12) | 224;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
    }
    serializeInt32(byteArray, index, out.length);
    serializeUint8Array(byteArray, index, out);
};

deserializeUTF8 = function(byteArray, index) {
    var length = deserializeInt32(byteArray, index);
    var bytes = deserializeUint8Array(byteArray, index, length);

    var out = [], pos = 0, c = 0;
    while(pos < bytes.length) {
        var c1 = bytes[pos++];
        if(c1 < 128) {
            out[c++] = String.fromCharCode(c1);
        } else if(c1 > 191 && c1 < 224) {
            var c2 = bytes[pos++];
            out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
        } else if(c1 > 239 && c1 < 365) {
            var c2 = bytes[pos++];
            var c3 = bytes[pos++];
            var c4 = bytes[pos++];
            var u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 0x10000;
            out[c++] = String.fromCharCode(0xD800 + (u >> 10));
            out[c++] = String.fromCharCode(0xDC00 + (u & 1023));
        } else {
            var c2 = bytes[pos++];
            var c3 = bytes[pos++];
            out[c++] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
        }
    }
    return out.join('');
};
