
var EventHandler = function() {
    for (var i = 0; i < arguments.length; ++i)
        this[arguments[i]] = [];
}

module.exports = EventHandler;

EventHandler.prototype.trigger = function() {
    var eventName = arguments[0];
    var args = (Array.from(arguments)).slice(1, arguments.length + 1);
    if (!this[eventName])
        this[eventName] = [];
    for (var i = 0; i < this[eventName].length; ++i)
        this[eventName][i].apply(null, args);
}

EventHandler.prototype.on = function(eventName, func) {
    if (!this[eventName])
        this[eventName] = [];
    this[eventName].push(func);
}
