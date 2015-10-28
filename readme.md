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

const usernames = [
	'dsblv',
	'strikeentco',
	'sindresorhus',
	'octocat'
];

for (let i in usernames) {
	queue.up(usernames[i])
		.then(username => ghGot(`users/${username}`, {token: 'koten'}))
		.then(data => data.body)
		.then(user => console.log(`${user.name} is in ${user.location}`));
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
queue.up('hello').then(console.log.bind(console));
//=> hello
```

## License

MIT © [Dmitry Sobolev](https://github.com/dsblv)
