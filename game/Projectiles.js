
Projectiles = {};

Projectiles.Pistol = {
    radius: 0.2,
    maxDistance: 150,
    speed: 80.0,
    damage: 20.0,
    armorPenentration: 0.3,
    blockDamage: 8.0,
    stayTime: 50,
    textureName: "egg.png",
    isExplosive: false,
    hitParticle: function() { return Particles.Egg },
    scaleX: 8.0,
    scaleY: 0.5,
}

Projectiles.Smg = {
    radius: 0.2,
    maxDistance: 150,
    speed: 80.0,
    damage: 8.0,
    armorPenentration: 0.0,
    blockDamage: 1.0,
    stayTime: 50,
    textureName: "egg.png",
    isExplosive: false,
    hitParticle: function() { return Particles.Egg },
    scaleX: 8.0,
    scaleY: 0.5
}

Projectiles.AssaultRifle = {
    radius: 0.2,
    maxDistance: 200,
    speed: 120.0,
    damage: 10.0,
    armorPenentration: 0.3,
    blockDamage: 1.0,
    stayTime: 50,
    textureName: "egg.png",
    isExplosive: false,
    hitParticle: function() { return Particles.Egg },
    scaleX: 12.0,
    scaleY: 0.35
}

Projectiles.MachineGun = {
    radius: 0.2,
    maxDistance: 200,
    speed: 150.0,
    damage: 14.0,
    armorPenentration: 0.0,
    blockDamage: 1.0,
    stayTime: 50,
    textureName: "egg.png",
    isExplosive: false,
    hitParticle: function() { return Particles.Egg },
    scaleX: 20.0,
    scaleY: 0.2
}

Projectiles.Shotgun = {
    radius: 0.2,
    maxDistance: 100,
    speed: 80.0,
    damage: 6.0,
    armorPenentration: 0.0,
    blockDamage: 3.0,
    stayTime: 50,
    textureName: "egg.png",
    isExplosive: false,
    hitParticle: function() { return Particles.Egg },
    scaleX: 8.0,
    scaleY: 0.25
}

Projectiles.SniperRifle = {
    radius: 0.2,
    maxDistance: 400,
    speed: 150.0,
    damage: 80.0,
    armorPenentration: 0.5,
    blockDamage: 40.0,
    stayTime: 50,
    textureName: "egg.png",
    isExplosive: false,
    hitParticle: function() { return Particles.Egg },
    scaleX: 20.0,
    scaleY: 0.2,
    penentrateBunkerWindow: true
}

Projectiles.GrenadeLauncher = {
    radius: 1.0,
    maxDistance: 50, // blocks
    speed: 25.0, // blocks per second
    damage: 40.0, // damage per hit
    armorPenentration: 1.0,
    blockDamage: 80.0,
    stayTime: 0, // milliseconds projectile will stay after hit
    textureName: "bigEgg.png",
    isExplosive: true,
    explosiveRadius: 2.0,
    explosiveEntityDamage: 50, // damage in HP units at center of explosion
    explosionBlockDamage: 60, // damage in block HP units at center of explosion
    explosionTileDamage: 1, // number of times to run CommandDig with above radius
    hitParticle: function() { return Particles.BigEgg },
    scaleX: 1.0,
    scaleY: 1.0,
    hitAtCursor: true // Egg will explode at cursor
}
