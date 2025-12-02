function LinkedNode(data) {
    this.data = data;
    this.next = null;
    this.previous = null;
}

LinkedNode.prototype.resetNext = function() { this.next = null };
LinkedNode.prototype.resetPrevious = function() { this.previous = null };

function LinkedList() {
    this.head = null;
    this.tail = null;
    this.size = 0;
}

LinkedList.prototype.push = function(node) {
    // 1. Remove 'next' reference if it exists
    node.resetNext();
    // 2. Keep old tail node reference
    const oldTail = this.tail;
    if (oldTail) {
        // 2.1 If old tail reference exists, old tail 'next' must point the new tail node and node's previous must point old tail
        oldTail.next = node;
        node.previous = oldTail;
        this.tail = node;
    } else {
        // 2.2 If old tail reference doesn't exist, node is the new tail & head
        this.tail = node;
        this.head = node;
        node.resetPrevious();
    }

    // 3. Increment size
    this.size++;
}

LinkedList.prototype.remove = function(node) {
    // 1. Remove the element disconnecting and reassigning required properties/variables
    if (node.previous && node.next) {
        // 1.1 If node has previous & next, previous node must point to the node's next reference and node's next's previous point to the node's previous.
        const previous = node.previous;
        const next = node.next;
        previous.next = next;
        next.previous = previous
    } else if (node.previous) {
        // 1.2 If node has previous but not next, it means node is in the tail,
        // therefore node's previous must clean its next reference and become the new tail.
        const previous = node.previous;
        previous.next = null;
        this.tail = previous;
    } else if (node.next) {
        // 1.3 If node has next, but not previous, it means node is in the head,
        // therefore node's next must clean its previous reference and become the new head.
        const next = node.next;
        next.previous = null;
        this.head = next;
    } else if (this.tail === node && this.head === node) {
        // 1.4 If node has neither next, nor previous it must be the last element or it's a disconnected element.
        // In order to validate if it's the last element consider checking: head === node && tail === node.
        this.tail = null;
        this.head = null;
    } else { this.size++ } // 1.5 Increment size just to put decrement statement unconditionally.

    // 2. Reset node's properties to disconnect it from others
    node.resetNext();
    node.resetPrevious();

    // 3. Decrement size
    this.size--;
}

LinkedList.prototype.pop = function() {
    const oldHead = this.head;
    this.remove(this.head);
    return oldHead;
}

LinkedList.prototype.print = function() {
    let node = this.head;
    let index = 0;
    let text = '';
    while (node) {
        text += `[${index}] element = ${JSON.stringify(node.data)}\n`;
        node = node.next;
        index++; 
    }
    console.log(text);
}

function LRUCache(capacity) {
    if (capacity < 1 || capacity > 3000)
        throw new Error(`Invalid capacity: ${capacity}`);
    this.capacity = capacity;
    this.hashMap = new Map();
    this.linkedList = new LinkedList();
}

/**
 * Get value related with the key if it exists, otherwise returns -1
 * @param {number} key 
 */
LRUCache.prototype.get = function(key) {
    if (!this.hashMap.has(key))
        return -1

    const { value } = this.hashMap.get(key);
    this.put(key, value);
    return value;
}

/**
 * Modify value associated with the key if it exists, otherwise adds a new entry
 * @param {number} key 
 * @param {number} value 
 */
LRUCache.prototype.put = function(key, value) {
    if (this.hashMap.has(key)) {
        // Update node
        this._update(key, value);
    } else {
        // Add node
        this._add(key, value);
        if (this.capacity < this.linkedList.size)
            this._removeLeastRecent();
    }
}

LRUCache.prototype._update = function(key, value) {
    let { node } = this.hashMap.get(key);
    this.linkedList.remove(node);
    this.linkedList.push(node);
    this.hashMap.set(key, { value, node: node });
}

LRUCache.prototype._add = function(key, value) {
    const newNode = new LinkedNode(key);
    this.linkedList.push(newNode);
    this.hashMap.set(key, { value, node: newNode });
}

LRUCache.prototype._removeLeastRecent = function() {
    const oldHead = this.linkedList.pop();
    this.hashMap.delete(oldHead.data);
}


const test_1 = function() {
    const cache = new LRUCache(3);
    cache.put(1, 1);
    console.log('key 1, value 1 INSERTED');
    cache.linkedList.print();
    cache.put(2, 2);
    console.log('key 2, value 2 INSERTED');
    cache.linkedList.print();
    cache.put(3, 3);
    console.log('key 3, value 3 INSERTED');
    cache.linkedList.print();
    cache.put(2, 10);
    console.log('key 2, value 2 MODIFIED -> new value 10');
    cache.linkedList.print();
    console.log(cache.hashMap);
    console.log(cache.get(1));
    console.log('key:1 value OBTAINED');
    cache.linkedList.print();
    cache.put(4, 4);
    console.log('key 4, value 4 INSERTED');
    cache.linkedList.print();
}

const test_2 = function() {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.get(1);
    cache.put(3, 3);
    console.log(`get(2) = ${cache.get(2)}`);
    cache.put(4, 4);
    cache.get(1);
    cache.get(3);
    cache.get(4);
}

test_2();