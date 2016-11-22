
Projectiles = {};

Projectiles.BigEgg = {
    radius: 1.0,
    maxDistance: 50, // blocks
    speed: 1.0, // blocks per second
    damage: 60.0, // damage per hit
    blockDamage: 5.0,
    stayTime: 0, // milliseconds projectile will stay after hit
    textureName: "bigEgg",
    isExplosive: true,
    explosiveRadius: 5.0,
    explosiveEntityDamage: 60, // damage in HP units at center of explosion
    explosionBlockDamage: 400, // damage in block HP units at center of explosion
    explosionTileDamage: 2 // number of times to run CommandDig with above radius
}

Projectiles.Egg = {
    radius: 1.0,
    maxDistance: 200, // blocks
    speed: 1.75, // blocks per second
    damage: 10.0, // damage per hit
    blockDamage: 0.0,
    stayTime: 200, // milliseconds projectile will stay after hit
    textureName: "egg",
    isExplosive: false,
}
