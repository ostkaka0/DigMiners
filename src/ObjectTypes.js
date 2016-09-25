ObjectTypes = function(typeList) {
	this.typeList = typeList || [];
	this.nextId = typeList.length;
	for (var i = 0; i < this.typeList.length; i++) {
		typeList[i].prototype.id = i;
		typeList[i].prototype.idString = i.toString(36);
	}
}

ObjectTypes.prototype.add = function(type) {
	this.typeList.push(type);
	type.prototype.id = nextId++;
	type.prototype.idString = type.prototype.id.toString(36); 
}

ObjectTypes.get = function(id) {
	return this.typeList[id];
}
