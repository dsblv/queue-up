# queue-up [![Build Status](https://travis-ci.org/dsblv/queue-up.svg?branch=master)](https://travis-ci.org/dsblv/queue-up)

> Simple promise-based function queue

Cool way to enqueue rate-limited operations. Even cooler when used with Promise-returning functions.


## Install

```
$ npm install --save queue-up
```


## Usage

```js
import ghGot from 'gh-got';
import Queue from 'queue-up';

// GitHub API allows us to make 5000 requests per hour:

const queue = new Queue(60 * 60 * 1000 / 5000);

const users = [
	'dsblv',
	'strikeentco',
	'sindresorhus',
	'octocat'
];

for (let i in users) {
	queue.up(users[i])
		.then(user => {
			return ghGot('users/' + user, {token: 'koten'});
		})
		.then(data => data.body)
		.then(user => {
			console.log(user.name + ' is in ' + user.location);
		});
}

```


## API

### new Queue([interval], [promiseModule])

Creates new instance of Queue.

#### interval

Type: `number`  
Default: `1000`

#### promiseModule

Type: `function`  

Pass custom Promise module to use instead of the native one.


### queue.up([value]) → `promise`

Alias: `queue.enqueue()`

Returns a `Promise` which is resolved in specified time after previous one.

#### value

Value to be passed to `resolve` handler function:

```js
queue.up('hello').then(console.log);
//=> hello
```

## License

MIT © [Dimzel Sobolev](http://vk.com/sobo13v)
