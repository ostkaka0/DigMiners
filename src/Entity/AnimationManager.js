
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

AnimationManager.prototype.update = function() {
	var entityWorld = gameData.entityWorld;
	if (!entityWorld)
		console.error("Missing gameData.entityWorld");
	var now = new Date();
	entityWorld.objectArray.forEach(function(entity) {
		if (entity.drawable) {
			var drawable = entity.drawable;
			for(var bodypart in drawable.bodyparts) {
				bodypart = drawable.bodyparts[bodypart];
				//console.log("found animation");
				//TODO: Sort animations by priority to allow multiple animations per sprite
				if(bodypart.animating) {
					//console.log("nice animation");
					var diff = now - bodypart.lastFrame;
					
					while(diff >= bodypart.mspf) {	
						diff -= bodypart.mspf;
						bodypart.lastFrame = new Date();
						//console.log("found animation to animate " + player.text.text);				
						bodypart.currentFrame += 1;
						//console.log("adding 1");
						if(bodypart.currentFrame >= bodypart.animInstance.numFrames)
							bodypart.currentFrame = 0;
						bodypart.sprite.texture.frame = bodypart.animInstance.frames[bodypart.currentFrame];
						//console.log("ms since last frame " + (new Date() - bodypart.lastFrame));
						
						if(bodypart.runToEnd && bodypart.currentFrame == 0) {
							bodypart.animating = false;
							bodypart.finishing = false;
						}				
					}
				}
			}
		}
	});
}