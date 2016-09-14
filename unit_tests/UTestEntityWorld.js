g_unitTests.testEntityWorld = function() {
	var entityWorld = new EntityWorld();
    var entity = entityWorld.add();
    if (entity.isActive || entityWorld.entityArray.length > 0 || entityWorld.freeIdList.length > 0 || entityWorld.nextId != 1)
        return false;
    entityWorld.update();
    if (!entity.isActive || entityWorld.entityArray.length != 1 || entityWorld.freeIdList.length > 0 || entityWorld.nextId != 1) 
        return false;    
    entityWorld.remove(entity);
    if (!entity.isActive || entityWorld.entityArray.length != 1 || entityWorld.freeIdList.length > 0 || entityWorld.nextId != 1) 
        return false;
    entityWorld.update();
    if (entity.isActive || entityWorld.entityArray.length > 0 || entityWorld.freeIdList.length != 1 || entityWorld.nextId != 1) 
        return false;
	return true;
}
