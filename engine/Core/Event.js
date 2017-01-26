var Event = {};
export default Event;

Event.subscribe = function(event, subscriber, callback, first) {
    if (first)
        event.unshift([subscriber, callback]);
    else
        event.push([subscriber, callback]);
}

Event.unsubscribe = function(event, subscriber) {
    for (var i = 0; i < event.length; i++) {
        if (event[i][0] !== subscriber) continue;
        event.splice(i, 1);
        break;
    }
}

Event.unsubscribeAll = function(events, subscriber) {
    Object.keys(events).forEach(function(key) {
        unsubscribeEvent(events[key], subscriber);
    });
}

Event.triggerEvent = function(event) {
    var args = Array.from(arguments).slice(1);
    event.forEach(function(callback) {
        callback[1].apply(null, args);
    });
}
