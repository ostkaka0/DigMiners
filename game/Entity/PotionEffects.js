
PotionEffects = function() {
    this.effects = {};
}

PotionEffects.prototype.name = potionEffects.name; function potionEffects() { };

PotionEffects.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, Object.keys(this.effects).length);
    Object.keys(this.effects).forEach(function(potionEffectTypeId) {
        var effect = this.effects[potionEffectTypeId];
        if (!effect) {
            serializeInt32(byteArray, index, potionEffectTypeId);
            serializeInt32(byteArray, index, 1);
            serializeInt32(byteArray, index, 0);
        } else {
            serializeInt32(byteArray, index, potionEffectTypeId);
            serializeInt32(byteArray, index, effect.startDuration);
            serializeInt32(byteArray, index, effect.duration);
        }
    }.bind(this));
}

PotionEffects.prototype.deserialize = function(byteArray, index) {
    var length = deserializeInt32(byteArray, index);
    for (var i = 0; i < length; i++) {
        var potionEffectTypeId = deserializeInt32(byteArray, index);
        var startDuration = deserializeInt32(byteArray, index);
        var duration = deserializeInt32(byteArray, index);
        this.effects[potionEffectTypeId] = { startDuration: startDuration, duration: duration };
    }
}

PotionEffects.prototype.getSerializationSize = function() {
    return 4 + 12 * Object.keys(this.effects).length;
}

PotionEffects.prototype.update = function(entity) {
    Object.keys(this.effects).forEach(function(potionEffectTypeId) {
        var effect = this.effects[potionEffectTypeId];
        var potionEffectType = Config.potionEffectTypeRegister[potionEffectTypeId];
        if (!effect || !potionEffectType) return;
        if (effect.duration == effect.startDuration && potionEffectType.onStart)
            effect.type.onStart(entity);
        if ((effect.startDuration - effect.duration) % potionEffectType.interval == 0)
            potionEffectType.potionFunction(entity);
        effect.duration--;
        if (effect.duration == 0 && effect.startDuration != -1) {
            if (potionEffectType.onStop)
                potionEffectType.onStop(entity);
            this.effects[potionEffectTypeId] = undefined;
        }
        
    }.bind(this));
}

PotionEffects.prototype.destroy = function(entity) {
    Object.keys(this.effects).forEach(function(potionEffectTypeId) {
        var effect = this.effects[potionEffectTypeId];
        var potionEffectType = Config.potionEffectTypeRegister[potionEffectTypeId];
        if (!effect) return;
        if (potionEffectType.onStop)
            potionEffectType.onStop(entity);
    }.bind(this));
}

PotionEffects.prototype.add = function(potionEffectType, duration) {
    var effect = this.effects[potionEffectType.id];
    if (duration == -1) {
        this.effects[potionEffectType.id] = { startDuration: -1, duration: -1 };
    } else if (effect) {
        if (effect.duration >= duration)
            return;
        var before = { startDuration: effect.startDuration, duration: effect.duration };
        if (duration >= potionEffectType.interval)
            effect.startDuration = duration - (duration % potionEffectType.interval) + potionEffectType.interval + ((effect.startDuration - effect.duration) % potionEffectType.interval);
        else
            effect.startDuration = ((effect.startDuration + duration - effect.duration) % potionEffectType.interval) + potionEffectType.interval;
        effect.duration = duration;
        if ((before.startDuration - before.duration) % potionEffectType.interval != (effect.startDuration - effect.duration) % potionEffectType.interval) {
            console.log("Potion error!")
            console.log("before: " + before.startDuration + " | " + before.duration + " -> " + (before.startDuration - before.duration) % potionEffectType.interval);
            console.log("after: " + effect.startDuration + " | " + effect.duration + " -> " + (effect.startDuration - effect.duration) % potionEffectType.interval);
        }
    } else {
        this.effects[potionEffectType.id] = { startDuration: duration, duration: duration };
    }
}
