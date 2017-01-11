/*
modules = [];

function pushModule(dependencies, module) {
    this.modules.push([dependencies, module]);
}

function initModules() {
    while(modules.length > 0) {
        var failure = true;
        
        var i = modules.length;
        while(i--) {
            
        }
        
        // Error:
        if (failure) {
            var dependencyArray = [];
            var dependencies = {};
            modules.forEach(function(module) {
                module[0].forEach(function(dependency) {
                    if (dependencies[dependency])
                        return;
                    dependencies[dependency] = true;
                    dependencyArray.push(dependency);
                });
            });
            
            console.error("Missing module dependencies: " dependencyArray);
            break;
        }
    }
}
*/
