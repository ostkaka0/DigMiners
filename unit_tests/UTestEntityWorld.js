g_unitTests.testEntityWorld = function() {
	var entityWorld = new EntityWorld();
    var entity = entityWorld.add();
    console.log("Entity id: " + entity.id);
    console.log("Entity isActive: " + entity.isActive);
    if (entity.isActive || entityWorld.entityArray.length > 0 || entityWorld.freeIdList.length > 0 || entityWorld.nextId != 1)
        return false;
    entityWorld.update();
    console.log("Entity id: " + entity.id);
    console.log("Entity isActive: " + entity.isActive);
    if (!entity.isActive || entityWorld.entityArray.length != 1 || entityWorld.freeIdList.length > 0 || entityWorld.nextId != 1) 
        return false;    
    entityWorld.remove(entity);
    console.log("Entity id: " + entity.id);
    console.log("Entity isActive: " + entity.isActive);
    if (!entity.isActive || entityWorld.entityArray.length != 1 || entityWorld.freeIdList.length > 0 || entityWorld.nextId != 1) 
        return false;
    entityWorld.update();
    console.log("Entity id: " + entity.id);
    console.log("Entity isActive: " + entity.isActive);
    if (entity.isActive || entityWorld.entityArray.length > 0 || entityWorld.freeIdList.length != 1 || entityWorld.nextId != 1) 
        return false;
	return true;
}
