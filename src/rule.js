var Rule = function (name, uninstancedArgs, uninstancedFacts) {
	this.name = name;
	this.uninstancedArgs = uninstancedArgs;
	this.uninstancedFacts = uninstancedFacts;

	this.tryApply = function(queryData, interpreter) {
		var self = this;
		if (self.name != queryData.name) {
			return false;
		}
		var argsMap = {};
		queryData.args.forEach(function(arg, idx) {
			var uninstancedArg = self.uninstancedArgs[idx];
			argsMap[uninstancedArg] = arg;
		});
		uninstancedFacts.forEach(function(uninstancedFact) {
			var fact = uninstancedFact.instanciate(argsMap);
			if (!interpreter.checkQuery(fact)) {
				return false;
			}
		});
		return true;
	}	
}

Rule.parse = function(line) {
		var match = line.match(/^(.*)\((.*)\) *:- *(.*)\.?$/);
		var parsed = null;
		if (match) {
			var name = match[1];
			var args = match[2].split(',').map((x) => x.trim());
			var facts = [];
			parsed = new Rule(name, args, facts);
		}
		return parsed;
	}

module.exports = Rule;