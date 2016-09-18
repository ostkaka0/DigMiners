
AnimationManager = function() {
	this.animations = {};
}

AnimationManager.prototype.load = function() {
	//this.addAnimation("walk", new Animation("walk", textures.walk, 30, 150, 120));
	this.addAnimation("feet", new Animation("feet", textures.feet, 60, 75, 75));
	this.addAnimation("dig", new Animation("dig", textures.dig, 60, 75, 75));
	//this.addAnimation("octopus-walk", new Animation("octopus-walk", textures.octopus, 60, 256, 256));
}

AnimationManager.prototype.addAnimation = function(name, animation) {
	if(name != undefined && animation != undefined) {
		var oldAnimation = this.animations[name];
		if(this.animations[name] == undefined) {
			this.animations[name] = animation;
		}
		else
			console.log("Tried to add already added animation");
	}
	else
		console.log("Tried to add animation/key null");
}

AnimationManager.prototype.getAnimation = function(name) {
	return this.animations[name];
}
