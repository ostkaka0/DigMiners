var Event = {};
export default Event;

Event.subscribe = function(event, subscriber, callback) {
    event.set(subscriber, callback);
}

Event.unsubscribe = function(event, subscriber) {
    event.delete(subscriber);
}

Event.unsubscribeAll = function(events, subscriber) {
    Object.keys(events).forEach((key) => events[key].delete(subscriber));
}

Event.trigger = function(event) {
    var args = Array.from(arguments).slice(1);
    event.forEach(function(callback) {
        callback.apply(null, args);
    });
}
