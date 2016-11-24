
Projectiles = {};

Projectiles.BigEgg = {
    radius: 1.0,
    maxDistance: 50, // blocks
    speed: 1.0, // blocks per second
    damage: 10.0, // damage per hit
    blockDamage: 200.0,
    stayTime: 0, // milliseconds projectile will stay after hit
    textureName: "bigEgg",
    isExplosive: true,
    explosiveRadius: 2.0,
    explosiveEntityDamage: 30, // damage in HP units at center of explosion
    explosionBlockDamage: 10, // damage in block HP units at center of explosion
    explosionTileDamage: 1, // number of times to run CommandDig with above radius
    hitParticle: function() { return Particles.BigEgg }
}

Projectiles.Egg = {
    radius: 1.0,
    maxDistance: 200,
    speed: 1.75,
    damage: 10.0,
    blockDamage: 1.0,
    stayTime: 200,
    textureName: "egg",
    isExplosive: false,
    hitParticle: function() { return Particles.Egg }
}
