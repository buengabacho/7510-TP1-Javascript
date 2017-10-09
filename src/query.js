var Query = function (name, args) {
	this.name = name;
	this.args = args;
}

Query.parse = function(line) {
	var match = line.match(/^(.*)\((.*)\).?$/);
	var parsed = null;
	if (match) {
		var name = match[1];
		var args = match[2].split(',').map((x) => x.trim());
		parsed = new Query(name, args);
	}
	return parsed;
}

module.exports = Query;