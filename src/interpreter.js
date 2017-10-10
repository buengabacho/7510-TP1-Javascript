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
			throw new Error('Not a rule or fact, please check the formatting!');
		}
	}

    this.parseDB = function (dbArray) {
    	var self = this;
    	dbArray.forEach(function(line, idx) {
    		try {
    			self.parseLine(line);
    		} catch(e) {
    			throw new Error('Error parsing line ' + idx + ': ' + e.message);
    		}
    	});
    }

    this.checkQuery = function (query) {
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
    		throw new Error('Error parsing query: please check the formatting!');
    	}
    	return result;
    }

}

module.exports = Interpreter;
