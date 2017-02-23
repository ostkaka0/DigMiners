import fix from "Engine/Core/Fix.js";
import v2 from "Engine/Core/v2.js";
import Sprite from "Engine/Animation/Sprite.js";
import BodyPart from "Engine/Animation/BodyPart.js";
import EntityPhysicsBody from "Engine/Entity/PhysicsBody.js";
import EntityBodyparts from "Game/Entity/Bodyparts.js";
import EntityDrawable from "Engine/Entity/Drawable.js";
import EntityTeam from "Engine/Entity/Team.js";
import EntityHealth from "Engine/Entity/Health.js";
import EntityAmmo from "Engine/Entity/Ammo.js";
import EntityMovement from "Engine/Entity/Movement.js";
import EntityInventory from "Engine/Entity/Inventory.js";
import EntityEquippedItems from "Engine/Entity/EquippedItems.js";
import EntityPotionEffects from "Game/Entity/PotionEffects.js";
import BehaviourContainer from "Game/Entity/AI/Container.js";
import BehaviourTurret from "Game/Entity/AI/Turret.js";
import BehaviourTurretIdle from "Game/Entity/AI/TurretIdle.js";

export default function(entityId, pos, teamId) {
    var entity = {};
    entity.physicsBody = new EntityPhysicsBody(v2.create(pos[0], pos[1]), 0.01, 10.0, 10, 0.5);
    entity.movement = new EntityMovement(0);
    entity.inventory = EntityInventory.createInventory(entityId, 10, 1);
    entity.equippedItems = new EntityEquippedItems();

    var bottomSprite = new Sprite("turret/bottom.png");

    var bodyparts = {
        "bottom": new BodyPart(bottomSprite, 0, 0, 0, null, null, true),
        "top": new BodyPart(new Sprite(), 0, 0, 0, null, null),
        "tool": new BodyPart(new Sprite(), 0, 0, 0, null, "top"),
    };

    entity.bodyparts = new EntityBodyparts(bodyparts);
    entity.drawable = new EntityDrawable(1);
    var healthbarSprite = new Sprite("healthbar.png", null, false);
    entity.drawable.addSprite("healthbar", healthbarSprite, v2.create(0, -35), false, true);

    entity.health = new EntityHealth(50, 50, 0.0);
    entity.team = new EntityTeam(teamId);
    //entity.ammo = new EntityAmmo();

    entity.behaviourContainer = new BehaviourContainer();
    entity.behaviourContainer.behaviours.push(new BehaviourTurret(entity, 10.0));
    entity.behaviourContainer.behaviours.push(new BehaviourTurretIdle(entity));

    return entity;
}
