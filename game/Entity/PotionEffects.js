
PotionEffects = function() {
    this.effects = {};
}

PotionEffects.prototype.name = potionEffects.name; function potionEffects() { };

PotionEffects.prototype.serialize = function(byteArray, index) {
    serializeInt32(byteArray, index, Object.keys(this.effects).length);
    Object.keys(this.effects).forEach(function(potionEffectTypeId) {
        var effect = this.effects[potionEffectTypeId];
        if (!effect) {
            serializeInt32(potionEffectTypeId);
            serializeInt32(1);
            serializeInt32(0);
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
        var potionEffectType = gameData.potionEffectTypeRegister[potionEffectTypeId];
        if (!effect) return;
        if (effect.duration == effect.startDuration && potionEffectType.onStart)
            effect.type.onStart(entity);
        if ((effect.startDuration - effect.duration) % potionEffectType.interval == 0)
            potionEffectType.potionFunction(entity);
        effect.duration--;
        if (effect.duration <= 0) {
            if (potionEffectType.onStop)
                epotionEffectType.onStop(entity);
            this.effects[potionEffectTypeId] = undefined;
        }
        
    }.bind(this));
}

PotionEffects.prototype.destroy = function(entity) {
    Object.keys(this.effects).forEach(function(potionEffectTypeId) {
        var effect = this.effects[potionEffectTypeId];
        var potionEffectType = gameData.potionEffectTypeRegister[potionEffectTypeId];
        if (!effect) return;
        if (potionEffectType.onStop)
            potionEffectType.onStop(entity);
    }.bind(this));
}

PotionEffects.prototype.add = function(potionEffectTypeId, duration) {
    var effect = this.effects[potionEffectTypeId];
    if (effect) {
        if (effect.duration > duration)
            return;
        effect.duration = duration;
        if (duration > effect.startDuration)
            effect.startDuration = duration;
    }
    
    this.effects[potionEffectTypeId] = { startDuration: duration, duration: duration };
}
