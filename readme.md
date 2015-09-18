# queue-up [![Build Status](https://travis-ci.org/dsblv/queue-up.svg?branch=master)](https://travis-ci.org/dsblv/queue-up)

> Simple promise-based function queue

Cool way to enqueue rate-limited operations. Even cooler when used with Promise-returning functions.


## Install

```
$ npm install --save queue-up
```


## Usage

```js
const got = require('got');
const Queue = require('queue-up');

const queue = new Queue(500);

queue.up()
	.then(got('github.com'))
	.then(data => {
		console.log('data');
	});

queue.up()
	.then(() => {
		console.log('Next call – only after .5sec!');
	});
```


## API

### `queue = new Queue([interval])`

#### innerval

Type: `number`  
Default: `1000`

Create new instance of Queue. Or several instances if you need different queues.

### `queue.up()` → `promise`

Alias: `queue.enqueue()`

Returns a `Promise` which is resolved in specified time after previous one.


## License

MIT © [Dimzel Sobolev](http://vk.com/sobo13v)
