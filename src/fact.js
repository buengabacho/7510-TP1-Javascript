var Fact = function (name, args) {
	this.name = name;
	this.args = args;

	this.tryApply = function(queryData, interpreter) {
		var self = this;
		if (self.name != queryData.name) {
			return false;
		}

		var result = true;
		self.args.forEach(function(arg, idx) {
			if (arg != queryData.args[idx]) {
				result = false;
			}
		});
		return result;
	}	
}

Fact.parse = function(line) {
	var match = line.match(/^(.*)\((.*)\).?$/);
	var parsed = null;
	if (match) {
		var name = match[1];
		var args = match[2].split(',').map((x) => x.trim());
		parsed = new Fact(name, args);
	}
	return parsed;
}

module.exports = Fact;