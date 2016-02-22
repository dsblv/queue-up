'use strict';
var delay = require('delay');

var Queue = module.exports = function (interval, initialValue) {
	this.interval = interval || 1000;
	this.remaining = Promise.resolve(initialValue);
};

Queue.prototype.up = Queue.prototype.enqueue = function (fn) {
	var ret = this.remaining.then(fn);

	this.remaining = ret.then(delay(this.interval));

	return ret;
};

Queue.prototype.all = function (fns) {
	var promises = [];

	for (var fn of fns) {
		promises.push(this.up(fn));
	}

	return Promise.all(promises);
};
