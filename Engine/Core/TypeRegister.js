
var TypeRegister = {};// = module.exports;
global.TypeRegister = TypeRegister;

TypeRegister.add = function(array, type) {
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
    array.sort((a,b) => a.name.localeCompare(b.name));
    for(var i = 0; i < array.length; i++) {
        array[i].prototype.id = i;
        array[i].prototype.idString = i.toString(36);
    }
}
