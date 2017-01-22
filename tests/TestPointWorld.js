(function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d", {antialias: true});
    var image = new Image();
    var startTime = Date.now();
    var textures = null;
    var pointWorld = new PointWorld(1.0)
    for (var i = 0; i < 0; i++) {
        pointWorld.add([-1 + 2 * Math.random(), -1 + 2 * Math.random()], 0.0);
    }
    
    preload = function() {
        textures = loadTextures("data/textures/", ["block.png", "egg.png"], load);
    }
    
    load = function() {
        update();
    }
    
    update = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
        window.requestAnimationFrame(update, 1000.0/60.0);
    }
    
    render = function() {
        var time = (Date.now() - startTime) / 1000.0;
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        var screenTransform = new DrawTransform([0, canvas.height], 0, [1, -1], [0, 0]);
        screenTransform.begin(context);
        
        context.strokeStyle = "white";
        context.lineWidth = 8;
        pointWorld.quadtree.forEach(function(pos, nodeId) {
            var scale = 1.0 / (1 << pos[2]);
            var fpos = Quadtree.posToV2(pos);
            var transform = new DrawTransform([fpos[0] * canvas.width, fpos[1] * canvas.height], 0, [scale, scale], [0, 0]);
            transform.begin(context);
            context.strokeRect(0, 0, canvas.width, canvas.height);
            transform.end(context);
        });
        
        var numPoints = 0;
        
        pointWorld.quadtree.forEach(function(pos, nodeId) {
            var nodeArray = pointWorld.nodeArrays[nodeId];
            if (!nodeArray || nodeArray.length == 0) return;
            nodeArray.forEach(function(pointId) {
                var pointPos = pointWorld.getPos(pointId);
                var transform = new DrawTransform([(0.5 + 0.5 *pointPos[0]) * canvas.width, (0.5 + 0.5 *pointPos[1]) * canvas.height], time, [32.0, 32.0]);
                transform.begin(context);
                context.drawImage(textures["egg.png"], 0, 0, 1, 1);
                transform.end(context);
                numPoints++;
            });
        });
        screenTransform.end(context);
    }
    
    $("body").mousedown(function(event) {
        var x = -1 + 2 * event.pageX / canvas.width;
        var y = 1 - 2 * event.pageY / canvas.height;
        pointWorld.add([x, y], 0.02);
    });
    
    preload();
})();
