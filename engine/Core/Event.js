
subscribeEvent = function(event, subscriber, callback) {
    event.push([subscriber, callback]);
}

unsubscribeEvent = function(event, subscriber) {
    for (var i = 0; i < event.length; i++) {
        if (event[i][0] !== subscriber) continue;
        event.splice(i, 1);
        break;
    }
}

unsubscribeEvents = function(events, subscriber) {
    Object.keys(events).forEach(function(key) {
        unsubscribeEvent(events[key], subscriber);
    });
}

triggerEvent = function(event) {
    var args = Array.from(arguments).slice(1);
    event.forEach(function(callback) {
        callback[1].apply(null, args);
    });
}
