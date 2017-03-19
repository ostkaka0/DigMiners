
var SpriteContainer = function() {
    this.container = [];
    this.isSpriteContainer = true;
}
global.SpriteContainer = SpriteContainer;

SpriteContainer.prototype.add = function(sprite) {
    this.container.push(sprite);
}

SpriteContainer.prototype.remove = function(sprite) {
    var index = this.container.indexOf(sprite);
    if (index != -1)
        this.container.splice(index, 1);
    else
        console.log("Tried to remove sprite which is not stored");
    return index;
}

SpriteContainer.prototype.getAll = function() {
    var out = [];
    for (var i = 0; i < this.container.length; ++i) {
        if (this.container[i].isSpriteContainer) {
            out = out.concat(this.container[i].getAll());
        } else {
            out.push(this.container[i]);
        }
    }
    return out;
}
