# Search in Rotated Sorted Array - Big-O Analysis

This document analyzes the time and space complexity of the Search in Rotated Sorted Array implementation using a modified binary search approach.

## Overview

The solution uses:
- **Modified Binary Search** to handle rotation in O(log n) time
- **Rotation Detection** to determine which half of the array is properly sorted
- **Conditional Logic** to decide which half to search based on target position

## Algorithm Strategy

The key insight is that in a rotated sorted array, **at least one half is always properly sorted**:
- If `nums[0] <= nums[mid]`: left half is sorted
- If `nums[mid] <= nums[n-1]`: right half is sorted

## Time Complexity

### Main Operation

| Operation | Time Complexity | Description |
|-----------|----------------|-------------|
| [`search(nums, target)`](Problems/33-Search%20in%20Rotated%20Sorted%20Array/33-Search%20in%20Rotated%20Sorted%20Array.js) | **O(log n)** | Modified binary search with rotation handling |

### Detailed Analysis

#### Overall Time Complexity: **O(log n)**

**Reasoning:**
- **Search space reduction**: Each iteration eliminates half of the remaining elements
- **Constant work per iteration**: O(1) operations for comparisons and index calculations
- **Maximum iterations**: log₂(n) due to halving the search space

#### Core Operations per Iteration

| Operation | Time Complexity | Description |
|-----------|----------------|-------------|
| [`floorMiddle(min, max)`](Problems/33-Search%20in%20Rotated%20Sorted%20Array/33-Search%20in%20Rotated%20Sorted%20Array.js) | **O(1)** | Calculate middle index |
| [`isRotated(middleIndex)`](Problems/33-Search%20in%20Rotated%20Sorted%20Array/33-Search%20in%20Rotated%20Sorted%20Array.js) | **O(1)** | Check if rotation point is in left half |
| **Target comparison** | **O(1)** | Compare middle element with target |
| **Range update** | **O(1)** | Update min/max pointers |

### Iteration Analysis

```javascript
// Each iteration reduces search space by ~50%:
// Iteration 1: n elements
// Iteration 2: n/2 elements  
// Iteration 3: n/4 elements
// ...
// Iteration k: 1 element (where k = log₂(n))
```

### Case Analysis

#### Case 1: Left Half Sorted (`!isRotated(middleIndex)`)
```javascript
// nums = [4,5,6,7,0,1,2], target = 0, middle = 7
// Since nums[0] <= nums[middle], left half [4,5,6,7] is sorted
// Target 0 not in sorted left half, search right half [0,1,2]
```

#### Case 2: Right Half Sorted (`isRotated(middleIndex)`)
```javascript
// nums = [4,5,6,7,0,1,2], target = 5, middle = 0  
// Since nums[0] > nums[middle], right half [0,1,2] is sorted
// Target 5 not in sorted right half, search left half [4,5,6,7]
```

## Space Complexity

### Overall Space: **O(1)**

The algorithm uses constant extra space:

| Component | Space Complexity | Description |
|-----------|-----------------|-------------|
| **Variables** | **O(1)** | `min`, `max`, `middleIndex`, `middle` |
| **Helper functions** | **O(1)** | `floorMiddle`, `isRotated` (no additional storage) |
| **No recursion** | **O(1)** | Iterative approach avoids call stack |

### Memory Usage Breakdown

```javascript
// Total additional memory:
// - min: 4 bytes (integer)
// - max: 4 bytes (integer)  
// - middleIndex: 4 bytes (integer)
// - middle: 4 bytes (integer)
// Total: ~16 bytes (constant)
```

## Algorithm Correctness

### Key Invariants

1. **Sorted half identification**: Always correctly identifies which half is sorted
2. **Target location logic**: Determines if target can exist in sorted vs unsorted half
3. **Search space reduction**: Guarantees elimination of half the elements per iteration

### Decision Tree Logic

```javascript
if (isRotated(middleIndex)) {
    // Right half is sorted, rotation in left half
    if (middle < target) {
        // Target might be in right sorted half OR left unsorted half
        if (nums[max] >= target) → search right (sorted)
        else → search left (unsorted)
    } else {
        // Target definitely in left half
        → search left
    }
} else {
    // Left half is sorted, rotation in right half  
    if (middle < target) {
        // Target definitely in right half
        → search right
    } else {
        // Target might be in left sorted half OR right unsorted half
        if (nums[min] <= target) → search left (sorted)
        else → search right (unsorted)
    }
}
```

## Performance Characteristics

### Strengths ✅
- **Optimal time complexity**: O(log n) maintains binary search efficiency
- **Constant space**: No additional data structures needed
- **Single pass**: No preprocessing required
- **Handles all rotation cases**: Works for any valid rotation

### Edge Cases Handled
- **No rotation**: `[1,2,3,4,5]` → Standard binary search
- **Full rotation**: `[2,3,4,5,1]` → Handles rotation at any position  
- **Duplicate elements**: Logic works with distinct elements
- **Single element**: `[1]` → Direct comparison
- **Two elements**: `[2,1]` → Correct handling

## Comparison with Alternative Approaches

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| **Modified Binary Search** | **O(log n)** | **O(1)** | Current implementation ✅ |
| **Linear Search** | O(n) | O(1) | Simple but inefficient |
| **Find Pivot + Binary Search** | O(log n) | O(1) | Two-phase approach |
| **Unrotate + Binary Search** | O(n) | O(n) | Reconstruct original array |

## Complexity Proof

### Time Complexity Proof: O(log n)

**Claim**: The algorithm terminates in at most ⌈log₂(n)⌉ iterations.

**Proof by invariant**:
- **Invariant**: After k iterations, search space ≤ n/2^k elements
- **Base case**: Initially, search space = n elements  
- **Inductive step**: Each iteration reduces space by factor of ~2
- **Termination**: When search space = 1, algorithm terminates
- **Bound**: Requires k ≤ log₂(n) iterations

### Space Complexity Proof: O(1)

**Claim**: Algorithm uses constant additional memory.

**Proof**: 
- Only uses fixed number of primitive variables
- No data structure allocation
- No recursive calls (no call stack growth)
- Memory usage independent of input size n

## Conclusion

The implementation achieves **optimal O(log n) time complexity** while maintaining **O(1) space complexity** for searching in a rotated sorted array. The algorithm cleverly leverages the property that at least one half is always sorted, enabling efficient binary search with rotation handling.

The solution is both time and space optimal for this problem, making it superior to linear search approaches while avoiding the overhead of array reconstruction or complex pivot-finding algorithms.