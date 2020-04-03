let path = require("path");
let fetch = require("node-fetch");

exports.home = (req, res, next) => {
	res.render("homeView");
}

exports.searchStreet = (req, res, next) => {

	baseSearchString = "https://search-cloudfinalproject-3habgtgr5yqkwbnm6mzbi7rcbq.us-west-2.es.amazonaws.com/lambda-index-crimedata-test/_search?format=json&q=streetName.S:"
	allHits = {}
	fetch(baseSearchString + req.body.street)
	.then((res) => res.json())
	.then((body) => {
		allHits = body.hits.hits
		console.log(allHits);
		res.render('homeView', {hits: allHits});
	});
}

function printInfo(item, index) {
	item = item._source;
	console.log("Hit " + index + ":\n" + 'Street Name: ' + item.streetName.S + "\nNumber of Racks: " + item.numberOfRacks.S + "\nYear Installed: " + item.yearInstalled.S + '\nStreet Number: ' + item.streetNumber.S + '\nNumber of Thefts: ' + item.numberOfThefts.S)
}

