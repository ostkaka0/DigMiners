var TypeRegister = {};
export default TypeRegister;

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
