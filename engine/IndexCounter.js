
IndexCounter = function(initial) {
    if(initial)
        this.value = initial;
    else
        this.value = 0;
}

IndexCounter.prototype.add = function(amount) {
    this.value += amount;
}