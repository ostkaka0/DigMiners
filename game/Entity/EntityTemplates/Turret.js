import fix from "engine/Core/Fix.js"
import v2 from "engine/Core/v2.js"
import Sprite from "engine/Animation/Sprite.js"
import BodyPart from "engine/Animation/BodyPart.js"
import PhysicsBody from "game/Entity/PhysicsBody.js"
import Bodyparts from "game/Entity/Bodyparts.js"
import Drawable from "game/Entity/Drawable.js"
import { Team, Teams } from "game/Entity/Team.js"
import Health from "game/Entity/Health.js"
import Ammo from "game/Entity/Ammo.js"
import Movement from "game/Entity/Movement.js"
import Inventory from "game/Entity/Inventory.js"
import EquippedItems from "game/Entity/EquippedItems.js"
import PotionEffects from "game/Entity/PotionEffects.js"
import BehaviourContainer from "game/Entity/AI/BehaviourContainer.js"
import TurretBehaviour from "game/Entity/AI/TurretBehaviour.js"
import TurretIdleBehaviour from "game/Entity/AI/TurretIdleBehaviour.js"

export default function(entityId, pos, teamId) {
    var entity = {};
    entity.physicsBody = new PhysicsBody(v2.create(pos[0], pos[1]), 0.01, 10.0, 1000, 0.5);
    entity.movement = new Movement(0);
    entity.inventory = Inventory.createInventory(entityId, 10, 1);
    entity.equippedItems = new EquippedItems();

    var bottomSprite = new Sprite("turret/bottom.png");

    var bodyparts = {
        "bottom": new BodyPart(bottomSprite, 0, 0, 0, null, null, true),
        "top": new BodyPart(new Sprite(), 0, 0, 0, null, null),
        "tool": new BodyPart(new Sprite(), 0, 0, 0, null, "top"),
    };

    entity.bodyparts = new Bodyparts(bodyparts);
    entity.drawable = new Drawable(1);
    var healthbarSprite = new Sprite("healthbar.png", null, false);
    entity.drawable.addSprite("healthbar", healthbarSprite, v2.create(0, -35), false, true);

    entity.health = new Health(50, 50, 0.0);
    entity.team = new Team(teamId);
    entity.ammo = new Ammo();

    entity.behaviourContainer = new BehaviourContainer();
    entity.behaviourContainer.behaviours.push(new TurretBehaviour(entity, 10.0));
    entity.behaviourContainer.behaviours.push(new TurretIdleBehaviour(entity));

    return entity;
}