g_unitTests.testEntityWorld = function() {
	var entityWorld = new EntityWorld();
    entityWorld.update();
    var entity = entityWorld.add();
    if (entity.isActive || entityWorld.entityArray.length != 0 || entityWorld.freeIdList.length > 0 || entityWorld.nextId != 2)
        return false;
    entityWorld.update();
    if (!entity.isActive || entityWorld.entityArray.length != 1 || entityWorld.freeIdList.length > 0 || entityWorld.nextId != 2) 
        return false;    
    entityWorld.remove(entity);
    if (!entity.isActive || entityWorld.entityArray.length != 1 || entityWorld.freeIdList.length > 0 || entityWorld.nextId != 2) 
        return false;
    entityWorld.update();
    if (entity.isActive || entityWorld.entityArray.length != 0 || entityWorld.freeIdList.length != 1 || entityWorld.nextId != 2) 
        return false;
	return true;
}
