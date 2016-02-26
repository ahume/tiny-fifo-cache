/**
  * FIFO cache implementation
  * Items cached in object hash and age managed by linked list for O(1) performance.
  */


function FIFOCache(maxItems) {
    this._setup();
    this.maxItems = maxItems;
}

FIFOCache.prototype.put = function (key, value) {
    var spareNode;
    var existingNode = this.cache[key];

    // If this is a new key add it to the list
    if (!existingNode) {
        // Check the cache size and prune if neccessary.
        if (this.cacheSize >= this.maxItems) {
            spareNode = this._removeTailFromList();
            delete this.cache[spareNode.key];
        }
    }

    // Get new node, optional re-using any that were removed above.
    var newNode = this._makeCacheNode({
        key: key,
        value: value
    }, spareNode);

    this._addToHeadOfList(newNode);
    this.cache[key] = newNode;
};

FIFOCache.prototype.get = function (key) {
    var node = this.cache[key];
    if (!node) {
        return null;
    }
    return node.value;
};

FIFOCache.prototype.flush = function () {
    this._setup();
};

FIFOCache.prototype._removeTailFromList = function () {
    var node = this.tail;
    this.tail = node.previous;

    this.cacheSize = this.cacheSize - 1;

    // Return this so it can be re-used.
    return node;
};

FIFOCache.prototype._addToHeadOfList = function (node) {
    // If there is a head already it's now going to have a previous.
    if (this.head) {
        this.head.previous = node;
    } else {
        // If there's no head, there's no tail either.
        this.tail = node;
    }

    // This node becomes head
    this.head = node;
    this.cacheSize = this.cacheSize + 1;
};

FIFOCache.prototype._setup = function () {
    this.cache = Object.create(null);
    this.head = null;
    this.tail = null;
    this.cacheSize = 0; // Because we can't query cache size in O(1)
};

FIFOCache.prototype._makeCacheNode = function (opts, spareNode) {
    var newNode = spareNode || {};
    newNode.key = opts.key;
    newNode.value = opts.value;
    newNode.previous = null;
    return newNode;
};

module.exports = FIFOCache;