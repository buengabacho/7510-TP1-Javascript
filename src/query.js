var Query = function (name, args) {
	this.name = name;
	this.argNames = args.slice();
	this.args = args;

	this.replaceArgs = function(replacementMap) {
		this.args = this.argNames.map((arg) => replacementMap[arg]);
	}	

	this.buildQueryString = function() {
		var querystring = this.name + '(';
		this.args.forEach(function(arg, idx) {
			if (idx != 0) {
				querystring += ',';
			}
			querystring += arg;
		});
		querystring += ')';
		return querystring;
	}
}

Query.parse = function(line) {
	var match = line.match(/^(.*)\((.*)\).?$/);
	var parsed = null;
	if (match) {
		var name = 	match[1];
		var args = 	match[2]
					.split(',')
					.map((x) => x.trim());
		parsed = new Query(name, args);
	}
	return parsed;
}

module.exports = Query;