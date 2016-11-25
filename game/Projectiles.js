
Projectiles = {};

Projectiles.BigEgg = {
    radius: 1.0,
    maxDistance: 50, // blocks
    speed: 25.0, // blocks per second
    damage: 10.0, // damage per hit
    blockDamage: 200.0,
    stayTime: 0, // milliseconds projectile will stay after hit
    textureName: "bigEgg",
    isExplosive: true,
    explosiveRadius: 2.0,
    explosiveEntityDamage: 30, // damage in HP units at center of explosion
    explosionBlockDamage: 15, // damage in block HP units at center of explosion
    explosionTileDamage: 1, // number of times to run CommandDig with above radius
    hitParticle: function() { return Particles.BigEgg },
    scaleX: 1.0,
    scaleY: 1.0
}

Projectiles.Egg = {
    radius: 0.2,
    maxDistance: 200,
    speed: 100.0,
    damage: 3.0,
    blockDamage: 1.0,
    stayTime: 0,
    textureName: "egg",
    isExplosive: false,
    hitParticle: function() { return Particles.Egg },
    scaleX: 8.0,
    scaleY: 0.5
}

Projectiles.CrossbowArrow = {
    radius: 0.2,
    maxDistance: 400,
    speed: 200.0,
    damage: 70.0,
    blockDamage: 40.0,
    stayTime: 0,
    textureName: "egg",
    isExplosive: false,
    hitParticle: function() { return Particles.Egg },
    scaleX: 16.0,
    scaleY: 0.25
}

Projectiles.Nail = {
    radius: 0.2,
    maxDistance: 100,
    speed: 80.0,
    damage: 4.0,
    blockDamage: 1.0,
    stayTime: 0,
    textureName: "egg",
    isExplosive: false,
    hitParticle: function() { return Particles.Egg },
    scaleX: 8.0,
    scaleY: 0.25
}
