var Promise = require('pinkie-promise');

var Queue = module.exports = function (interval) {
	this.interval = interval || 1000;
	this.nextCall = 0;
};

Queue.prototype.up = Queue.prototype.enqueue = function () {
	var now = Date.now();

	if (this.nextCall < now) {
		this.nextCall = now;
	}

	var remains = this.nextCall - now;

	this.nextCall += this.interval;

	return new Promise(function (resolve) {
		setTimeout(resolve, remains);
	});
};
