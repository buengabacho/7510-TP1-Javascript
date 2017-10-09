var Query = require('./query');
var Fact = require('./fact');
var Rule = require('./rule');

var Interpreter = function () {

	this.rulesAndFacts = [];

	this.parseLine = function(line) {
		var parsedLine = Rule.parse(line);
		if (!parsedLine) {
			parsedLine = Fact.parse(line);
		}
		if (parsedLine) {
			this.rulesAndFacts.push(parsedLine);
		} else {
			// TODO: return error.
		}
	}

    this.parseDB = function (dbArray) {
    	var self = this;
    	dbArray.forEach(function(line) {
    		self.parseLine(line);
    	});
    }

    this.checkQuery = function (query) {
    	var self = this;
    	var parsedQuery = Query.parse(query);
    	var result = false;
    	if (!parsedQuery) {
    		// TODO: return error.
    	} else {
    		self.rulesAndFacts.forEach(function(ruleOrFact) {
    			if (ruleOrFact.tryApply(parsedQuery, self)) {
    				result = true;
    			}
    		});
    	}
    	return result;
    }

}

module.exports = Interpreter;
