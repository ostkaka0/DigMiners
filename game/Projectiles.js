
Projectiles = {};

Projectiles.Egg = {
    radius: 1.0,
    maxDistance: 10, // blocks
    speed: 1.25, // blocks per second
    damage: 10.0, // damage per hit
    blockDamage: 5.0,
    stayTime: 0, // milliseconds projectile will stay after hit
    textureName: "egg",
    isExplosive: true,
    explosiveRadius: 5.0,
    explosiveEntityDamage: 20,
    explosionBlockDamage: 0.2, // modifier between 0 and 1
    explosionTileDamage: 2 // number of times to run CommandDig with above radius
}