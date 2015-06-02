#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> Simple FIFO cache. put and get.


## Install

```sh
$ npm install --save tiny-fifo-cache
```


## Usage

```js
var FIFOCache = require('tiny-fifo-cache');

var maxItems = 100;
var cache = new FIFOCache(maxItems);
cache.put('key', 'value');
cache.get('key'); // returns 'value'
```

### FIFO Eviction Policy

Once the cache reaches its maximum size, the oldest item is removed.

## Development

```sh
npm install
npm test
```

## License

MIT © [Andy Hume](2015)


[npm-image]: https://badge.fury.io/js/tiny-fifo-cache.svg
[npm-url]: https://npmjs.org/package/tiny-fifo-cache
[travis-image]: https://travis-ci.org/ahume/tiny-fifo-cache.svg?branch=master
[travis-url]: https://travis-ci.org/ahume/tiny-fifo-cache
[daviddm-image]: https://david-dm.org/ahume/tiny-fifo-cache.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ahume/tiny-fifo-cache
