
var entityTemplateTurret = function(entityId, pos, teamId) {
    var entity = {};
    entity.physicsBody = new EntityPhysicsBody(v2.create(pos[0], pos[1]), 0.01, 10.0, 10, 0.5);
    entity.movement = new EntityMovement(0);
    entity.inventory = EntityInventory.createInventory(entityId, 10, 1);
    entity.equippedItems = new EntityEquippedItems();

    var bottomSprite = new Sprite(Client.textures["turret/bottom.png"]);

    var bodyParts = {
        "bottom": new BodyPart(bottomSprite, 0, 0, 0, null, null, true),
        "top": new BodyPart(new Sprite(), 0, 0, 0, null, null),
        "tool": new BodyPart(new Sprite(), 0, 0, 0, null, "top"),
    };

    entity.bodyParts = new EntityBodyparts(bodyParts);
    entity.drawable = new EntityDrawable(1);
    var healthbarSprite = new Sprite(Client.textures["healthbar.png"]);
    entity.drawable.addSprite("healthbar", healthbarSprite, v2.create(0, -35), false, true);

    entity.health = new EntityHealth(50, 50, 0.0);
    entity.team = new EntityTeam(teamId);
    //entity.ammo = new EntityAmmo();

    entity.behaviourContainer = new BehaviourContainer();
    entity.behaviourContainer.behaviours.push(new BehaviourTurret(entity, 10.0));
    entity.behaviourContainer.behaviours.push(new BehaviourTurretIdle(entity));

    return entity;
}

ObjectRegister.add(EntityTemplateRegister, entityTemplateTurret);
