


var entityTemplateMonsterSpawner = function(entityId, pos, entityTemplate, maxEntities, radius, duration, items, equippedItemId, teamId) {
    var entity = {};
    entity.spawner = new EntitySpawner(entityTemplate, pos, maxEntities, radius, duration, items, equippedItemId, null, teamId);
    return entity;
}
