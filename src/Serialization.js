serializeInt32 = function(byteArray, value) {

    console.log(byteArray);
    byteArray.push((value >> 24) & 0xFF);
    byteArray.push((value >> 16) & 0xFF);
    byteArray.push((value >> 8)  & 0xFF);
    byteArray.push((value)       & 0xFF);
}

deserializeInt32 = function(byteArray, index) {
    var value = (byteArray[index++] << 24)
              | (byteArray[index++] << 16)
              | (byteArray[index++] << 8)
              | (byteArray[index++]);
}