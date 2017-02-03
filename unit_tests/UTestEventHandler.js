import EventHandler from "../Engine/EventHandler.js";

g_unitTests.testEventHandler = function() {
    var eventHandler = new EventHandler("test", "bert", "karl");
    eventHandler.on("bert", function(arg1, arg2, arg3) {
        if (arg1 == "arg1" && arg2 == "arg2" && arg3 == "arg3")
            console.log("EventHandler test works 1/2");
        else
            console.log("EventHandler failed.");
    });
    eventHandler.on("bert", function(arg1, arg2, arg3) {
        if (arg1 == "arg1" && arg2 == "arg2" && arg3 == "arg3")
            console.log("EventHandler test works 2/2");
        else
            console.log("EventHandler failed.");
    });
    eventHandler.trigger("bert", "arg1", "arg2", "arg3");
    return true;
}
