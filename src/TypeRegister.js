typeRegisterAdd = function(array, type) {
    if (type.prototype.id != undefined) return;
    
	type.prototype.id = array.length;
	type.prototype.idString = type.prototype.id.toString(36);
    array.push(type);
    return array;
}

typeRegisterAddByArray = function(array, typeArray) {
    forOf(this, typeArray, function(type) {
        typeRegisterAdd(array, type); 
    });
    return array;
}
