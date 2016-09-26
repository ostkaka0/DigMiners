ObjectTypes = function(typeList) {
	this.list = typeList || [];
	this.nextId = this.list.length;
	for(var i = 0; i < this.list.length; i++) {
		this.list[i].prototype.id = i;
		this.list[i].prototype.idString = i.toString(36);
	}
}

ObjectTypes.prototype.add = function(type) {
    if (type.prototype.id != undefined) return;
    
	this.list.push(type);
	type.prototype.id = this.nextId++;
	type.prototype.idString = type.prototype.id.toString(36);
}

ObjectTypes.prototype.addArray = function(typeArray) {
    var that = this;
    typeArray.forEach(function(type) { that.add(type); });
}
