(function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d", {antialias: true});
    var image = new Image();
    var startTime = Date.now();
    
    preload = function() {
        image.addEventListener("load", function() {
            load();
        }, false);
        image.src = "data/textures/block.png" 
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
        drawSprite(context, image, [64, 64], time, [64.0, 16.0]);
        for (var i = 0; i < 1000; i++)
            drawSprite(context, image, [600 + 400 * Math.sin(time + i/4), 200 + 0.6*i], time + i/2, [32.0, 8.0]);
    }
    
    preload();
})();
