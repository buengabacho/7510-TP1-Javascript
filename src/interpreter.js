var Rule = require('./rule');

var Interpreter = function () {

	this.facts = [];
	this.rules = [];

	this.parseAsFact = function(line, addToDB) {
		var isFact = line.match(/^(.*)\((.*)\).?$/);
		line = line.substr(line.length - 1) == '.' ? line.substr(0, line.length - 1) : line;
		var parsed = isFact ? {type: 'fact', data: line} : null;
		if (parsed && addToDB) {
			this.facts.push(parsed);
		}
		return parsed;
	}

	this.parseAsRule = function(line, addToDB) {
		var isRule = line.match(/^(.*)\((.*)\) *:- *(.*)\.?$/);
		var parsed = isRule ? {type: 'rule'} : null;
		if (parsed && addToDB) {
			this.rules.push(parsed);
		}
		return parsed;
	}

	this.parseLine = function(line, addToDB) {
		var parsedLine = this.parseAsRule(line, addToDB);
		if (!parsedLine) {
			parsedLine = this.parseAsFact(line, addToDB);	
		}
		if (!parsedLine) {
			// TODO: return error.
		}
		return parsedLine;	
	}

    this.parseDB = function (dbArray) {
    	var self = this;
    	dbArray.forEach(function(line) {
    		self.parseLine(line, true);
    	});
    }

    this.checkQuery = function (query) {
    	var self = this;
    	var parsedQuery = self.parseLine(query, false);
    	var result = false;
    	if (!parsedQuery) {
    		// TODO: return error.
    	} else if (parsedQuery.type == 'fact') {
    		self.facts.forEach(function(fact) {
    			if (fact.data == parsedQuery.data) {
    				result = true;
    			}
    		});
    	} else if (parsedQuery.type == 'rule') {
    		self.rulesforEach(function(rule) {
    			if (rule.tryApply(parsedQuery, self)) {
    				result = true;
    			}
    		})
    	} else {
    		// TODO handle error: should never get here.
    	}
    	return result;
    }

}

module.exports = Interpreter;
