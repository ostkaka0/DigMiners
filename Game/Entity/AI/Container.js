
var BehaviourContainer = function() {
    this.behaviours = [];
    this.currentBehaviour = null;
    this.currentBehaviourPriority = Number.MAX_VALUE;
}
global.BehaviourContainer = BehaviourContainer;

BehaviourContainer.prototype.update = function() {
    var currentBehaviourCanRun = !this.currentBehaviour ? false : this.currentBehaviour.run();
    var numBehaviours = currentBehaviourCanRun ? this.currentBehaviourPriority : this.behaviours.length;
    for (var i = 0; i < numBehaviours; ++i) {
        var behaviour = this.behaviours[i];
        if (((!currentBehaviourCanRun && i != this.currentBehaviourPriority) || i < this.currentBehaviourPriority) && behaviour.canRun()) {
            if (this.currentBehaviour) {
                //Disable old behaviour
                this.currentBehaviour.finish();
                this.currentBehaviour = null;
            }
            behaviour.initialize();
            this.currentBehaviour = behaviour;
            this.currentBehaviourPriority = i;
            return;
        }
    }
}

BehaviourContainer.prototype.destroy = function(entity) {
    for (var i = 0; i < this.behaviours.length; ++i)
        this.behaviours[i].destroy(entity);
}
