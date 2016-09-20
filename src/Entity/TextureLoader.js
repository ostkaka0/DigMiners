
TextureLoader = function() {
	this.textures = {};
	this.texturesToLoad = [];
	this.total = 0;
	this.current = 0;
	this.onCompleteFunc = function() {};
	this.onProgressFunc = function() {};
}

TextureLoader.prototype.queueTexture = function(name, file) {
	this.texturesToLoad[this.total] = {};
	this.texturesToLoad[this.total].name = name;
	this.texturesToLoad[this.total].file = (file ? file : name);
	++this.total;
}

TextureLoader.prototype.loadTextures = function() {
	var loader = new PIXI.loaders.Loader();
	var context = this;
	
	loader.add(this.texturesToLoad[this.current].name, "data/textures/" + this.texturesToLoad[this.current].file + ".png");
		
	loader.once('complete', function(e) {
		var loaded = context.texturesToLoad[context.current];
		context.textures[loaded.name] = e.resources[loaded.name].texture;
		
		context.onProgressFunc(loaded.name, loaded.file, Math.ceil(100 * context.current / (context.total - 1)));
		if(context.current + 1 < context.total) {		
			++context.current;
			context.loadTextures();
		}
		else
			context.onCompleteFunc(context.textures);
	});
	
	loader.once('error', function(e) {
		console.log(e);
	});
	
	loader.load();
}

TextureLoader.prototype.onComplete = function(func) {
	this.onCompleteFunc = func;
}

TextureLoader.prototype.onProgress = function(func) {
	this.onProgressFunc = func;
}