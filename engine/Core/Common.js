forOf = function(thisRef, array, userFunction) {
    array.forEach(userFunction.bind(thisRef));
}

forIn = function(thisRef, object, userFunction) {
    Object.keys(object).forEach(userFunction.bind(thisRef));
}
