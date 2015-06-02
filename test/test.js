'use strict';
var assert = require('assert');
var FIFOCache = require('../');

describe('FIFOCache', function () {

    it('should return cached value', function () {
        var cache = new FIFOCache(2);
        cache.put('a', '1');
        assert.equal(cache.get('a'), '1');
    });

    it('should not keep more than maxSize items', function () {
        var cache = new FIFOCache(2);
        cache.put('a', '1');
        cache.put('b', '2');
        cache.put('c', '3');
        assert.equal(cache.get('c'), '3');
        assert.equal(cache.get('b'), '2');
        assert.equal(cache.get('a'), null);
    });

    it('should prune oldest item', function () {
        var cache = new FIFOCache(2);
  		cache.put('a', '1');
        cache.put('b', '2');
        cache.put('c', '3');
        assert.equal(cache.get('a'), null);
        assert.equal(cache.get('b'), '2');
        assert.equal(cache.get('c'), '3');
    });

    it('should empty cache on clear', function () {
        var cache = new FIFOCache(2);
        cache.put('a', '1');
        cache.put('b', '2');
        cache.clear();
        assert.equal(cache.get('a'), null);
        assert.equal(cache.get('b'), null);
    });
});
