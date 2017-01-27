var ObjectRegister = {};
export default ObjectRegister;

ObjectRegister.add = function(array, object) {
    object.id = array.length;
    array.push(object);
    return array;
}

ObjectRegister.addByArray = function(array, objectArray) {
    objectArray.forEach(function(object) {
        ObjectRegister.add(array, object);
    }.bind(this));
    return array;
}

ObjectRegister.addByObject = function(array, object) {
    for (var key in object)
        ObjectRegister.add(array, object[key]);
    return array;
}
