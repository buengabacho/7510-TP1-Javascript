var Fact = function (name, args) {
	if (typeof name != 'string') {
		throw new Error('Fact constructor: "name" should be a string,');
	} 
	if (!Array.isArray(args)) {
		throw new Error('Fact constructor: "args" should be an array,');	
	}
	args.forEach(function(arg, idx) {
		if (typeof arg != 'string') {
			throw new Error('Fact constructor: index ' + idx + ' in "args" should be a string.');
		}
	});
	this.name = name;
	this.args = args;
}

Fact.prototype.isSame(otherFact) {
	if (this.name != otherFact.name) {
		return false;
	}
	var argsAreEqual = true;
	this.args.forEach(function(arg, idx) {
		if (arg != otherFact.args[idx]) {
			argsAreEqual = false;
		}
	});
	return argsAreEqual;
}

module.exports = Fact;