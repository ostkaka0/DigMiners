
BehaviourContainer = function() {
    this.behaviours = [];
    this.currentBehaviour = null;
    this.currentBehaviourPriority = Number.MAX_VALUE;
}

BehaviourContainer.prototype.update = function() {
    var currentBehaviourCanRun = !this.currentBehaviour ? false : this.currentBehaviour.run();
    var numBehaviours = currentBehaviourCanRun ? this.currentBehaviourPriority : this.behaviours.length;
    for(var i = 0; i < numBehaviours; ++i) {
        var behaviour = this.behaviours[i];
        if((!currentBehaviourCanRun || i < this.currentBehaviourPriority) && behaviour.canRun()) {
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
