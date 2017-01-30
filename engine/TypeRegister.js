var binarySearch = "engine/Core/BinarySearch.js"

var TypeRegister = module.exports;

TypeRegister.add = function(array, type) {
    console.log(type)
    if (type.prototype.id != undefined) return;

    type.prototype.id = array.length;
    type.prototype.idString = type.prototype.id.toString(36);
    array.push(type);
    return array;
}

TypeRegister.addByArray = function(array, typeArray) {
    typeArray.forEach(function(type) {
        TypeRegister.add(array, type);
    }.bind(this));
    return array;
}

TypeRegister.sort = function(array) {
    array.sort((a,b) => (a.name < b.name)? -1 : 1);
    for(var i = 0; i < array.length; i++) {
        var type = array[i];
        type.prototype.id = i;
        type.prototype.idString = i.toString(36);
    }
}
