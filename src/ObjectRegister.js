objectRegisterAdd = function(array, object) {
    object.id = array.length;
    array.push(object);
    return array;
}

objectRegisterAddByArray = function(array, objectArray) {
    for (object of objectArray)
        registerObject(array, object);
    return array;
}

objectRegisterAddByObject = function(array, object) {
    for (key in object)
        objectRegisterAdd(array, object[key]);
    return array;
}
