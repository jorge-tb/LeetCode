// Input, string with legth between 1 and 20 (included) where all characters are numbers
// const s = '25525511135';
// const s = '0000';
const s = '101023';

// IP's segment validators
const isLessOrEqualOf255 = (n) => n <= 255;
const isGreaterOrEqualOf0 = (n) => n >= 0;
const startsWith0 = (n) => n.length > 1 && n[0] === '0';

// Auxiliar method to convert array object reference into unique keys
const createKeyFromArray = (arr) => JSON.stringify(arr);

// Dot group notation: [x, y, z]
// x, y, z are integers
// they refer to relative position inside the _s_ input
// in such way that x has absolute position with position displacement to the right,
// y position is relative to x, and z is relative to y.
// So, supposing _s_=123456789 and dotGroup is [1,1,1]
// Then x=1, so first dot should be put in position _s_[1]
// displacing _s_[1] current value to the right: _s_=1.23456789
// Following with the next dot, based on our dotGroup y=1
// therefore considering _s_ excluding segment before x position (x included)
// we have _s_segment=23456789, then y=1 dot replaces current _s_segment[1] value
// to the right obtaining _s_segment=2.3456789. Analogously with z we 
// end with _s_segment_=3.456789.
// Finally, if we put these dots in the original _s_, we obtain _s_with_dots=1.2.3.456789

const dotSet = new Set();
const validIPs = new Set();

/**
 * Main function
 * @param {string} s
 * @returns {string[]} 
 */
function solve(s) {
    if (s.length <= 3 || s.length > 12) return [];
    recursiveSolver(s);
    return [...validIPs];
}

/**
 * Recursive solver
 * @param {string} s 
 * @returns {string}
 */
function recursiveSolver(s, dotGroup) {
    let nextDotGroups = generateNextDotGroups(s, dotGroup);
    let uniqueDotGroups = nextDotGroups.filter(g => !dotSet.has(createKeyFromArray(g)));

    if (uniqueDotGroups.length === 0)
        return;

    uniqueDotGroups.map(g => {
        let sWithDots = applyDotGroup(s, g);
        if (isValidIP(sWithDots)) {
            validIPs.add(sWithDots);
        }
        dotSet.add(createKeyFromArray(g));
        recursiveSolver(s, g);
    });
}

/**
 * 
 * @param {string} s 
 * @param {number[]} dotGroup
 * @returns {string} s with dots
 */
function applyDotGroup(s, dotGroup) {
    return dotGroup.reduce((previousValue, relativeIndex, i) => {
        const baseIndex = dotGroup
            .slice(0, i)
            .reduce((prev, current) => prev + current + 1, 0);
        const index = baseIndex + relativeIndex;
        return insertChar(previousValue, '.', index);
    }, s);
}

/**
 * 
 * @param {string} s 
 * @param {array<number>} dotGroup 
 * @returns 
 */
function generateNextDotGroups(s, dotGroup) {
    if (!dotGroup || dotGroup.length === 0) return [[1,1,1]]

    const dotGroups = [];
    const sWithDots = applyDotGroup(s, dotGroup);
    const segments = sWithDots.split('.');
    segments.forEach((segment, i) => {
        const nextSegment = i < segments.length - 1 ? segments[i + 1] : null
        const previousSegment = i > 0 ? segments[i - 1] : null;
        if (nextSegment || nextSegment === '') {
            if (segment.length > 1 && nextSegment.length < 3) {
                dotGroups.push([...dotGroup].map((v, j) => j === i ? v - 1 : v));
            } else if (segment.length < 3 && nextSegment.length > 1) {
                dotGroups.push([...dotGroup].map((v, j) => j == i ? v + 1 : v));
            }
        } else {
            if (segment.length > 1 && previousSegment.length < 3) {
                dotGroups.push([...dotGroup].map((v, j) => j === i - 1 ? v + 1 : v));
            }
        }
    });

    return dotGroups;
}

function insertChar(str, char, index) {
  return str.slice(0, index) + char + str.slice(index);
}

/**
 * Returns true if argument is a valid IP, else false
 * @param {string} sWithDots 
 * @returns {boolean}
 */
function isValidIP(sWithDots) {
    const segments = sWithDots.split('.').filter(s => s !== '');
    return segments.length === 4 &&
        segments.every(segment =>
            isLessOrEqualOf255(Number(segment)) &&
            isGreaterOrEqualOf0(Number(segment)) &&
            !startsWith0(segment)
        );
}

console.log('solve');
console.log(solve(s));