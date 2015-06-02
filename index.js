/**
  * FIFO cache implementation
  * Items cached in object hash and age managed by array.
  */


function FIFOCache(maxSize) {
	this._setup();
	this.maxSize = maxSize;
}

FIFOCache.prototype = {

	put: function (key, value) {

		// If this is a new key add it to the list
		if (!this.cache[key]) {
            var length = this.itemList.unshift(key);
            // Check the cache size and prune if neccessary.
            if (length > this.maxSize) {
                delete this.cache[this.itemList.pop()];
            }
        }
		this.cache[key] = value;
	},

	get: function (key) {
		return this.cache[key] || null;
	},

	clear: function () {
		this._setup();
	},

	_setup: function () {
		this.cache = {};
		this.itemList = [];
		this.maxSize = 0;
	}
};

module.exports = FIFOCache;