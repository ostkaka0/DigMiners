
var IndexCounter = function(initial) {
    if (initial)
        this.value = initial;
    else
        this.value = 0;
}
global.IndexCounter = IndexCounter;

IndexCounter.prototype.add = function(amount) {
    this.value += amount;
}
