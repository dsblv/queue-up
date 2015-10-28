import test from 'ava';
import pinkiePromise from 'pinkie-promise';
import Queue from './';

global.Promise = pinkiePromise;

test('not delaying first request', async t => {
	const queue = new Queue(500);
	const start = Date.now();

	await queue.up();

	t.ok(Date.now() - start < 100);
});

test('delaying second request', async t => {
	const queue = new Queue(500);
	const start = Date.now();

	queue.up();

	await queue.up();

	const finish = Date.now();
	t.ok(finish - start > 450 && finish - start < 550);
});

test('delaying third request', async t => {
	const queue = new Queue(500);
	const start = Date.now();

	queue.up();
	queue.up();

	await queue.up();

	const finish = Date.now();
	t.ok(finish - start > 950 && finish - start < 1050);
});

test('passing value', async t => {
	const value = await (new Queue()).up(1337);
	t.is(value, 1337);
});

test('custom Promise module', async t => {
	const queue = new Queue(500, pinkiePromise);

	await queue.up();
	t.pass();
});
