# queue-up [![Build Status](https://travis-ci.org/dsblv/queue-up.svg?branch=master)](https://travis-ci.org/dsblv/queue-up)

> Simple promise-based function queue

Cool way to enqueue rate-limited operations. Even cooler when used with Promise-returning functions.


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

[
	'dsblv',
	'strikeentco',
	'sindresorhus',
	'octocat'
].forEach(user => {
	queue.up()
		.then(ghGot('users/' + user, {token: 'koten'}))
		.then(data => {
			console.log(data.body.name + ' is in ' + data.body.location);
		});
});

```


## API

### `queue = new Queue([interval], [promiseModule])`

Create new instance of Queue. Or several instances if you need different queues.

#### interval

Type: `number`  
Default: `1000`

#### promiseModule

Type: `function`  

Pass custom Promise module to use instead of the native one.


### `queue.up()` → `promise`

Alias: `queue.enqueue()`

Returns a `Promise` which is resolved in specified time after previous one.


## License

MIT © [Dimzel Sobolev](http://vk.com/sobo13v)
