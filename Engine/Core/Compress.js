
global.compressRLE = function(inputArray, outputArray, begin, end) {
    var outputArray = outputArray || [];
    var begin = begin || 0
    var end = end || inputArray.byteLength || inputArray.length;
    var currentByte = inputArray[begin];
    var currentLength = 1;
    for (var i = begin + 1; i < end; ++i) {
        var byte = inputArray[i];
        if (byte == currentByte && currentLength < 255) {
            currentLength++;
        } else {
            outputArray.push(currentLength, currentByte);
            currentByte = byte;
            currentLength = 1;
        }
    }
    outputArray.push(currentLength, currentByte);

    return outputArray;
}

global.decompressRLE = function(arrayBuffer, outputArray, begin, end) {
    var begin = begin || 0
    var end = end || arrayBuffer.length || arrayBuffer.byteLength;
    var outputIndex = 0;
    var i = begin;
    while (i < end) {
        var length = arrayBuffer[i++];
        var byte = arrayBuffer[i++];
        for (var j = 0; j < length; j++) {
            //TODO: check why for-loop is faster than .fill(twice as fast)
            for (var k = outputIndex; k < outputIndex + length; ++k)
                outputArray[k] = byte;
            //outputArray.fill(byte, outputIndex, outputIndex + length);
        }
        outputIndex += length;
    }
    return outputArray;
}
