PagedArray2D = function(sizeX, sizeY, defaultValue) {

	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.defaultValue = defaultValue;
	this.pages = {};
	this.onPageCreate = function(x, y, page) {};
}

PagedArray2D.prototype.get = function(x, y, value) {
	var localX = x%this.sizeX;
	var localY = y%this.sizeY;
	var pageX = (x-localX)/this.sizeX;
	var pageY = (y-localY)/this.sizeY;
	
	// Fix indexing of negative values:
	if (x < 0) {
		pageX--;
		localX = (localX-pageX*this.sizeX)%this.sizeX;
	}
	if (y < 0) {
		pageY--;
		localY = (localY-pageY*this.sizeY)%this.sizeY;
	}
		
	var pagePosString = pageX + "," + pageY;
	
	if (this.pages[pagePosString] == undefined) {
		return this.defaultValue;
	}
	
	return this.pages[pagePosString].get(localX, localY);
}

PagedArray2D.prototype.set = function(x, y, value) {
	var localX = x%this.sizeX;
	var localY = y%this.sizeY;
	var pageX = (x-localX)/this.sizeX;
	var pageY = (y-localY)/this.sizeY;
	
	// Fix indexing of negative values:
	if (x < 0) {
		pageX--;
		localX = (localX-pageX*this.sizeX)%this.sizeX;
	}
	if (y < 0) {
		pageY--;
		localY = (localY-pageY*this.sizeY)%this.sizeY;
	}
		
	var pagePosString = pageX + "," + pageY;
	
	if (this.pages[pagePosString] == undefined) {
		var page = new Page2D(pageX, pageY, this.sizeX, this.sizeY, this.defaultValue);
		page.set(localX, localY, value);
		this.pages[pagePosString] = page;
		this.onPageCreate(pageX, pageY, page);
	}
	else {
		this.pages[pagePosString].set(localX, localY, value);
	}
}

PagedArray2D.prototype.getPage = function(pageX, pageY) {
	var pagePosString = pageX + "," + pageY;
	return this.pages[pagePosString];
}

Page2D = function(x, y, sizeX, sizeY, defaultValue) {
	this.data = new Uint8Array(sizeX * sizeY);
	this.x = x;
	this.y = y;
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.isChanged = true;
	for(var y = 0; y < sizeY; ++y) {
		for (var x = 0; x < sizeX; ++x) {
			this.data[y*sizeX + x] = defaultValue;
		}
	}
	
}



Page2D.prototype.get = function(x, y) {
	return this.data[x+y*this.sizeX];
}

Page2D.prototype.set = function(x, y, value) {
	this.data[x+y*this.sizeX] = value;
	this.isChanged = true;
}