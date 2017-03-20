
var binarySearch = function(array, value, compareFunction, start, end) {
    compareFunction = (compareFunction != undefined) ? compareFunction : function(a, b) { a - b };
    start = (start != undefined) ? start : 0;
    end = (end != undefined) ? end : array.length;
    if (start == end) return start;

    var middle = (start + end) / 2 >> 0;
    var middleValue = compareFunction(array[middle], value);
    if (middleValue < 0) return binarySearch(array, value, compareFunction, middle + 1, end);
    else if (middleValue > 0) return binarySearch(array, value, compareFunction, start, middle);
    else return middle;
}
