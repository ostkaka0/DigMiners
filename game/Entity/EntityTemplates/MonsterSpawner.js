
var Spawner = require("game/Entity/Spawner.js")

module.exports = function(entityId, pos, entityTemplate, maxEntities, radius, duration, items, equippedItemId, teamId) {
    var entity = {};
    entity.spawner = new Spawner(entityTemplate, pos, maxEntities, radius, duration, items, equippedItemId, null, teamId);
    return entity;
}
