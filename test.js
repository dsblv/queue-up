var test = require('ava');
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
