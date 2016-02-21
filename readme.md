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

opts = {
	token: 'the-private-token'
};

for (let username of usernames) {
	queue.up(() => ghGot(`users/${username}`, opts))
		.then(data => data.body)
		.then(user => console.log(`${user.name} is in ${user.location}`));
}
```


## API

### new Queue([interval])

Creates new instance of Queue.

#### interval

Type: `number`  
Default: `1000`


### queue.up(fn)

Alias: `queue.enqueue(fn)`

Returns a `promise` that resolves to what `fn()` would resolve, but in the right time.

#### fn

Type: `function`  
*Required*

A `function` to be enqueued. Doesn't necessarily need to return a `promise`.


### queue.all(fns)

Like [`Promise.all()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all), but with interval between invocations.

#### fns

Type: `iterable` (e.g. `array`)  
*Required*

An iterable object of functions to be enqueued.


## License

MIT © [Dmitriy Sobolev](https://github.com/dsblv)
