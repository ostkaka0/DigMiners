
import Quadtree from "Engine/Quadtree.js";;
var quadtree = new Quadtree();

var insertedPos = [5, 5, 10];
var insertedNode = quadtree.insertNode(insertedPos);
console.log("Inserted node { " + insertedPos[0] + ", " + insertedPos[1] + ", " + insertedPos[2] + " } = " + insertedNode);


quadtree.forEach(function(pos, node) {
    console.log(pos + " = " + node);
    if (node != 0)
        console.log("parent pos is: " + Quadtree.calcParentPos(pos));
    console.log("v2 pos: " + Quadtree.posToV2(pos));

    if (quadtree.isLeaf(node))
        console.log("leaf");
    if (quadtree.isBranch(node))
        console.log("branch");
    console.log("");
});

var nodeIndexToErase = quadtree.findNodeIndex([0, 0, 5]);
if (nodeIndexToErase != -1)
    quadtree.eraseNode(nodeIndexToErase);
else
    console.error("Could not find node!")

quadtree.forEach(function(pos, node) {
    console.log(pos + " = " + node);
});

var parentPos = Quadtree.calcParentPos([13, 31, 5]);
console.log("Parent pos of [13, 31, 5] is: " + parentPos);
console.log("V2 position of that is: " + Quadtree.posToV2(parentPos));
