
BehaviourContainer = function() {
    this.behaviours = [];
    this.currentBehaviour = null;
    this.currentBehaviourPriority = Number.MAX_VALUE;
}

BehaviourContainer.prototype.update = function() {
    for(var i = 0; i < this.behaviours.length; ++i) {
        var behaviour = this.behaviours[i];
        if(((!this.currentBehaviour || !this.currentBehaviour.run()) || i < this.currentBehaviourPriority) && behaviour.canRun()) {
            if(this.currentBehaviour) {
                //Disable old behaviour
                this.currentBehaviour.finish();
                this.currentBehaviour = null;
            }
            this.currentBehaviour = behaviour;
            this.currentBehaviourPriority = i;
            return;
        }
    }
}