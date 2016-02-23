import ava from 'ava';
import timeSpan from 'time-span';
import inRange from 'in-range';
import Fn from './';

const test = ava.serial;

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
	const queue = new Fn();
	const end = timeSpan();

	await queue.up(fixture);

	t.true(inRange(end(), 10));
});

test('delaying second function', async t => {
	const queue = new Fn(100);
	const end = timeSpan();

	queue.up(fixture);

	await queue.up(fixture);

	t.true(inRange(end(), 90, 110));
});

test('delaying third function', async t => {
	const queue = new Fn(100);
	const end = timeSpan();

	queue.up(fixture);
	queue.up(fixture);

	await queue.up(fixture);

	t.true(inRange(end(), 190, 210));
});

test(`keeping resolved value`, async t => {
	const queue = new Fn(100);

	const res = await queue.up(fixture);

	t.is(res, 1337);
});

test('resolving non-promises', async t => {
	const queue = new Fn(100);

	const res = await queue.up(nonPromiseFixture);

	t.is(res, 1337);
});

test('queue from array', async t => {
	const queue = new Fn(100);
	const end = timeSpan();

	const res = await queue.all([
		fixture,
		fixture,
		nonPromiseFixture,
		nonPromiseFixture
	]);

	t.same(res, [1337, 1337, 1337, 1337]);
	t.true(inRange(end(), 290, 310));
});

test('passing initialValue', async t => {
	const queue = new Fn(100, 1337);
	const end = timeSpan();

	queue.up(argumentAcceptingFixture);
	const res = await queue.up(argumentAcceptingFixture);

	t.is(res, 5348);
	t.true(inRange(end(), 90, 110));
});
