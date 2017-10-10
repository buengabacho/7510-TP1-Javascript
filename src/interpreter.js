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
    	console.log('rulesAndFacts: ', JSON.stringify(self.rulesAndFacts, null, 2));
    }

    this.checkQuery = function (query) {
    	console.log('query: ', query);
    	var self = this;
    	var parsedQuery = Query.parse(query);
    	var result = false;
    	if (parsedQuery) {
    		self.rulesAndFacts.forEach(function(ruleOrFact) {
    			if (ruleOrFact.tryApply(parsedQuery, self)) {
    				result = true;
    			}
    		});    		
    	} else {
    		// TODO: return error.
    	}
    	console.log('result: ', result ? 'true' : 'false');
    	return result;
    }

}

module.exports = Interpreter;
