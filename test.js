var test = require('ava');
var pinkiePromise = global.Promise = require('pinkie-promise');
var Queue = require('./');

test('not delaying first request', function (a) {
	var queue = new Queue(500);
	var start = Date.now();

	return queue.up().then(function () {
		var finish = Date.now();
		a.ok(finish - start < 100);
	});
});

test('delaying second request', function (a) {
	var queue = new Queue(500);
	var start = Date.now();

	queue.up();

	return queue.up().then(function () {
		var finish = Date.now();
		a.ok(finish - start > 450 && finish - start < 550);
	});
});

test('delaying third request', function (a) {
	var queue = new Queue(500);
	var start = Date.now();

	queue.up();
	queue.up();

	return queue.up().then(function () {
		var finish = Date.now();
		a.ok(finish - start > 950 && finish - start < 1050);
	});
});

test('custom Promise module', function (a) {
	var queue = new Queue(500, pinkiePromise);

	return queue.up().then(function () {
		a.pass();
	});
});
