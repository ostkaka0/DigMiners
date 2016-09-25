ObjectTypes = function(typeList) {
	this.list = typeList || [];
	this.nextId = this.list.length;
	for (var i = 0; i < this.list.length; i++) {
		this.list[i].prototype.id = i;
		this.list[i].prototype.idString = i.toString(36);
	}
}

ObjectTypes.prototype.add = function(type) {
	this.list.push(type);
	type.prototype.id = nextId++;
	type.prototype.idString = type.prototype.id.toString(36); 
}
