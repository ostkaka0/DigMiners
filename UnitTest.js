g_unitTests = {};

runUnitTests = function() {

	var tests = Object.getOwnPropertyNames(g_unitTests);
	var failedTests = [];

	console.log("Starting unit test...")
	tests.forEach(function(test) {
		console.log("Testing '" + test + "'...");
		var result = g_unitTests[test]();
		if(result) {
			console.log("\tTest succeded! Result: " + result);
		} else {
			console.log("\tTest failed! Result: " + result);
			failedTests.push(test);
		}
	});
	if(failedTests.length > 0)
		console.log("Failed tests: " + failedTests);
	console.log((tests.length - failedTests.length) + "/" + tests.length + " unit tests succeeded.")
	console.log("Unit tests done!")
}
