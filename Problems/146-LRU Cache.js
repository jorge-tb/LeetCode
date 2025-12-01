class LinkedNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    insertFirst(node) {
        node.next = this.head;
        this.head = node;
        this.size++;
        
        if (this.size === 1)
            this.tail = this.head;
    }

    insertLast(node) {
        if (this.size) {
            this.tail.next = node;
        }
        this.tail = node;
        this.size++;

        if (this.size === 1)
            this.head = this.tail;
    }

    pop() {
        const headNode = this.head;

        if (this.head?.next) {
            this.head = this.head.next;
        } else if (this.head) {
            this.head = null;
            this.tail = null;
        }

        if (this.size > 0)
            --this.size;

        return headNode;
    }

    print() {
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
}

class LRUCache {
    constructor(capacity) {
        if (capacity < 1 || capacity >= 3000)
            throw new Error(`Invalid capacity: ${capacity}`);
        this.capacity = capacity;
        this.hashMap = new Map();
        this.linkedList = new LinkedList();
    }

    /**
     * Get value associated with the key if exists, otherwise returns -1
     * @param {number} key 
     */
    get(key) {
        if (!this.hashMap.has(key)) return -1
        const { value } = this.hashMap.get(key);
        this.put(key, value);
        return value;
    }

    /**
     * Modify value associated with the key if exists, otherwise adds a new entry
     * @param {number} key 
     * @param {number} value 
     */
    put(key, value) {
        if (this.hashMap.has(key)) {
            // Update node
            let { previous } = this.hashMap.get(key);
            const tail = this.linkedList.tail;
            const nodeToUpdate = previous?.next ?? this.linkedList.head;
            const nextOfNodeToUpdate = nodeToUpdate.next;
            nodeToUpdate.next = null;
            this.linkedList.insertLast(nodeToUpdate);
            this.hashMap.set(key, { value, previous: tail });
            
            if (previous) {
                // Update previous if exists
                previous.next = nextOfNodeToUpdate;
                const { value: nextValueOfNodeToUpdate } = this.hashMap.get(nextOfNodeToUpdate.data);
                this.hashMap.set(nextOfNodeToUpdate.data, { value: nextValueOfNodeToUpdate, previous });
            } else {
                // Reassign Linked List HEAD node
                this.linkedList.head = nextOfNodeToUpdate;
            }
        } else {
            // Add new node
            const previous = this.linkedList.tail;
            const newNode = new LinkedNode(key);
            this.hashMap.set(key, { value, previous });
            this.linkedList.insertLast(newNode);

            if (this.linkedList.size > this.capacity) {
                const removedHead = this.linkedList.pop();
                this.hashMap.delete(removedHead.data);

                if (removedHead.next) {
                    const nextOfRemovedHead = removedHead.next;
                    const { value: nextValueOfNextOfRemovedHead } = this.hashMap.get(nextOfRemovedHead.data);
                    this.hashMap.set(nextOfRemovedHead.data, { value: nextValueOfNextOfRemovedHead, previous: null });
                }
            }
        }
    }
}

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