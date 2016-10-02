compressRLE = function(byteArray, outputArray, begin, end) {
    outputArray = outputArray || [];
    begin = begin || 0
    end = end || byteArray.byteLength || byteArray.length;
    var currentByte = byteArray[begin];
    var currentLength = 1;
    for (var i = begin+1; i < end; ++i) {
        var byte = byteArray[i];
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

decompressRLE = function(arrayBuffer, outputArray, begin, end) {
    begin = begin || 0
    end = end || arrayBuffer.length || arrayBuffer.byteLength;
    var outputIndex = 0;
    var i = begin;
    while(i < end) {
        var length = arrayBuffer[i++];
        var byte = arrayBuffer[i++];
        for (var j = 0; j < length; j++)
            outputArray.fill(byte, outputIndex, outputIndex + length);
        outputIndex += length;
    }
    return outputArray;
}
