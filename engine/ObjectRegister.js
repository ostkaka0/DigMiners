objectRegisterAdd = function(array, object) {
    object.id = array.length;
    array.push(object);
    return array;
}

objectRegisterAddByArray = function(array, objectArray) {
    objectArray.forEach(function(object) {
        registerObject(array, object);
    }.bind(this));
    return array;
}

objectRegisterAddByObject = function(array, object) {
    for (key in object)
        objectRegisterAdd(array, object[key]);
    return array;
}
