import test from 'ava';
import Queue from './';

function fixture() {
	return Promise.resolve(1337);
}

function nonPromiseFixture() {
	return 1337;
}

function argumentAcceptingFixture(previousValue) {
	return previousValue * 2;
}

test('not delaying first function', async t => {
	const queue = new Queue(500);
	const start = Date.now();

	await queue.up(fixture);

	t.true(Date.now() - start < 100);
});

test('delaying second function', async t => {
	const queue = new Queue(500);
	const start = Date.now();

	queue.up(fixture);

	await queue.up(fixture);

	const finish = Date.now();

	t.true(finish - start > 450 && finish - start < 550);
});

test('delaying third function', async t => {
	const queue = new Queue(500);
	const start = Date.now();

	queue.up(fixture);
	queue.up(fixture);

	await queue.up(fixture);

	const finish = Date.now();

	t.true(finish - start > 950 && finish - start < 1050);
});

test(`keeping resolved value`, async t => {
	const queue = new Queue(100);

	const res = await queue.up(fixture);

	t.is(res, 1337);
});

test('resolving non-promises', async t => {
	const queue = new Queue(100);

	const res = await queue.up(nonPromiseFixture);

	t.is(res, 1337);
});

test('queue from array', async t => {
	const queue = new Queue(100);

	const res = await queue.all([
		fixture,
		fixture,
		nonPromiseFixture,
		nonPromiseFixture
	]);

	t.same(res, [1337, 1337, 1337, 1337]);
});

test('passing initialValue', async t => {
	const queue = new Queue(100, 1337);

	queue.up(argumentAcceptingFixture);
	const res = await queue.up(argumentAcceptingFixture);

	t.is(res, 5348);
});
