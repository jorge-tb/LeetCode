# Restore IP Addresses - Big-O Analysis

This document analyzes the time and space complexity of the Restore IP Addresses implementation using a recursive backtracking approach with dot group notation.

## Overview

The solution uses:
- **Recursive backtracking** to generate all possible IP address combinations
- **Dot group notation** `[x, y, z]` to represent relative positions of dots
- **Sets** for deduplication and storing valid results
- **Custom dot placement algorithm** with position displacement logic

## Time Complexity

### Main Operations

| Operation | Time Complexity | Description |
|-----------|----------------|-------------|
| `solve(s)` | **O(3^n)** worst case | Recursive exploration of all valid dot placements |
| `recursiveSolver()` | **O(3^n)** | Core recursive function with branching factor ~3 |
| `generateNextDotGroups()` | **O(1)** | Generates constant number of next states |
| `applyDotGroup()` | **O(n)** | String manipulation for dot insertion |
| `isValidIP()` | **O(1)** | Validates 4 segments with constant operations |

### Detailed Analysis

#### Overall Time Complexity: **O(3^n · n)**

**Reasoning:**
- **Branching Factor**: ~3 (each dot can move left/right/stay, with constraints)
- **Depth**: Up to n levels (string length)
- **Work per node**: O(n) for string operations (`applyDotGroup`)

#### `recursiveSolver()` - O(3^n)
```javascript
// For each position, algorithm explores ~3 possibilities:
// 1. Move dot left (decrease relative position)
// 2. Move dot right (increase relative position)  
// 3. Keep dot in place (implicitly through other branches)
```

#### `generateNextDotGroups()` - O(1)
- Fixed number of segments (4 max for IP)
- Constant number of operations per segment
- Returns limited number of valid next states

#### `applyDotGroup()` - O(n)
- Reduces over dot positions: O(3) iterations
- `insertChar()` operations: O(n) each
- Total: O(3 × n) = O(n)

### Practical Constraints

The algorithm is optimized by input constraints:
- **String length**: 4 ≤ n ≤ 12 (IP address requirements)
- **Early pruning**: Invalid IPs rejected immediately
- **Deduplication**: Set prevents redundant exploration

**Effective complexity**: O(1) for practical inputs due to severe length constraints.

## Space Complexity

### Overall Space: **O(3^n · n)**

#### Space Breakdown

| Component | Space Complexity | Description |
|-----------|-----------------|-------------|
| **Recursion Stack** | **O(n)** | Maximum depth equals string length |
| **dotSet** | **O(3^n)** | Stores all explored dot group combinations |
| **validIPs** | **O(k)** | Stores valid IP addresses (k ≤ 2^n) |
| **Temporary strings** | **O(n)** | String operations and dot insertions |

#### Memory Usage Details

```javascript
// Per recursive call:
// 1. dotGroup array: O(3) - fixed size [x, y, z]
// 2. sWithDots string: O(n + 3) - original + dots
// 3. segments array: O(4) - max 4 IP segments
```

### Set Storage Analysis

**dotSet growth:**
- Stores JSON strings of dot group arrays
- Each entry: `"[x,y,z]"` format
- Total entries: up to 3^n unique combinations

**validIPs storage:**
- Valid IP addresses as strings
- Format: `"x.x.x.x"` (max 15 characters)
- Bounded by number of valid solutions

## Algorithm Characteristics

### Strengths ✅
- **Complete search**: Explores all possible valid combinations
- **Deduplication**: Prevents redundant work via `dotSet`
- **Early termination**: Invalid IPs rejected quickly
- **Constraint-aware**: Leverages IP format restrictions

### Trade-offs ⚠️
- **High space usage**: Exponential memory for large inputs
- **String operations**: O(n) overhead per recursive call
- **Complex state management**: Dot group notation adds complexity

## Performance for Practical Inputs

### Input Length vs Complexity

| Length | Time | Space | Notes |
|--------|------|-------|-------|
| **4-6** | ~O(1) | ~O(1) | Few valid combinations |
| **7-9** | ~O(n) | ~O(n) | Moderate exploration |
| **10-12** | ~O(n²) | ~O(n²) | Maximum constraint case |

### Optimization Opportunities

1. **Iterative approach**: Reduce space from O(n) stack to O(1)
2. **Direct enumeration**: Place 3 dots in n-1 positions → C(n-1,3)
3. **Constraint propagation**: Earlier pruning of invalid branches
4. **Memoization**: Cache results for repeated subproblems

## Comparison with Alternative Approaches

| Approach | Time | Space | Implementation |
|----------|------|-------|----------------|
| **Current (Recursive)** | O(3^n·n) | O(3^n·n) | Complex but complete |
| **Iterative 3-loops** | O(n³) | O(1) | Simple nested loops |
| **Backtracking** | O(3^n) | O(n) | Standard backtracking |
| **Dynamic Programming** | O(n⁴) | O(n³) | Overkill for this problem |

**Optimal approach**: Iterative with 3 nested loops would be O(n³) time, O(1) space for this specific problem.

## Conclusion

The current implementation achieves **O(3^n · n)** complexity but performs well on practical inputs due to IP address constraints (n ≤ 12). The recursive approach with dot group notation provides a complete solution but could be optimized for better space efficiency.