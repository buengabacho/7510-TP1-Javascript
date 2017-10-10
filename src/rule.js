var Query = require('./query');

var Rule = function (name, uninstancedArgs, subqueries) {
	this.name = name;
	this.uninstancedArgs = uninstancedArgs;
	this.subqueries = subqueries;

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
		var result = true;
		this.subqueries.forEach(function(subquery) {
			subquery.replaceArgs(argsMap);
			var querystring = subquery.buildQueryString(argsMap);
			if (!interpreter.checkQuery(querystring)) {
				result = false;
			}
		});
		return result;
	}	
}

Rule.parse = function(line) {
		var match = line.match(/^(.*)\((.*)\) *:- *(.*)\.?$/);
		var parsed = null;
		if (match) {
			var name = 	match[1];
			var args = 	match[2]
						.split(',')
						.map((x) => x.trim());
			var subq = 	match[3]
						.split(/([^\(]*\([^\)]*\))\s*,/)
						.filter((x) => x ? true : false)
						.map((x) => Query.parse(x.trim()));
			var validSubq = subq.reduce((partial, current) => partial && current, true);						
			parsed = 	validSubq ? new Rule(name, args, subq) : null;
		}
		return parsed;
	}

module.exports = Rule;