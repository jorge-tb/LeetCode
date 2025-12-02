# LRU Cache - Big-O Analysis

This document analyzes the time and space complexity of the LRU (Least Recently Used) Cache implementation.

## Overview

The LRU Cache is implemented using:
- **HashMap** for O(1) key-value lookups
- **Doubly Linked List** for O(1) insertion/deletion operations

## Time Complexity

### Operations

| Operation | Time Complexity | Description |
|-----------|----------------|-------------|
| `get(key)` | **O(1)** | HashMap lookup + LinkedList node repositioning |
| `put(key, value)` | **O(1)** | HashMap insertion/update + LinkedList operations |

### Detailed Analysis

#### `get(key)` - O(1)
- HashMap lookup: O(1)
- Move node to tail (most recent): O(1)
  - [`LinkedList.remove()`](Problems/146-LRU%20Cache/146-LRU%20Cache.js): O(1) with direct node reference
  - [`LinkedList.push()`](Problems/146-LRU%20Cache/146-LRU%20Cache.js): O(1) insertion at tail

#### `put(key, value)` - O(1)
- **Update existing key**: O(1)
  - [`_update()`](Problems/146-LRU%20Cache/146-LRU%20Cache.js): HashMap update + node repositioning
- **Insert new key**: O(1)
  - [`_add()`](Problems/146-LRU%20Cache/146-LRU%20Cache.js): HashMap insertion + LinkedList push
  - [`_removeLeastRecent()`](Problems/146-LRU%20Cache/146-LRU%20Cache.js): O(1) head removal when capacity exceeded

### LinkedList Operations

| Method | Time Complexity | Notes |
|--------|----------------|-------|
| `push(node)` | **O(1)** | Insert at tail |
| `remove(node)` | **O(1)** | Direct node reference, no traversal needed |
| `pop()` | **O(1)** | Remove from head |

## Space Complexity

### Overall Space: **O(capacity)**

- **HashMap**: O(capacity) - stores key-value pairs and node references
- **LinkedList**: O(capacity) - stores nodes with keys
- **Additional overhead**: O(1) - pointers and metadata

### Memory Usage Breakdown

```javascript
// Per cache entry:
// 1. HashMap entry: { key: { value, node } }
// 2. LinkedNode: { data, next, previous }
// Total: ~3-4 references per entry
```

## Key Design Decisions

### Why Doubly Linked List?
- **O(1) removal**: Can remove any node without traversal
- **O(1) insertion**: Direct tail insertion for most recent items
- **Previous pointers**: Enable efficient bidirectional navigation

### Why HashMap + LinkedList?
- **HashMap**: Provides O(1) key lookup
- **LinkedList**: Maintains insertion order and enables O(1) eviction of least recent item
- **Combined**: Achieves O(1) for both access and eviction operations

## Performance Characteristics

✅ **Optimal for LRU Cache**:
- Constant time operations regardless of cache size
- Memory usage scales linearly with capacity
- No performance degradation as cache fills up

⚠️ **Considerations**:
- Higher memory overhead than array-based implementations due to pointer storage
- Cache-friendly access patterns depend on data locality

## Comparison with Alternative Approaches

| Approach | Get | Put | Space | Notes |
|----------|-----|-----|-------|-------|
| **HashMap + Doubly LL** | O(1) | O(1) | O(n) | Current implementation ✅ |
| Array + Linear Search | O(n) | O(n) | O(n) | Poor performance |
| HashMap + Array | O(1) | O(n) | O(n) | Put requires shifting elements |
| Balanced Tree | O(log n) | O(log n) | O(n) | Suboptimal for cache operations |

The current implementation achieves optimal time complexity for LRU Cache requirements.