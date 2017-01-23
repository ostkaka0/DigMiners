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
        
        context.strokeStyle = "black";
        context.lineWidth = 8;
        pointWorld.quadtree.forEach(function(pos, node) {
            var scale = 1.0 / Math.pow(2, pos[2]);
            var fpos = Quadtree.posToV2(pos);
            var transform = new DrawTransform([fpos[0] * canvas.width, fpos[1] * canvas.height], 0, [scale, scale], [0, 0]);
            transform.begin(context);
            context.strokeRect(0, 0, canvas.width, canvas.height);
            //if (pointWorld.quadtree.isLeaf(node)) {
                context.scale(1/scale, -1/scale);
                context.fillText("array: " + pointWorld.nodeArrays[node >> 2], 256 / Math.pow(2, pos[2]), -512 / Math.pow(2, pos[2]));
                context.scale(scale, -scale);
            //}
            transform.end(context);
        });
        
        var numPoints = 0;
        
        pointWorld.quadtree.forEach(function(nodePos, node) {
            var nodeArray = pointWorld.nodeArrays[node >> 2];
            if (!nodeArray || nodeArray.length == 0) return;
            (function(context, nodeArray) { 
                for(var i = 0; i < nodeArray.length; i++) {
                    var pointId = nodeArray[i];
                    var pointPos = pointWorld.getPos(pointId);
                    var transform = new DrawTransform([(0.5 + 0.5 *pointPos[0]) * canvas.width, (0.5 + 0.5 *pointPos[1]) * canvas.height], time, [32.0, 32.0]);
                    transform.begin(context);
                    context.drawImage(textures["egg.png"], 0, 0, 1, 1);
                    transform.end(context);
                    numPoints++;
            }})(context, nodeArray);
        });
        screenTransform.end(context);
        console.log(numPoints);
    }
    
    $("body").mousedown(function(event) {
        var x = -1 + 2 * event.pageX / canvas.width;
        var y = 1 - 2 * event.pageY / canvas.height;
        var radius = 0.00;
        var pointId = pointWorld.add([x, y], radius);
        // Validate:
        var pointPos = pointWorld.getPos(pointId);
        if (pointPos[0] != x || pointPos[1] != y)
            console.error("Point position is incorrect!");
    });
    
    preload();
})();
