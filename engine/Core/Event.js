
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

triggerEvent = function(event) {
    var args = [...arguments].slice(1);
    event.forEach(function(callback) {
        callback[1].apply(null, args);
    });
}
