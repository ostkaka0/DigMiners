
Projectiles = {};

Projectiles.BigEgg = {
    radius: 1.0,
    maxDistance: 50, // blocks
    speed: 15.0, // blocks per second
    damage: 10.0, // damage per hit
    blockDamage: 100.0,
    stayTime: 0, // milliseconds projectile will stay after hit
    textureName: "bigEgg",
    isExplosive: true,
    explosiveRadius: 3.0,
    explosiveEntityDamage: 30, // damage in HP units at center of explosion
    explosionBlockDamage: 20, // damage in block HP units at center of explosion
    explosionTileDamage: 1, // number of times to run CommandDig with above radius
    hitParticle: function() { return Particles.BigEgg }
}

Projectiles.Egg = {
    radius: 1.0,
    maxDistance: 200,
    speed: 25.0,
    damage: 10.0,
    blockDamage: 4.0,
    stayTime: 200,
    textureName: "egg",
    isExplosive: false,
    hitParticle: function() { return Particles.Egg }
}
