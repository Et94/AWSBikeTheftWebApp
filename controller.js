'use strict';

let fetch = require("node-fetch");


const path = require('path');
const AWS = require('aws-sdk');

const dotenv = require('dotenv');
dotenv.config();


let index = 'lambda-index-crimedata-test'
let type = '_search'
const AWS_REGION = 'us-west-2'
const ELASTICSEARCH_DOMAIN = 'search-cloudfinalproject-3habgtgr5yqkwbnm6mzbi7rcbq.us-west-2.es.amazonaws.com';
const endpoint = new AWS.Endpoint(ELASTICSEARCH_DOMAIN);
const httpClient = new AWS.HttpClient();
const credentials = new AWS.Credentials(process.env.ACCESS_KEY_ID, process.env.SECRET_ACCESS_KEY);

exports.home = (req, res, next) => {
	res.render("homeView");
}

exports.searchStreet = (req, res, next) => {
	const request = new AWS.HttpRequest(endpoint, AWS_REGION);
	request.method = 'GET';
	request.path += 'lambda-index-crimedata-test/_search?format=json&q=streetName.S:' + req.body.street;
	request.headers['host'] = ELASTICSEARCH_DOMAIN;

	var signer = new AWS.Signers.V4(request, 'es');
	signer.addAuthorization(credentials, new Date());

	var client = new AWS.HttpClient();
  	client.handleRequest(request, null, function(response) {
		console.log(response.statusCode + ' ' + response.statusMessage);
		var responseBody = '';
		response.on('data', function (chunk) {
			responseBody += chunk;
		});
		response.on('end', function (chunk) {
			let allHits = {}
			let response = JSON.parse(responseBody);
			allHits = response.hits.hits
			res.render('homeView', {hits: allHits});
		});
	}, function(error) {
		console.log('Error: ' + error);
	});
	// baseSearchString = "https://search-cloudfinalproject-3habgtgr5yqkwbnm6mzbi7rcbq.us-west-2.es.amazonaws.com/lambda-index-crimedata-test/_search?format=json&q=streetName.S:"
	// allHits = {}
	// fetch(baseSearchString + req.body.street)
	// 	.then((res) => res.json())
	// 	.then((body) => {
	// 		console.log(body);
	// 		allHits = body.hits.hits
	// 		res.render('homeView', {hits: allHits});
	// 	}
	// );
}

function printInfo(item, index) {
	item = item._source;
	console.log("Hit " + index + ":\n" + 'Street Name: ' + item.streetName.S + "\nNumber of Racks: " + item.numberOfRacks.S + "\nYear Installed: " + item.yearInstalled.S + '\nStreet Number: ' + item.streetNumber.S + '\nNumber of Thefts: ' + item.numberOfThefts.S)
}

