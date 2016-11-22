
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
    explosionTileDamage: 2, // number of times to run CommandDig with above radius
    hitParticle: Particles.Gas
}

Projectiles.Egg = {
    radius: 1.0,
    maxDistance: 200,
    speed: 1.75,
    damage: 10.0,
    blockDamage: 0.0,
    stayTime: 200,
    textureName: "egg",
    isExplosive: false,
    hitParticle: Particles.Gas
}
