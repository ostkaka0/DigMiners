

(function() {

    sum = function(inArray) {
        var r = 0;
        for(var k = 0; k < inArray.length; k++) {
            r += inArray[k];
        }
        return r;
    }
    
    var array = [];
    for (var i = 0; i < 10000000; i++) {
        array.push(Math.random() * 1000 >> 0);
    }
    
    var addFunctionHere = function(a, b) { return a + b; };

    
    for (var i = 0; i < 3; i++) {    
        var sumA = 0;
        var sumB = 0;
        var sumC = 0;
        // Prefetch cache
        for (var j = 0; j < array.length; j++) {
            sumA += array[j];
        }
        
        var t0 = performance.now();
        for (var j = 0; j < array.length; j++) {
            sumA += array[j];
        }
        var t1 = performance.now();
        sumB += sum(array);
        var t2 = performance.now();
        sumC += (function(inArray) { 
            var r = 0;
            for(var k = 0; k < inArray.length; k++) {
                r += inArray[k];
            }
            return r;
        })(array);
        var t3 = performance.now();
        sumC += (function(inArray) { 
            var r = 0;
            var length = inArray.length;
            for(var k = 0; k < length; k++) {
                r += inArray[k];
            }
            return r;
        })(array);
        var t4 = performance.now();
        
        console.log(sumA + " " + sumB + " " + sumC);
        console.log("a: " + (t1 - t0) + "ms");
        console.log("b: " + (t2 - t1) + "ms");
        console.log("c: " + (t3 - t2) + "ms");
        console.log("d: " + (t4 - t3) + "ms");
    }
    
})();
