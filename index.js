'use strict';

var Queue = module.exports = function (interval, P) {
	this.interval = (interval > 0) ? interval : 1000;
	this.nextCall = 0;
	this.Promise = P || Promise;
};

Queue.prototype.up = Queue.prototype.enqueue = function (value) {
	var now = Date.now();

	if (this.nextCall < now) {
		this.nextCall = now;
	}

	var remains = this.nextCall - now;

	this.nextCall += this.interval;

	return new this.Promise(function (resolve) {
		var asyncSetTimer = remains || typeof setImmediate === 'undefined' ? setTimeout : setImmediate;

		asyncSetTimer(function () {
			resolve(value);
		}, remains);
	});
};
