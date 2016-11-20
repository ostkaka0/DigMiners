
EventHandler = function() {
    for (var i = 0; i < arguments.length; ++i)
        this[arguments[i]] = [];
}

EventHandler.prototype.trigger = function() {
    var eventName = arguments[0];
    var args = (Array.from(arguments)).slice(1, arguments.length + 1);
    for (var i = 0; i < this[eventName].length; ++i)
        this[eventName][i].apply(null, args);
}

EventHandler.prototype.on = function(eventName, func) {
    this[eventName].push(func);
}