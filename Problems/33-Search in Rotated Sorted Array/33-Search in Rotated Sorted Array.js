// Example: [0,1,2,4,5,6,7] might be left rotated by 3 indices and become [4,5,6,7,0,1,2]
// Given the array 'nums' after the possible rotation and an integer 'target',
// return the index of 'target' if it is in 'nums', or -1 if it is not in 'nums'

/**
 * 
 * @param {Array<number>} nums 
 * @param {number} target 
 */
const search = function (nums, target) {
    const floorMiddle = (min, max) => Math.floor((min + max) / 2);
    const isRotated = (middleIndex) => 0 < middleIndex && nums[0] > nums[middleIndex];

    let min = 0;
    let max = nums.length - 1;

    while(true) {
        let middleIndex = floorMiddle(min, max + 1);
        let middle = nums[middleIndex];

        // 0. If middle element is the target, return it
        if (middle === target)
            return middleIndex;

        // 1. If middle element is not the target and min === max means target doesn't exist or min > max caused by triying to consider rotated segment when it doesn't exist
        if (min === max || min > max)
            return -1;

        if (isRotated(middleIndex)) {
            // 2. When [nums[0], nums[1], ..., nums[middleIndex - 1], nums[middleIndex]] includes rotated segment
            if (middle < target) {
                if (nums[max] >= target) {
                    // 2.1 Then if middle is lower than target and nums[max] > target, consider [nums[middleIndex + 1], ..., nums[max]]
                    min = middleIndex + 1;
                } else {
                    // 2.2 Then if middle is lower than target and nums[max] < target, consider [nums[min], ..., nums[middleIndex - 1]]
                    max = middleIndex - 1;
                }
            } else {
                // 2.3 Thne if middle is greater than target, consider [nums[min], ..., nums[middleIndex - 1]]
                max = middleIndex - 1;
            }
        } else {
            // 3. When [nums[0], nums[1], ..., nums[middleIndex - 1], nums[middleIndex]] no includes rotated segment
            if (middle < target) {
                // 3.1 Then if middle is lower than target, consider [nums[middleIndex + 1], ..., nums[max]]
                min = middleIndex + 1;
            } else {
                if (nums[min] > target) {
                    // 3.2 Then if middle is greater than target and nums[min] > target, consider rotated segment [nums[middleIndex + 1], ..., nums[max]]
                    min = middleIndex + 1;
                } else {
                    // 3.3 Then if middle is greater than target and nums[min] < target, consider [nums[min], ..., nums[middleIndex - 1]]
                    max = middleIndex - 1;
                }
            }
        }
    }
}

// -- Tests --
// const nums_1 = [4,5,6,7,8,9,1,2,3];
// console.log(`nums_1 = ${JSON.stringify(nums_1)}`);
// for (let i = 0; i < nums_1.length; i++) {
//     console.log(`target=${nums_1[i]} is in position=${search(nums_1, nums_1[i])}`);
// }

// const nums_2 = [7,8,9,1,2,3,4,5,6];
// console.log(`nums_2 = ${JSON.stringify(nums_2)}`);
// for (let i = 0; i < nums_2.length; i++) {
//     console.log(`target=${nums_2[i]} is in position=${search(nums_2, nums_2[i])}`);
// }

// const nums_3 = [1,3];
// search(nums_3, 0);

