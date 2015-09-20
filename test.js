import test from 'ava';
import pinkiePromise from 'pinkie-promise';
import Queue from './';

global.Promise = pinkiePromise;

test('not delaying first request', a => {
	const queue = new Queue(500);
	const start = Date.now();

	return queue.up().then(() => {
		const finish = Date.now();
		a.ok(finish - start < 100);
	});
});

test('delaying second request', a => {
	const queue = new Queue(500);
	const start = Date.now();

	queue.up();

	return queue.up().then(() => {
		const finish = Date.now();
		a.ok(finish - start > 450 && finish - start < 550);
	});
});

test('delaying third request', a => {
	const queue = new Queue(500);
	const start = Date.now();

	queue.up();
	queue.up();

	return queue.up().then(() => {
		const finish = Date.now();
		a.ok(finish - start > 950 && finish - start < 1050);
	});
});

test('passing value', a => {
	return (new Queue()).up(1337).then(val => {
		a.is(val, 1337);
	});
});

test('custom Promise module', a => {
	const queue = new Queue(500, pinkiePromise);

	return queue.up().then(() => {
		a.pass();
	});
});
