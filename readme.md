# queue-up [![Build Status](https://travis-ci.org/dsblv/queue-up.svg?branch=master)](https://travis-ci.org/dsblv/queue-up)

> Simple promise-based function queue

Cool way to enqueue rate-limited operations.


## Install

```
$ npm install --save queue-up
```


## Usage

```js
const ghGot = require('gh-got');
const Queue = require('queue-up');

// GitHub API allows us to make 5000 requests per hour:

const queue = new Queue(60 * 60 * 1000 / 5000);

const usernames = [
	'dsblv',
	'strikeentco',
	'sindresorhus',
	'octocat'
];

const opts = {
	token: 'the-private-token'
};

for (let username of usernames) {
	queue.up(() => ghGot(`users/${username}`, opts))
		.then(data => data.body)
		.then(user => console.log(`${user.name} is in ${user.location}`));
}
```


## API

### new Queue([interval, initialValue])

Creates new instance of Queue.

#### interval

Type: `number`  
Default: `1000`

Time in `ms` from when previous function resolves to when next is invoked.

#### initialValue

Type: `any`  
Default: `undefined`

Every function in a queue gets result of the previous one as an argument. If you specify `initialValue`, it will be fed to the first function:

```js
function double(value) {
	return value * 2;
}

const queue = new Queue(100, 1337);

queue.up(double).then(console.log);
//=> 2674

queue.up(double).then(console.log);
//=> 5348 (after 100ms)
```


### queue.up(fn)

Alias: `queue.enqueue(fn)`

Returns a `promise` that resolves to what `fn()` would resolve, but in the right time.

#### fn

Type: `function`  
*Required*

A `function` to be enqueued. Doesn't necessarily need to return a `promise`.


### queue.all(fns)

Enqueues several function and returns a `promise` that resolves to an `array` of all results.

#### fns

Type: `iterable` (e.g. `array`)  
*Required*

An iterable object of functions to be enqueued.

```js
function double(value) {
	return value * 2;
}

const queue = new Queue(100, 1337);

queue.all([double, double]).then(console.log);
//=> [2674, 5348] (after 100ms)
```

## License

MIT © [Dmitriy Sobolev](https://github.com/dsblv)
