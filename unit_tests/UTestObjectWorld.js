import ObjectWorld from "../engine/ObjectWorld.js"

g_unitTests.testobjectWorld = function() {
    var idList = new IdList();
    var objectWorld = new ObjectWorld();
    objectWorld.onRemove["UTestObjectWorld.js"] = function(object) { idList.remove(object.id); };
    objectWorld.update();
    var object = objectWorld.add({}, idList.next());
    if(object.isActive || objectWorld.objectArray.length != 0 || idList.freeIdList.length > 0 || idList.nextId != 2)
        return false;
    objectWorld.update();
    if(!object.isActive || objectWorld.objectArray.length != 1 || idList.freeIdList.length > 0 || idList.nextId != 2)
        return false;
    objectWorld.remove(object);
    if(!object.isActive || objectWorld.objectArray.length != 1 || idList.freeIdList.length > 0 || idList.nextId != 2)
        return false;
    objectWorld.update();
    if(object.isActive || objectWorld.objectArray.length != 0 || idList.freeIdList.length != 1 || idList.nextId != 2)
        return false;
    return true;
}
