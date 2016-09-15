g_unitTests.testobjectWorld = function() {
	var objectWorld = new ObjectWorld();
    objectWorld.update();
    var object = objectWorld.add();
    if (object.isActive || objectWorld.objectArray.length != 0 || objectWorld.freeIdList.length > 0 || objectWorld.nextId != 2)
        return false;
    objectWorld.update();
    if (!object.isActive || objectWorld.objectArray.length != 1 || objectWorld.freeIdList.length > 0 || objectWorld.nextId != 2) 
        return false;    
    objectWorld.remove(object);
    if (!object.isActive || objectWorld.objectArray.length != 1 || objectWorld.freeIdList.length > 0 || objectWorld.nextId != 2) 
        return false;
    objectWorld.update();
    if (object.isActive || objectWorld.objectArray.length != 0 || objectWorld.freeIdList.length != 1 || objectWorld.nextId != 2) 
        return false;
	return true;
}
